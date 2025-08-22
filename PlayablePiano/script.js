// ========================= Notes & layout =========================
const WHITE_SEQ = ['C','D','E','F','G','A','B'];
const HAS_SHARP = { C:true, D:true, E:false, F:true, G:true, A:true, B:false };

const MAP_WHITE = ['a','s','d','f','g','h','j',  'k','l',';']; // C..B then C..E
const MAP_BLACK = ['w','e',     't','y','u',     'o','p'     ]; // C# D# F# G# A#  C# D#

let currentOctave = 4;
let keyMap = new Map();     // 'a' -> {n:'C',oct:4}
let elementMap = new Map(); // 'C4' -> element

// ========================= Audio engine =========================
let ctx, masterGain, mediaDest, recorder;
let waveform = 'sine';
let volume = 0.6;
let recordingChunks = [];

function ensureCtx() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = ctx.createGain();
  masterGain.gain.value = volume;
  masterGain.connect(ctx.destination);

  mediaDest = ctx.createMediaStreamDestination();
  masterGain.connect(mediaDest);

  const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
    ? 'audio/webm;codecs=opus'
    : 'audio/webm';
  recorder = new MediaRecorder(mediaDest.stream, { mimeType: mime });

  recorder.ondataavailable = (e) => { if (e.data.size) recordingChunks.push(e.data); };
  recorder.onstop = handleRecordingStop;
}

function freqFromNote(noteName) {
  const IDX = { C:0, 'C#':1, D:2, 'D#':3, E:4, F:5, 'F#':6, G:7, 'G#':8, A:9, 'A#':10, B:11 };
  const m = noteName.match(/^([A-G]#?)(-?\d+)$/);
  if (!m) return 440;
  const [, n, oc] = m;
  const midi = (parseInt(oc, 10) + 1) * 12 + IDX[n];
  return 440 * Math.pow(2, (midi - 69) / 12); // A4=440
}

function playNote(noteName, dur = 0.24) {
  ensureCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = waveform;
  osc.frequency.value = freqFromNote(noteName);

  const now = ctx.currentTime;
  const attack = 0.01;
  const decay = 0.08;
  const sustain = 0.65;
  const release = Math.max(0.08, dur - (attack + decay));

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + attack);
  gain.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  gain.gain.linearRampToValueAtTime(0, now + attack + decay + release);

  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(now);
  osc.stop(now + attack + decay + release);
}

// ========================= DOM refs =========================
const elKeyboard = document.getElementById('keyboard');
const elWave     = document.getElementById('wave');
const elVolume   = document.getElementById('volume');
const elOctOut   = document.getElementById('octave');
const elOctUp    = document.getElementById('octave-up');
const elOctDown  = document.getElementById('octave-down');
const elLabels   = document.getElementById('labels');
const elTheme    = document.getElementById('theme');

const elPersist  = document.getElementById('persist');
const elBpm      = document.getElementById('bpm');
const elCountIn  = document.getElementById('countin');
const elMetro    = document.getElementById('metro');

const elRec      = document.getElementById('rec');
const elPlay     = document.getElementById('play');
const elClear    = document.getElementById('clear');
const elRecStatus= document.getElementById('rec-status');

const elFile     = document.getElementById('audio-file');
const elHop      = document.getElementById('hop');
const elSens     = document.getElementById('sens');
const elAnalyze  = document.getElementById('analyze');
const elAnStatus = document.getElementById('an-status');

const elTakes    = document.getElementById('takes');

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
}

