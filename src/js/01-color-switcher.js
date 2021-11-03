const bodyNode = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', (event) => {
  startButton.disabled = true;

  timerId = setInterval(() => {
    bodyNode.style.backgroundColor = getRandomHexColor();
  }, 1000)
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  clearTimeout(timerId);
})