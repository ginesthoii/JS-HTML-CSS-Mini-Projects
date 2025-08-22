// -------- Paragraphs (demo) --------
const PARAGRAPHS = [
    "Typing is a skill that improves with steady practice and good posture.",
    "JavaScript can be fun when you build tiny projects that give instant feedback.",
    "Focus on accuracy first and then build your speed, just like learning an instrument.",
    "Clean code reads like prose and future you will thank present you for it."
  ];
  
  // -------- DOM --------
  const area = document.getElementById("textArea");
  const input = document.getElementById("input");
  const timeEl = document.getElementById("time");
  const wpmEl = document.getElementById("wpm");
  const cpmEl = document.getElementById("cpm");
  const mistakesEl = document.getElementById("mistakes");
  const accEl = document.getElementById("acc");
  const barEl = document.getElementById("bar");
  
  const restartBtn = document.getElementById("restart");
  const newParaBtn = document.getElementById("newPara");
  const themeChk = document.getElementById("theme");
  
  // -------- State --------
  const TEST_SECONDS = 60;
  let paragraph = "";
  let index = 0;
  let timer = null;
  let timeLeft = TEST_SECONDS;
  let mistakes = 0;
  let typed = 0;       // total keypresses (letters + errors)
  let correctChars = 0;
  
  // -------- Helpers --------
  function pickParagraph() {
    return PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
  }
  
  function renderParagraph(text) {
    area.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = text[i];
      if (i === 0) span.classList.add("current");
      area.appendChild(span);
    }
  }
  
  function reset(testNew = false) {
    clearInterval(timer);
    timer = null;
    timeLeft = TEST_SECONDS;
    timeEl.textContent = `${timeLeft}s`;
    barEl.style.width = "0%";
  
    index = 0; mistakes = 0; typed = 0; correctChars = 0;
    mistakesEl.textContent = "0";
    wpmEl.textContent = "0";
    cpmEl.textContent = "0";
    accEl.textContent = "100%";
  
    if (testNew) paragraph = pickParagraph();
    renderParagraph(paragraph);
    input.value = "";
  }
  
  function startTimer() {
    if (timer) return;
    const total = TEST_SECONDS;
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = `${timeLeft}s`;
      barEl.style.width = `${100 * (1 - timeLeft / total)}%`;
      if (timeLeft <= 0) finish();
    }, 1000);
  }
  
  function finish() {
    clearInterval(timer);
    timer = null;
    // lock input but allow restart
    input.blur();
    area.classList.remove("focus");
  }
  
  // WPM/CPM/ACC live calc
  function recalc() {
    const elapsed = (TEST_SECONDS - timeLeft) || 1; // avoid div by zero
    const minutes = elapsed / 60;
    const wpm = Math.max(0, Math.round((correctChars / 5) / minutes));
    const cpm = Math.max(0, Math.round(correctChars / minutes));
    const acc = Math.max(0, Math.min(100, Math.round((correctChars / Math.max(1, typed)) * 100)));
  
    wpmEl.textContent = String(wpm);
    cpmEl.textContent = String(cpm);
    accEl.textContent = `${acc}%`;
  }
  
  // -------- Input handling --------
  function handleKey(char) {
    if (!timer) startTimer();
    if (timeLeft <= 0) return;
  
    const spans = area.querySelectorAll(".char");
    const current = spans[index];
    const expected = paragraph[index] || "";
  
    // Backspace
    if (char === "Backspace") {
      if (index > 0) {
        index--;
        const prev = spans[index];
        if (prev.classList.contains("incorrect")) {
          mistakes--;
          mistakesEl.textContent = mistakes;
        } else if (prev.classList.contains("correct")) {
          correctChars--;
        }
        prev.classList.remove("correct", "incorrect");
        spans.forEach(s => s.classList.remove("current"));
        prev.classList.add("current");
      }
      return recalc();
    }
  
    // Ignore non-character keys
    if (char.length !== 1) return;
  
    typed++;
  
    if (char === expected) {
      current.classList.add("correct");
      correctChars++;
    } else {
      current.classList.add("incorrect");
      mistakes++;
      mistakesEl.textContent = mistakes;
    }
  
    current.classList.remove("current");
    index++;
  
    if (index < spans.length) {
      spans[index].classList.add("current");
    } else {
      // reached end — auto finish
      finish();
    }
  
    recalc();
  }
  
  // focus management: clicking the text focuses hidden input
  area.addEventListener("click", () => input.focus());
  area.addEventListener("focus", () => input.focus());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); input.focus(); }
  });
  
  input.addEventListener("keydown", (e) => {
    handleKey(e.key);
  });
  
  // -------- Buttons & Theme --------
  restartBtn.addEventListener("click", () => reset(false));
  newParaBtn.addEventListener("click", () => { paragraph = pickParagraph(); reset(false); });
  themeChk.addEventListener("change", () => {
    document.documentElement.classList.toggle("dark", themeChk.checked);
  });
  
  // -------- Init --------
  (function init() {
    paragraph = pickParagraph();
    reset(false);
    // start focused for convenience
    setTimeout(()=>input.focus(), 50);
  })();