// ========================= Build keyboard =========================
function rebuildKeyboard() {
  elKeyboard.innerHTML = '';
  keyMap.clear();
  elementMap.clear();

  let whiteKeyIdx = 0;
  let blackKeyIdx = 0;

  for (let oc = currentOctave; oc <= currentOctave + 1; oc++) {
    const isLastPartial = (oc === currentOctave + 1);

    for (let i = 0; i < WHITE_SEQ.length; i++) {
      if (isLastPartial && i > 2) break; // only C D E on last segment

      const whiteName = `${WHITE_SEQ[i]}${oc}`;
      const liWhite = document.createElement('li');
      liWhite.className = 'key white';
      liWhite.dataset.note = whiteName;

      const kWhite = MAP_WHITE[whiteKeyIdx] || '';
      if (kWhite) {
        liWhite.dataset.key = kWhite;
        keyMap.set(kWhite, { n: WHITE_SEQ[i], oct: oc });
      }
      elementMap.set(whiteName, liWhite);

      if (elLabels.checked) {
        const label = document.createElement('span');
        label.className = 'label';
        label.textContent = `${kWhite.toUpperCase()} • ${whiteName}`;
        liWhite.appendChild(label);
      }

      liWhite.addEventListener('pointerdown', () => press(whiteName, liWhite));

      if (HAS_SHARP[WHITE_SEQ[i]]) {
        const sharpName = `${WHITE_SEQ[i]}#${oc}`;
        const divBlack = document.createElement('div');
        divBlack.className = 'key black';
        divBlack.dataset.note = sharpName;

        const kBlack = MAP_BLACK[blackKeyIdx] || '';
        if (kBlack) {
          divBlack.dataset.key = kBlack;
          keyMap.set(kBlack, { n: `${WHITE_SEQ[i]}#`, oct: oc });
        }
        elementMap.set(sharpName, divBlack);

        if (elLabels.checked) {
          const l2 = document.createElement('span');
          l2.className = 'label';
          l2.textContent = `${kBlack.toUpperCase()} • ${sharpName}`;
          divBlack.appendChild(l2);
        }

        divBlack.addEventListener('pointerdown', (e) => { e.stopPropagation(); press(sharpName, divBlack); });
        liWhite.appendChild(divBlack);
        blackKeyIdx++;
      }

      elKeyboard.appendChild(liWhite);
      whiteKeyIdx++;
    }
  }
}

// ========================= Press visuals + event log =========================
let events = [];               // current take events [{t, noteName}]
let isRecording = false;
let startPerfMs = 0;

function press(noteName, el) {
  el.classList.add('pressed');
  setTimeout(() => el.classList.remove('pressed'), 120);
  playNote(noteName);
  if (isRecording) {
    const t = performance.now() - startPerfMs;
    events.push({ t, noteName });
  }
}

function playEvents(evts) {
  if (!evts.length) return;
  ensureCtx();
  const t0 = evts[0].t;
  for (const ev of evts) {
    const delay = Math.max(0, ev.t - t0);
    setTimeout(() => {
      const el = elementMap.get(ev.noteName) || document.querySelector(`[data-note="${ev.noteName}"]`);
      if (el) { el.classList.add('pressed'); setTimeout(()=>el.classList.remove('pressed'),120); }
      playNote(ev.noteName);
    }, delay);
  }
}

// ========================= Metronome + Count-in =========================
let metroInterval = null;
function metroStart() {
  stopMetronome();
  const bpm = clamp(parseInt(elBpm.value||'100',10),30,240);
  const periodMs = 60000 / bpm; // quarter notes
  elMetro.textContent = 'Stop Metronome';
  metroInterval = setInterval(()=>click(), periodMs);
  click(); // immediate first click
}
function stopMetronome() {
  if (metroInterval) clearInterval(metroInterval);
  metroInterval = null;
  elMetro.textContent = 'Start Metronome';
}
function click() {
  // short high beep for beat 1, slightly lower otherwise (we’re not tracking measures here)
  ensureCtx();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(masterGain);
  const now = ctx.currentTime;
  o.type = 'square';
  o.frequency.value = 1500;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.8, now+0.001);
  g.gain.linearRampToValueAtTime(0, now+0.07);
  o.start(now);
  o.stop(now+0.08);
}

// Helper to wait ms
const wait = (ms)=>new Promise(res=>setTimeout(res,ms));

// ========================= Recording controls =========================
const takes = []; // in-memory: {id,name,durationMs,blobUrl,mime,events}

function setRecording(active) {
  isRecording = active;
  elRec.setAttribute('aria-pressed', String(active));
  elRec.textContent = active ? '■ Stop' : '● Record';
  elPlay.disabled = active || events.length === 0;
  elClear.disabled = active || events.length === 0;
}

elRec.addEventListener('click', async () => {
  ensureCtx();
  if (!isRecording) {
    // optional count-in
    const bars = parseInt(elCountIn.value||'0',10);
    if (bars>0) {
      const bpm = clamp(parseInt(elBpm.value||'100',10),30,240);
      const beatMs = 60000 / bpm;
      elRecStatus.textContent = `Count-in: ${bars} bar${bars>1?'s':''}…`;
      for (let b=0; b<bars*4; b++) {
        click(); // 4/4 simple
        await wait(beatMs);
      }
    }

    // start fresh
    events = [];
    startPerfMs = performance.now();
    recordingChunks = [];
    recorder.start();
    setRecording(true);
    elRecStatus.textContent = 'Recording…';
  } else {
    setRecording(false);
    recorder.stop();
  }
});

elPlay.addEventListener('click', () => playEvents(events));
elClear.addEventListener('click', () => { events = []; elPlay.disabled = true; elClear.disabled = true; });

