let intervalId = null;
const COLOR_SWITCH_INTERVAL = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  stopBtn: document.querySelector('button[data-stop]'),
  startBtn: document.querySelector('button[data-start]'),
  body: document.querySelector('body'),
  buttons: document.querySelectorAll('button')
}

refs.startBtn.addEventListener('click', onSwitchColor);
refs.stopBtn.addEventListener('click', stopSwitchColor);

function onSwitchColor() {
  switchBtnDesabled();
  refs.stopBtn.removeAttribute('disabled', 'disabled');

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    console.log('switch color');
  }, COLOR_SWITCH_INTERVAL);
};

function stopSwitchColor() {
  switchBtnDesabled();
  refs.startBtn.removeAttribute('disabled', 'disabled');
  console.log('stop');
  clearInterval(intervalId);
};

function switchBtnDesabled() {
  refs.buttons.forEach(btn => {
    if (!btn.disabled) {
      btn.setAttribute('disabled', 'disabled');
    };
  });
};