import Notiflix, { Notify } from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minutesValue: document.querySelector('span[data-minutes]'),
    secondsValue: document.querySelector('span[data-seconds]')
}

refs.startBtn.addEventListener('click', onDateSelection);
refs.startBtn.disabled = true;

let endDateValue = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    endDateValue = Number(selectedDates[0]);
      if (endDateValue < new Date()) {
          Notiflix.Notify.failure('Please choose a date in the future');
      }
    else {
        refs.startBtn.disabled = false;
    }
  },
};

let dateValue = flatpickr(refs.input, options);

function onDateSelection() {
    dateValue.destroy(refs.input, options);
    refs.startBtn.disabled = true;

    const startTimer = setInterval(() => {
        const startDate = Date.now();
        const ms = endDateValue - startDate;
        const remaningTime = convertMs(ms);
        updateClockValue(remaningTime);
    }, 1000)
    setTimeout(() => {
        Notify.success('FINISH');
        clearInterval(startTimer);
    }, endDateValue - Date.now());
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
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

function updateClockValue({ days, hours, minutes, seconds }) {
    refs.daysValue.textContent = `${days}`;
    refs.hoursValue.textContent = `${hours}`;
    refs.minutesValue.textContent = `${minutes}`;
    refs.secondsValue.textContent = `${seconds}`;
}


