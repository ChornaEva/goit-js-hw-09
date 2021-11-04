import '/css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const inputNode = document.querySelector('#datetime-picker');
const timerNode = document.querySelector('.timer');
const daysNode = document.querySelector('[data-days]');
const hoursNode = document.querySelector('[data-hours]');
const minutesNode = document.querySelector('[data-minutes]');
const secondsNode = document.querySelector('[data-seconds]');

// обьявила глобальные переменные (вопрос с карент тайм)
let intervalId = null;
let selectedTime = null;
let currentTime = Date.now();

// добавила календарь
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = selectedDates[0].getTime();

        if (selectedTime < currentTime) {
            startButton.disabled = true;
            return window.alert("Please choose a date in the future");
        }
        else {
            startButton.disabled = false;
        }      
  },
};

flatpickr("#datetime-picker", options);

// описала запуск таймера
const timer = {
    start() {
        startButton.disabled = true;
        intervalId = setInterval(() => {
            currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const time = convertMs(deltaTime);
            
            updateClockface(time);
        }, 1000);

    },
};

startButton.addEventListener('click', () => {
    timer.start();
})

function updateClockface({ days, hours, minutes, seconds }) {
   daysNode.textContent = `${days}`;
    hoursNode.textContent = `${hours}`;
    minutesNode.textContent = `${minutes}`;
    secondsNode.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


