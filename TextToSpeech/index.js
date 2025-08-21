const textInput = document.getElementById("textInput");
const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const previewBtn = document.getElementById("previewBtn");
const downloadBtn = document.getElementById("downloadBtn");

const voiceSelect = document.getElementById("voiceSelect");
const rateSelect = document.getElementById("rateSelect");
const pitchRange = document.getElementById("pitchRange");
const volumeRange = document.getElementById("volumeRange");
const fileTypeSelect = document.getElementById("fileTypeSelect");

const historyList = document.getElementById("historyList");

let synth = window.speechSynthesis;
let voices = [];
let utterance;
let history = [];

// Load voices
function loadVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

// Speak text
function speak(text) {
  if (synth.speaking) synth.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.rate = parseFloat(rateSelect.value);
  utterance.pitch = parseFloat(pitchRange.value);
  utterance.volume = parseFloat(volumeRange.value);

  synth.speak(utterance);
  addToHistory(text);
}

// Add to history
function addToHistory(text) {
  history.push(text);
  renderHistory();
}
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;

    const replayBtn = document.createElement("button");
    replayBtn.textContent = "Replay";
    replayBtn.onclick = () => speak(entry);

    li.appendChild(replayBtn);
    historyList.appendChild(li);
  });
}

// Buttons
speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text) speak(text);
});

pauseBtn.addEventListener("click", () => {
  if (synth.speaking && !synth.paused) {
    synth.pause();
    pauseBtn.textContent = "▶ Resume";
  } else if (synth.paused) {
    synth.resume();
    pauseBtn.textContent = "⏸ Pause";
  }
});

stopBtn.addEventListener("click", () => {
  synth.cancel();
  pauseBtn.textContent = "⏸ Pause";
});

previewBtn.addEventListener("click", () => {
  const text = textInput.value.trim() || "This is a preview sample.";
  speak(text);
});

// Download placeholder
downloadBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) return alert("Enter text to download.");

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tts.${fileTypeSelect.value}`;
  a.click();
  URL.revokeObjectURL(url);

  alert("⚠ Note: Browser TTS cannot export real audio directly. This is just a text file placeholder.");
});