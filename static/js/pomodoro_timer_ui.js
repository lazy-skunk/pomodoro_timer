export class PomodoroTimerUI {
  #elements;
  #alarm;
  #lowAlarm;

  constructor(alarm, lowAlarm) {
    this.#elements = this.#getDOMElements();
    this.#alarm = alarm;
    this.#lowAlarm = lowAlarm;
  }

  addEventListeners({ onStart, onPause, onResume, onReset }) {
    this.#elements.startButton.addEventListener("click", onStart);
    this.#elements.pauseButton.addEventListener("click", onPause);
    this.#elements.resumeButton.addEventListener("click", onResume);
    this.#elements.resetButton.addEventListener("click", onReset);
  }

  enablePauseAndResetButtons() {
    this.#toggleButton(this.#elements.startButton, false);
    this.#toggleButton(this.#elements.pauseButton, true);
    this.#toggleButton(this.#elements.resetButton, true);
  }

  enableResumeButton() {
    this.#toggleButton(this.#elements.pauseButton, false);
    this.#toggleButton(this.#elements.resumeButton, true);
  }

  enablePauseButton() {
    this.#toggleButton(this.#elements.pauseButton, true);
    this.#toggleButton(this.#elements.resumeButton, false);
  }

  enableStartButtonOnly() {
    this.#toggleButton(this.#elements.startButton, true);
    this.#toggleButton(this.#elements.pauseButton, false);
    this.#toggleButton(this.#elements.resumeButton, false);
    this.#toggleButton(this.#elements.resetButton, false);
  }

  updateRemainingTime(minutes, seconds) {
    const formattedTime = this.#formatTime(minutes, seconds);
    this.#elements.remainingTime.innerText = formattedTime;
  }

  updateStatus(timerStatus) {
    const { isWorkTime, isPaused, isBreak, isReset, currentCycles, maxCycles } =
      timerStatus;

    if (isReset) {
      this.#elements.statusDisplay.textContent = "Ready";
    } else if (isPaused) {
      this.#elements.statusDisplay.textContent = "Paused";
    } else if (isWorkTime) {
      this.#elements.statusDisplay.textContent = "Work";
    } else {
      if (isBreak) {
        if (currentCycles % maxCycles === 0) {
          this.#elements.statusDisplay.textContent = "Long Break";
        } else {
          this.#elements.statusDisplay.textContent = "Short Break";
        }
      }
    }
  }

  playAlarm() {
    this.#alarm.play();
  }

  playLowAlarm() {
    this.#lowAlarm.play();
  }

  addPomodoro(timerStatus) {
    const pomodoro = document.createElement("div");

    const { currentCycles } = timerStatus;
    const pomodoroId = `pomodoro-${currentCycles}`;
    pomodoro.id = pomodoroId;

    pomodoro.classList.add("pomodoro");

    const stemAndLeaves = document.createElement("div");
    stemAndLeaves.classList.add("stem-leaf");
    pomodoro.appendChild(stemAndLeaves);
    for (let i = 1; i <= 5; i++) {
      const stemAndLeaves = document.createElement("div");
      stemAndLeaves.classList.add("stem-leaf", `leaf-${i}`);
      pomodoro.appendChild(stemAndLeaves);
    }

    this.#elements.pomodoroContainer.appendChild(pomodoro);
  }

  ripenPomodoro(timerStatus) {
    const { workDuration, remainingTime, currentCycles } = timerStatus;
    const pomodoroId = `pomodoro-${currentCycles}`;
    const pomodoroElement = document.getElementById(pomodoroId);

    const rStart = 64,
      rEnd = 255;
    const gStart = 128,
      gEnd = 32;
    const bValue = 0;

    const rValue = Math.floor(
      rStart + (rEnd - rStart) * (1 - remainingTime / workDuration)
    );
    const gValue = Math.floor(
      gStart - (gStart - gEnd) * (1 - remainingTime / workDuration)
    );

    pomodoroElement.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
  }

  clearPomodori() {
    this.#elements.pomodoroContainer.innerHTML = "";
  }

  #getDOMElements() {
    return {
      remainingTime: document.getElementById("remaining-time"),
      statusDisplay: document.getElementById("status"),
      startButton: document.getElementById("start-button"),
      pauseButton: document.getElementById("pause-button"),
      resetButton: document.getElementById("reset-button"),
      resumeButton: document.getElementById("resume-button"),
      pomodoroContainer: document.getElementById("pomodoro-container"),
    };
  }

  #toggleButton(button, show) {
    if (show) {
      button.classList.remove("btn-hidden");
      button.classList.add("btn-visible");
    } else {
      button.classList.remove("btn-visible");
      button.classList.add("btn-hidden");
    }
  }

  #formatTime(minutes, seconds) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