// When MediaRecorder stops, save blob + store take
function handleRecordingStop() {
  const blob = new Blob(recordingChunks, { type: recorder.mimeType });
  const url = URL.createObjectURL(blob);
  const duration = events.length ? (events[events.length - 1].t - events[0].t) : 0;
  const name = new Date().toLocaleString().replace(/[/,:]/g,'-').replace(/\s+/g,'_');
  const take = {
    id: crypto.randomUUID(),
    name: `Take_${name}`,
    durationMs: Math.max(0, duration),
    blobUrl: url,
    mime: recorder.mimeType,
    events: JSON.parse(JSON.stringify(events))
  };
  takes.unshift(take);
  renderTakes();
  elPlay.disabled = events.length === 0;
  elClear.disabled = events.length === 0;
  elRecStatus.textContent = `Saved: ${take.name}`;

  // Persist events if toggle is on
  if (elPersist.checked) saveTakesToStorage();
}

// ========================= Takes (history) + localStorage =========================
function msToString(ms) {
  const s = Math.round(ms/1000);
  const m = Math.floor(s/60);
  const r = s%60;
  return (m?`${m}m `:'')+`${r}s`;
}

function renderTakes() {
  elTakes.innerHTML = '';
  const list = takes.length ? takes : [];
  if (!list.length) {
    const li = document.createElement('li');
    li.className = 'take';
    li.innerHTML = `<div class="meta"><div class="name">No recordings yet</div><div class="sub">Press ● Record to capture a take</div></div>`;
    elTakes.appendChild(li);
    return;
  }
  for (const t of list) {
    const li = document.createElement('li'); li.className = 'take';
    const meta = document.createElement('div'); meta.className = 'meta';
    meta.innerHTML = `<div class="name">${t.name}</div><div class="sub">${msToString(t.durationMs)} • ${t.mime || 'events only'}</div>`;

    const actions = document.createElement('div'); actions.className = 'actions';
    const btnPlay = document.createElement('button'); btnPlay.className='btn'; btnPlay.textContent='▶ Play';
    btnPlay.addEventListener('click', ()=>playEvents(t.events));

    const btnUse = document.createElement('button'); btnUse.className='btn'; btnUse.textContent='Use as current';
    btnUse.addEventListener('click', ()=>{ events = JSON.parse(JSON.stringify(t.events)); elPlay.disabled = events.length===0; elClear.disabled = events.length===0; });

    actions.append(btnPlay, btnUse);

    if (t.blobUrl) {
      const aDl = document.createElement('a'); aDl.className='btn'; aDl.textContent='⬇ Download';
      const ext = (t.mime||'').includes('webm') ? 'webm' : 'ogg';
      aDl.href = t.blobUrl; aDl.download = `${t.name}.${ext}`;
      actions.append(aDl);
    }

    li.append(meta, actions);
    elTakes.appendChild(li);
  }
}

// Save only events metadata to localStorage (not blobs)
const STORAGE_KEY = 'keys_and_code_takes_v1';
function saveTakesToStorage() {
  // Strip blobUrl/mime to minimize size; keep name, duration, events
  const slim = takes.map(t => ({ id: t.id, name: t.name, durationMs: t.durationMs, events: t.events }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
}
function loadTakesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const slim = JSON.parse(raw);
    // insert slim takes at end (no blobs)
    for (const s of slim) {
      takes.push({ ...s, blobUrl: null, mime: null });
    }
  } catch {}
}

// Toggle persistence: if turned off, do not auto-save; if turned on, immediately save current list
elPersist.addEventListener('change', ()=>{ if (elPersist.checked) saveTakesToStorage(); });

