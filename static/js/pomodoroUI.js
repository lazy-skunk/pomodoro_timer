export class PomodoroUI {
  #elements;

  constructor() {
    this.#elements = this.#getDOMElements();
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

  addEventListeners(timer) {
    this.#elements.startButton.addEventListener("click", () =>
      timer.startTimer()
    );
    this.#elements.pauseButton.addEventListener("click", () =>
      timer.pauseTimer()
    );
    this.#elements.resumeButton.addEventListener("click", () =>
      timer.resumeTimer()
    );
    this.#elements.resetButton.addEventListener("click", () =>
      timer.resetTimer()
    );
  }

  showPauseAndResetButtons() {
    this.#elements.startButton.style.display = "none";
    this.#elements.pauseButton.style.display = "inline-block";
    this.#elements.resetButton.style.display = "inline-block";
  }

  showPauseButton() {
    this.#elements.resumeButton.style.display = "none";
    this.#elements.pauseButton.style.display = "inline-block";
  }

  showResumeButton() {
    this.#elements.pauseButton.style.display = "none";
    this.#elements.resumeButton.style.display = "inline-block";
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

  updateStatus(
    isWorkTime,
    isBreakTime,
    isPaused,
    isReset,
    currentCycles,
    maxCycles
  ) {
    if (isPaused) {
      this.#elements.statusDisplay.textContent = "Paused";
    } else if (isReset) {
      this.#elements.statusDisplay.textContent = "Ready";
    } else if (isWorkTime) {
      this.#elements.statusDisplay.textContent = "Work";
    } else if (isBreakTime) {
      if (currentCycles < maxCycles) {
        this.#elements.statusDisplay.textContent = "Short Break";
      } else {
        this.#elements.statusDisplay.textContent = "Long Break";
      }
    }
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
