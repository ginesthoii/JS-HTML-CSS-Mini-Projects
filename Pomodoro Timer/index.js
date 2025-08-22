// Elements
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const ringEl = document.getElementById("ringProgress");
const muteToggle = document.getElementById("muteToggle");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const exportCsvBtn = document.getElementById("exportCsv");

// Timer settings (single mode: 25 min Pomodoro)
const DEFAULT_SECONDS = 25 * 60;

// State
let interval = null;
let timeLeft = DEFAULT_SECONDS;
let totalDuration = DEFAULT_SECONDS;

// Ring math
const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
ringEl.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
ringEl.style.strokeDashoffset = "0";

// Audio context for chime
let audioCtx = null;
function beepSequence() {
  if (muteToggle.checked) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioCtx.currentTime;
  [440, 660, 880].forEach((freq, i) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    o.connect(g); g.connect(audioCtx.destination);
    const startT = now + i * 0.2, endT = startT + 0.15;
    g.gain.setValueAtTime(0.0001, startT);
    g.gain.exponentialRampToValueAtTime(0.3, startT + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, endT);
    o.start(startT); o.stop(endT + 0.02);
  });
}

// History (localStorage)
const LS_KEY = "pomo_history_v1";
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
}
function saveHistory(list) { localStorage.setItem(LS_KEY, JSON.stringify(list)); }
function escapeHtml(s) { return s.replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[ch])); }

function addHistoryEntry(entry) {
  const list = loadHistory();
  list.unshift(entry); // newest first
  saveHistory(list);
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem(LS_KEY);
  renderHistory();
}

function renderHistory() {
  const list = loadHistory();
  historyList.innerHTML = "";
  if (list.length === 0) {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `<div class="history-top"><span>No sessions yet</span></div>
                    <div class="history-sub">Your completed Pomodoros will appear here.</div>`;
    historyList.appendChild(li);
    return;
  }
  list.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "history-item";
    const when = new Date(item.endedAt);
    const dateStr = when.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const timeStr = when.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    li.innerHTML = `
      <div class="history-top">
        <span>Pomodoro #${list.length - idx}</span>
        <span>${dateStr} • ${timeStr}</span>
      </div>
      <div class="history-sub">Duration: ${formatTime(item.duration)}</div>
      ${item.note ? `<div class="history-sub">Note: ${escapeHtml(item.note)}</div>` : ""}
    `;
    historyList.appendChild(li);
  });
}

function exportHistoryToCsv() {
  const list = loadHistory();
  if (list.length === 0) {
    alert("No sessions to export yet.");
    return;
  }
  const header = ["ended_at_iso","local_date","local_time","duration_seconds","duration_mm:ss","note"];
  const rows = list.map(item => {
    const d = new Date(item.endedAt);
    const localDate = d.toLocaleDateString();
    const localTime = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return [
      d.toISOString(),
      localDate,
      localTime,
      item.duration,
      formatTime(item.duration),
      (item.note || "").replace(/"/g, '""') // CSV escape quotes
    ];
  });

  const csv = [header, ...rows]
    .map(cols => cols.map(v => `"${v}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pomodoro_history_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

// Utils
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
function updateTimerText() { timerEl.textContent = formatTime(timeLeft); }
function updateRing() {
  const fraction = timeLeft / totalDuration;
  ringEl.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - fraction)}`;
}

// Core tick
function tick() {
  if (timeLeft <= 0) {
    clearInterval(interval);
    interval = null;

    beepSequence();

    // Prompt for a note (optional)
    let note = "";
    try {
      const input = prompt("Great work! Add a quick note for this session (optional):", "");
      if (typeof input === "string") note = input.trim();
    } catch { /* ignore prompt blockers */ }

    // Record a completed session
    addHistoryEntry({
      endedAt: Date.now(),
      duration: DEFAULT_SECONDS,
      note
    });

    return; // leave finished state visible
  }

  timeLeft -= 1;
  updateTimerText();
  updateRing();
}

// Controls
function startTimer() {
  if (interval !== null) return; // no stacking
  interval = setInterval(tick, 1000);
}
function stopTimer() { clearInterval(interval); interval = null; }
function resetTimer() { clearInterval(interval); interval = null; timeLeft = totalDuration; updateTimerText(); updateRing(); }

// Bindings
startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
clearHistoryBtn.addEventListener("click", clearHistory);
exportCsvBtn.addEventListener("click", exportHistoryToCsv);

// Init
updateTimerText();
updateRing();
renderHistory();