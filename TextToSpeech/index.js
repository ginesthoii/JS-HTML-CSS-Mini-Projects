// index.js

let synth = window.speechSynthesis;
let voices = [];

const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speedSelect = document.getElementById("speedSelect");
const pitchRange = document.getElementById("pitchRange");
const volumeRange = document.getElementById("volumeRange");

const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const previewBtn = document.getElementById("previewBtn");

// ===== Populate voices =====
function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(opt);
  });
}
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// ===== Speak function =====
function speak(text, isPreview = false) {
  if (synth.speaking) synth.cancel();

  if (text !== "") {
    let utterThis = new SpeechSynthesisUtterance(text);

    // settings
    utterThis.voice = voices[voiceSelect.value] || null;
    utterThis.rate = parseFloat(speedSelect.value) || 1;
    utterThis.pitch = parseFloat(pitchRange.value);
    utterThis.volume = parseFloat(volumeRange.value);

    if (isPreview) {
      utterThis.text = "This is a preview of the selected voice.";
    }

    synth.speak(utterThis);
  }
}

// ===== Event Listeners =====
speakBtn.addEventListener("click", () => {
  speak(textInput.value);
});

pauseBtn.addEventListener("click", () => {
  if (synth.speaking && !synth.paused) {
    synth.pause();
  } else if (synth.paused) {
    synth.resume();
  }
});

stopBtn.addEventListener("click", () => {
  if (synth.speaking) synth.cancel();
});

previewBtn.addEventListener("click", () => {
  speak("", true);
});

// ===== Slider Fill =====
function updateRangeFill(el) {
  const min = parseFloat(el.min ?? 0);
  const max = parseFloat(el.max ?? 100);
  const val = parseFloat(el.value ?? 0);
  const pct = ((val - min) / (max - min)) * 100;
  el.style.background = `linear-gradient(to right, var(--accent) ${pct}%, #a9a9a9 ${pct}%)`;
}
[pitchRange, volumeRange].forEach(el => {
  if (!el) return;
  updateRangeFill(el);
  el.addEventListener("input", () => updateRangeFill(el));
});

// ===== Title Caret Disappear =====
window.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title-animate");
  if (!title) return;

  // after 10s, remove the border caret completely
  setTimeout(() => {
    title.style.borderRight = "0";
  }, 10000);
});