const body = document.body;
const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  // small haptic-y feedback via scale
  toggle.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], {
    duration: 120,
    easing: 'ease-out'
  });
});