// Language dropdown (footer)
const languageBtn = document.getElementById("language-btn");
const languageDropdown = document.getElementById("language-dropdown");

if (languageBtn && languageDropdown) {
  languageBtn.addEventListener("click", () => {
    const expanded = languageBtn.getAttribute("aria-expanded") === "true";
    languageBtn.setAttribute("aria-expanded", (!expanded).toString());
    languageDropdown.hidden = expanded;
  });

  document.addEventListener("click", (e) => {
    if (!languageBtn.contains(e.target)) {
      languageBtn.setAttribute("aria-expanded", "false");
      languageDropdown.hidden = true;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      languageBtn.setAttribute("aria-expanded", "false");
      languageDropdown.hidden = true;
      languageBtn.focus();
    }
  });
}

// FAQ accordion (accessible, smooth)
document.querySelectorAll(".faq-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", (!expanded).toString());

    const panel = btn.nextElementSibling;
    const icon = btn.querySelector("i");

    if (!expanded) {
      panel.hidden = false;
      // expand
      const h = panel.scrollHeight;
      panel.style.maxHeight = h + "px";
      icon.style.transform = "rotate(45deg)";
    } else {
      // collapse with transition
      panel.style.maxHeight = panel.scrollHeight + "px";
      requestAnimationFrame(() => { panel.style.maxHeight = "0px"; });
      icon.style.transform = "rotate(0)";
      panel.addEventListener("transitionend", () => {
        if (btn.getAttribute("aria-expanded") === "false") panel.hidden = true;
      }, { once: true });
    }
  });
});