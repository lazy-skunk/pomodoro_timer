export class PomodoroUI {
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

  updateStatus(status) {
    const { isWorkTime, isPaused, isBreak, isReset, currentCycles, maxCycles } =
      status;

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

  addTomato() {
    const img = document.createElement("img");
    img.src = "static/tomato.png";
    img.alt = "Tomato";
    img.style.width = "50px";
    img.style.margin = "0 5px";
    this.#elements.tomatoContainer.appendChild(img);
  }

  clearTomatoes() {
    this.#elements.tomatoContainer.innerHTML = "";
  }

  #getDOMElements() {
    return {
      remainingTime: document.getElementById("remaining-time"),
      statusDisplay: document.getElementById("status"),
      startButton: document.getElementById("start-button"),
      pauseButton: document.getElementById("pause-button"),
      resetButton: document.getElementById("reset-button"),
      resumeButton: document.getElementById("resume-button"),
      tomatoContainer: document.getElementById("tomato-container"),
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
