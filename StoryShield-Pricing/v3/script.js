const body = document.body;
const toggle = document.querySelector('.toggle');
const billButtons = document.querySelectorAll('.bill-btn');
const priceNodes = document.querySelectorAll('.price');
const saveFlags = document.querySelectorAll('.save-flag');

function setBilling(mode) {
  const annual = mode === 'annual';

  priceNodes.forEach(node => {
    const currency = node.dataset.currency || '$';
    const monthly = node.dataset.monthly || '0';
    const annualTotal = node.dataset.annual || monthly; // fallback
    const amountSpan = node.querySelector('.amount');
    const perSpan = node.querySelector('.per');

    if (annual) {
      amountSpan.textContent = annualTotal;
      perSpan.textContent = '/yr';
      node.setAttribute('aria-label', `${currency}${annualTotal} per year, billed annually`);
    } else {
      amountSpan.textContent = monthly;
      perSpan.textContent = '/mo';
      node.setAttribute('aria-label', `${currency}${monthly} per month`);
    }
  });

  // show "Save 17%" badges only in annual mode
  saveFlags.forEach(flag => {
    flag.style.display = annual ? 'inline-block' : 'none';
  });

  // update button state
  billButtons.forEach(btn => {
    const active = btn.dataset.billing === mode;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

billButtons.forEach(btn => {
  btn.addEventListener('click', () => setBilling(btn.dataset.billing));
});

// theme toggle
toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  toggle.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }],
    { duration: 120, easing: 'ease-out' }
  );
});

// default to monthly on load
setBilling('monthly');