import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';


const options = {
  isActive: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log('selectedDate', selectedDates);
    localStorage.setItem('selectedDate', selectedDates[0]);
  }
}

const fp = flatpickr("#datetime-picker", options);
const startRef = document.querySelector('button[data-start]');

const timer = {
  start() {
    if (options.isActive) {
      return;
    }
    const finalDate = localStorage.getItem('selectedDate');
    // console.log('finalDate:', finalDate);
    const getFinalUnixTime = Date.parse(finalDate);

    localStorage.removeItem('selectedDate');
    options.isActive = true;

    setInterval(() => {
      // console.log('defaultDate:', options.defaultDate);
      const currentTime = Date.now();
      // console.log('getFinalUnixTime:', getFinalUnixTime);
      // console.log('currentTime:', currentTime);
      const deltaTime = getFinalUnixTime - currentTime;
      // console.log(deltaTime);
      const timeComponents = convertMs(deltaTime);
      console.log(timeComponents);
      const { days, hours, minutes, seconds } = timeComponents;
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000)
  }
}

startRef.addEventListener('click', () => {
  timer.start();
});



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

