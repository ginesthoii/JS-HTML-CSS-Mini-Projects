// Language dropdown
const languageBtn = document.getElementById("language-btn");
const languageList = document.getElementById("language-dropdown");

if (languageBtn && languageList) {
  languageBtn.addEventListener("click", (e) => {
    const expanded = languageBtn.getAttribute("aria-expanded") === "true";
    languageBtn.setAttribute("aria-expanded", (!expanded).toString());
    languageList.hidden = expanded;
  });

  document.addEventListener("click", (e) => {
    if (!languageBtn.contains(e.target)) {
      languageBtn.setAttribute("aria-expanded", "false");
      languageList.hidden = true;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      languageBtn.setAttribute("aria-expanded", "false");
      languageList.hidden = true;
      languageBtn.focus();
    }
  });
}

// FAQ accordion
const faqButtons = document.querySelectorAll(".faq-btn");

faqButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", (!expanded).toString());

    const icon = btn.querySelector("i");
    const panel = btn.nextElementSibling;

    if (!expanded) {
      panel.hidden = false;
      // set to auto height for animation
      const h = panel.scrollHeight;
      panel.style.maxHeight = h + "px";
      icon.style.transform = "rotate(45deg)";
    } else {
      // collapse
      panel.style.maxHeight = panel.scrollHeight + "px"; // set current height to enable transition
      requestAnimationFrame(() => {
        panel.style.maxHeight = "0px";
      });
      icon.style.transform = "rotate(0)";
      // hide after transition
      panel.addEventListener(
        "transitionend",
        () => {
          if (btn.getAttribute("aria-expanded") === "false") panel.hidden = true;
        },
        { once: true }
      );
    }
  });
});