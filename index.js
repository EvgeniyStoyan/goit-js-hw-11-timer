class CountdownTimer {
  constructor({ onTick }) {
    this.onTick = onTick;
  }

  refs() {
    return {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      mins: document.querySelector('span[data-value="mins"]'),
      secs: document.querySelector('span[data-value="secs"]'),
      label: document.querySelectorAll('.label'),
    };
  }

  updateTimer(date) {
    const textDisplay = this.refs();
    (textDisplay.days.textContent = `${date.days}`),
      (textDisplay.hours.textContent = `${date.hours}`),
      (textDisplay.mins.textContent = `${date.mins}`),
      (textDisplay.secs.textContent = `${date.secs}`);
  }

  start() {
    this.intervalId = setInterval(() => {
      const startTime = new Date().getTime();
      const deltaTime = this.onTick - startTime;
      const time = this.getTimeComponents(deltaTime);
      this.updateTimer(time);

      if (deltaTime < 0) {
        const textDisplay = this.refs();
        clearInterval(this.intervalId);

        textDisplay.days.textContent = '00';
        textDisplay.hours.textContent = '00';
        textDisplay.mins.textContent = '00';
        textDisplay.secs.textContent = '00';
      }
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const countdownTimer = new CountdownTimer({
  onTick: new Date('July 04, 2022 13:42:00').getTime(),
});

countdownTimer.start();