// ========================= Audio → Keys (Pitch detection) =========================
// Simple autocorrelation pitch detector (naive but works okay for monophonic material)
async function analyzeAndPlay(file) {
  if (!file) { elAnStatus.textContent = 'No file selected.'; return; }
  ensureCtx();

  elAnStatus.textContent = 'Decoding audio…';
  const arrayBuf = await file.arrayBuffer();
  const audioBuf = await ctx.decodeAudioData(arrayBuf);

  const hopMs = clamp(parseInt(elHop.value||'40',10), 5, 200);
  const hop = Math.floor((hopMs/1000) * audioBuf.sampleRate);
  const channel = audioBuf.getChannelData(0);
  const sensitivity = parseFloat(elSens.value||'0.2'); // amplitude gate 0..1

  // Schedule presses
  elAnStatus.textContent = 'Analyzing…';
  const notes = [];
  let t = 0;
  for (let i=0; i+hop <= channel.length; i += hop) {
    const slice = channel.subarray(i, i+hop);
    const amp = rms(slice);
    if (amp < sensitivity) { t += hop; continue; }
    const f = autoCorrelate(slice, audioBuf.sampleRate);
    if (f > 0) {
      const noteName = freqToNoteName(f);
      notes.push({ t, noteName });
    }
    t += hop;
  }

  if (!notes.length) { elAnStatus.textContent = 'No clear pitch found (try lower sensitivity or different audio).'; return; }
  elAnStatus.textContent = `Playing ${notes.length} detected notes…`;

  const t0 = notes[0].t;
  for (const n of notes) {
    const delay = Math.max(0, (n.t - t0)/audioBuf.sampleRate * 1000);
    setTimeout(()=> {
      const el = elementMap.get(n.noteName) || document.querySelector(`[data-note="${n.noteName}"]`);
      if (el) { el.classList.add('pressed'); setTimeout(()=>el.classList.remove('pressed'),120); }
      playNote(n.noteName);
    }, delay);
  }
  setTimeout(()=>{ elAnStatus.textContent = 'Done.'; }, Math.max(0, (notes.at(-1).t - t0)/audioBuf.sampleRate * 1000) + 300);
}

function rms(buf) {
  let s = 0;
  for (let i=0;i<buf.length;i++) { const v = buf[i]; s += v*v; }
  return Math.sqrt(s / buf.length);
}

// Very naive autocorrelation
function autoCorrelate(buf, sampleRate) {
  const SIZE = buf.length;
  const MAX_SAMPLES = Math.floor(SIZE/2);
  let bestOffset = -1;
  let bestCorr = 0;
  let rmsVal = rms(buf);
  if (rmsVal < 0.01) return -1; // too quiet

  let lastCorr = 1;
  for (let offset = 2; offset <= MAX_SAMPLES; offset++) {
    let corr = 0;
    for (let i=0; i<MAX_SAMPLES; i++) {
      corr += buf[i] * buf[i+offset];
    }
    corr = corr / MAX_SAMPLES;
    if (corr > bestCorr) {
      bestCorr = corr; bestOffset = offset;
    } else if (corr < lastCorr) {
      // passed a peak
    }
    lastCorr = corr;
  }
  if (bestCorr > 0.01 && bestOffset > 0) {
    const freq = sampleRate / bestOffset;
    if (freq >= 40 && freq <= 2000) return freq;
  }
  return -1;
}

function freqToNoteName(freq) {
  const A4 = 440;
  const n = Math.round(12 * Math.log2(freq / A4)) + 69; // MIDI
  const names = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const note = names[(n + 1200) % 12]; // guard
  const oct = Math.floor(n/12) - 1;
  // Keep within our rendered range if possible by nudging octave
  const clampedOct = Math.min( currentOctave+1, Math.max(currentOctave-1, oct) );
  return `${note}${clampedOct}`;
}

// ========================= Controls wiring =========================
elWave.addEventListener('change', () => { waveform = elWave.value; });
elVolume.addEventListener('input', () => { volume = parseFloat(elVolume.value); ensureCtx(); masterGain.gain.value = volume; });
elOctUp.addEventListener('click', () => { currentOctave = Math.min(7, currentOctave + 1); elOctOut.textContent = currentOctave; rebuildKeyboard(); });
elOctDown.addEventListener('click', () => { currentOctave = Math.max(1, currentOctave - 1); elOctOut.textContent = currentOctave; rebuildKeyboard(); });
elLabels.addEventListener('change', rebuildKeyboard);
elTheme.addEventListener('change', () => setTheme(elTheme.checked));

elMetro.addEventListener('click', () => { metroInterval ? stopMetronome() : metroStart(); });

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
  const note = keyMap.get(k);
  if (!note) return;
  const noteName = `${note.n}${note.oct}`;
  const el = elementMap.get(noteName) || document.querySelector(`[data-note="${noteName}"]`);
  if (el) press(noteName, el);
});

// Audio -> Keys
elAnalyze.addEventListener('click', () => analyzeAndPlay(elFile.files?.[0] || null));

// ========================= Init =========================
(function init() {
  setTheme(false);
  elOctOut.textContent = currentOctave;
  rebuildKeyboard();

  // Load persisted takes (events only)
  try {
    const raw = localStorage.getItem('keys_and_code_takes_v1');
    if (raw) {
      const slim = JSON.parse(raw);
      for (const s of slim) takes.push({ ...s, blobUrl: null, mime: null });
    }
  } catch {}
  renderTakes();
})();

// ========================= Utils =========================
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }