export class PomodoroUI {
  #elements;
  #alarm;
  #lowAlarm;

  constructor(alarm, lowAlarm) {
    this.#elements = this.#getDOMElements();
    this.#alarm = alarm;
    this.#lowAlarm = lowAlarm;
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

  addEventListeners({ onStart, onPause, onResume, onReset }) {
    this.#elements.startButton.addEventListener("click", onStart);
    this.#elements.pauseButton.addEventListener("click", onPause);
    this.#elements.resumeButton.addEventListener("click", onResume);
    this.#elements.resetButton.addEventListener("click", onReset);
  }

  showPauseAndResetButtons() {
    this.#elements.startButton.style.display = "none";
    this.#elements.pauseButton.style.display = "inline-block";
    this.#elements.resetButton.style.display = "inline-block";
  }

  showResumeButton() {
    this.#elements.pauseButton.style.display = "none";
    this.#elements.resumeButton.style.display = "inline-block";
  }

  showPauseButton() {
    this.#elements.pauseButton.style.display = "inline-block";
    this.#elements.resumeButton.style.display = "none";
  }

  showStartButton() {
    this.#elements.startButton.style.display = "inline-block";
    this.#elements.pauseButton.style.display = "none";
    this.#elements.resumeButton.style.display = "none";
    this.#elements.resetButton.style.display = "none";
  }

  #formatTime(minutes, seconds) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  updateRemainingTime(minutes, seconds) {
    const formattedTime = this.#formatTime(minutes, seconds);
    this.#elements.remainingTime.innerText = formattedTime;
  }

  updateStatus(status) {
    const { isWorkTime, isPaused, isBreak, isReset, currentCycles, maxCycles } =
      status;

    if (isReset) {
      this.#elements.statusDisplay.textContent = "Ready"; // リセット状態
    } else if (isPaused) {
      this.#elements.statusDisplay.textContent = "Paused"; // ポーズ状態
    } else if (isWorkTime) {
      this.#elements.statusDisplay.textContent = "Work"; // 作業時間
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
}
