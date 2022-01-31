import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]')
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log('selectedDate', selectedDates);
    localStorage.setItem('selectedDate', selectedDates[0]);
    console.log(selectedDates[0]);
    console.log(Date.parse(selectedDates[0]));
    console.log(Date.now());
    if (Date.parse(selectedDates[0]) < Date.now()) {
      window.alert("Please choose a date in the future");
      return;
    }
    refs.startBtn.removeAttribute('disabled', 'disabled');
  }
}

const fp = flatpickr("#datetime-picker", options);

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }
    const finalDate = localStorage.getItem('selectedDate');
    // console.log('finalDate:', finalDate);
    const getFinalUnixTime = Date.parse(finalDate);

    localStorage.removeItem('selectedDate');
    this.isActive = true;

    this.intervalId = setInterval(() => {
      // console.log('defaultDate:', options.defaultDate);
      const currentTime = Date.now();
      // console.log('getFinalUnixTime:', getFinalUnixTime);
      // console.log('currentTime:', currentTime);
      if (getFinalUnixTime < currentTime) {
          this.stop();
          return;
      }
      
      const deltaTime = getFinalUnixTime - currentTime;
      // console.log(deltaTime);
      
      const timeComponents = this.convertMs(deltaTime);
      console.log(timeComponents);
      const { days, hours, minutes, seconds } = timeComponents;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);

      toDrawTimerFace(timeComponents);
    }, 1000)
  }

  stop() {
    clearInterval(this.intervalId);
    refs.startBtn.setAttribute('disabled', 'disabled');
    this.isActive = false;
  }

  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

    addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer();

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function toDrawTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}