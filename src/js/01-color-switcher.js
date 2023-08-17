const elements = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}
elements.startBtn.addEventListener('click', onStartChangeColor);
elements.stopBtn.addEventListener('click', onStopChangeColor);

let changeColorInterval = null;
elements.stopBtn.setAttribute('disabled', 'disabled');

function onStartChangeColor() {
    changeColorInterval = setInterval(changeColor, 1000);
    elements.startBtn.setAttribute('disabled', 'disabled');
    elements.stopBtn.removeAttribute('disabled');
}

function changeColor() {
    document.body.style.background = getRandomHexColor();
}

function onStopChangeColor() {
    clearInterval(changeColorInterval);
    elements.startBtn.removeAttribute('disabled');
    elements.stopBtn.setAttribute('disabled', 'disabled')
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
