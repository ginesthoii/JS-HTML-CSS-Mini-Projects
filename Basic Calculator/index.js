// Elements
const buttonsEl = document.querySelectorAll("button");
const inputFieldEl = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// ---- Calculator logic (kept simple) ----
for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent;

    if (buttonValue === "C") {
      clearResult();
      return;
    }

    if (buttonValue === "=") {
      calculateResult();
      return;
    }

    // Only append for keys that are part of the keypad
    if (buttonsEl[i].classList.contains("number") ||
        buttonsEl[i].classList.contains("decimal") ||
        buttonsEl[i].classList.contains("operator")) {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  inputFieldEl.value = "";
}

/**
 * Basic evaluation with a light sanity check.
 * Since #result is read-only and only filled by our buttons,
 * this is safe for a mini project.
 */
function calculateResult() {
  const expr = inputFieldEl.value;
  if (!expr) return;

  // Optional: allow only digits/operators/., parentheses, and spaces
  const safe = /^[0-9+\-*/().\s]+$/.test(expr);
  if (!safe) return;

  try {
    // Evaluate and round tiny float artifacts
    const raw = eval(expr); // mini-project simplicity
    const result = Number.isFinite(raw) ? +parseFloat(raw.toFixed(10)) : "NaN";
    inputFieldEl.value = result;

    // Save to history
    if (Number.isFinite(result)) {
      addHistoryEntry({ expression: expr, result });
    }
  } catch {
    inputFieldEl.value = "Error";
  }
}

function appendValue(buttonValue) {
  inputFieldEl.value += buttonValue;
}

// ---- History (localStorage) ----
const LS_KEY = "calc_history_v1";

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
}
function saveHistory(list) { localStorage.setItem(LS_KEY, JSON.stringify(list)); }

function addHistoryEntry(entry) {
  const list = loadHistory();
  list.unshift({
    ...entry,
    ts: Date.now()
  });
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
    const empty = document.createElement("li");
    empty.className = "history-item";
    empty.style.cursor = "default";
    empty.innerHTML = `<span class="history-expression">No history yet</span>
                       <span class="history-result">Do some math ☺︎</span>`;
    historyList.appendChild(empty);
    return;
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <span class="history-expression">${item.expression}</span>
      <span class="history-result">= ${item.result}</span>
    `;
    // Click to reuse expression (loads expression back into display)
    li.addEventListener("click", () => {
      inputFieldEl.value = item.expression;
    });
    historyList.appendChild(li);
  });
}

// Bindings
clearHistoryBtn.addEventListener("click", clearHistory);

// Init
renderHistory();