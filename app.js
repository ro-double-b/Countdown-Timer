let start = 0;
let interval;

function leadingZeroCheck(time) {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
}

function startCountdown() {
  if (start === 0) {
    let endDate;
    document.getElementById('submit').innerHTML = 'Reset';

    // ensures user picks a date
    if (document.getElementById('endDate').value === '') {
      endDate = new Date().getTime();
      alert('Please select a date.');
      document.getElementById('submit').innerHTML = 'Submit';
    } else {
      // had to minipulate the string that the user input from local time to UTC to get accurate countdown
      endDate = new Date(document.getElementById('endDate').value.replace(/-/g, '/').replace('T', ' ')).getTime();
    }
    interval = setInterval(() => {
      const curDate = new Date().getTime();
      const time = endDate - curDate;

      const secondsPerMin = 1000 * 60;
      const secondsPerHr = secondsPerMin * 60;
      const secondsPerDay = secondsPerHr * 24;

      const day = Math.floor(time / secondsPerDay);
      const hr = Math.floor((time % secondsPerDay) / secondsPerHr);
      const min = Math.floor((time % secondsPerHr) / secondsPerMin);
      const sec = Math.floor((time % secondsPerMin) / 1000);

      document.getElementById('day').innerHTML = day;
      document.getElementById('hr').innerHTML = leadingZeroCheck(hr);
      document.getElementById('min').innerHTML = leadingZeroCheck(min);
      document.getElementById('sec').innerHTML = leadingZeroCheck(sec);

      if (time < 0) {
        clearInterval(interval);
        document.getElementById('day').innerHTML = '0';
        document.getElementById('hr').innerHTML = '00';
        document.getElementById('min').innerHTML = '00';
        document.getElementById('sec').innerHTML = '00';
      }
    }, 1000);
    start = 1;
  } else {
    clearInterval(interval);
    start = 0;
    startCountdown();
  }
}
