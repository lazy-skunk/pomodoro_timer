export class PomodoroTimer {
  constructor(ui, alarm, lowAlarm, config) {
    this.ui = ui;

    this.alarm = alarm;
    this.lowAlarm = lowAlarm;

    this.workDuration = config.workDuration;
    this.shortBreakDuration = config.shortBreakDuration;
    this.longBreakDuration = config.longBreakDuration;
    this.maxCycles = config.maxCycles;

    this.timer = null;
    this.remainingTime = this.workDuration;
    this.currentCycles = 0;
    this.isWorkTime = false;
    this.isBreakTime = false;
    this.isPaused = false;
    this.isReset = false;
  }

  initialize() {
    this.ui.addEventListeners(this);
  }

  startTimer() {
    this.isWorkTime = true;
    this.isReset = false;

    this.timer = setInterval(this.updateTimer.bind(this), 1000);

    this.ui.updateStatus(
      this.isWorkTime,
      this.isBreakTime,
      this.isPaused,
      this.isReset,
      this.currentCycles,
      this.maxCycles
    );

    this.ui.showPauseAndResetButtons();
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = null;

    this.isPaused = true;

    this.ui.updateStatus(
      this.isWorkTime,
      this.isBreakTime,
      this.isPaused,
      this.isReset,
      this.currentCycles,
      this.maxCycles
    );

    this.ui.showResumeButton();
  }

  resumeTimer() {
    this.isPaused = false;

    this.timer = setInterval(this.updateTimer.bind(this), 1000);

    this.ui.updateStatus(
      this.isWorkTime,
      this.isBreakTime,
      this.isPaused,
      this.isReset,
      this.currentCycles,
      this.maxCycles
    );

    this.ui.showPauseButton();
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.currentCycles = 0;

    this.isWorkTime = false;
    this.isBreakTime = false;
    this.isPaused = false;
    this.isReset = true;

    this.ui.updateRemainingTime(25, 0);

    this.ui.updateStatus(
      this.isWorkTime,
      this.isBreakTime,
      this.isPaused,
      this.isReset,
      this.currentCycles,
      this.maxCycles
    );

    this.ui.showStartButton();

    this.ui.resetTomatoes();
  }

  updateTimer() {
    let minutes = Math.floor(this.remainingTime / 60);
    let seconds = this.remainingTime % 60;
    this.ui.updateRemainingTime(minutes, seconds);

    if (this.remainingTime > 0) {
      if (this.remainingTime <= 3) {
        this.lowAlarm.play();
      }
      this.remainingTime--;
    } else {
      this.alarm.play();
      this.#timerFinished();
    }
  }

  #timerFinished() {
    if (this.isWorkTime) {
      this.currentCycles++;
      this.ui.addTomato();
    }

    if (this.isWorkTime) {
      this.isWorkTime = false;
      this.isBreakTime = true;
      if (this.currentCycles < this.maxCycles) {
        this.remainingTime = this.shortBreakDuration;
      } else {
        this.remainingTime = this.longBreakDuration;
      }
    } else {
      this.isWorkTime = true;
      this.isBreakTime = false;
      this.remainingTime = this.workDuration;
    }

    this.ui.updateStatus(
      this.isWorkTime,
      this.isBreakTime,
      this.isPaused,
      this.isReset,
      this.currentCycles,
      this.maxCycles
    );
  }
}
