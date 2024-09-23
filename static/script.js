document.addEventListener('DOMContentLoaded', (event) => {
    // const workDuration = 4//25 * 60;
    // const shortBreakDuration = 4//5 * 60;
    // const longBreakDuration = 4//15 * 60;
    const workDuration = 25 * 60;
    const shortBreakDuration = 5 * 60;
    const longBreakDuration = 15 * 60;
    let timer;
    let cycles = 0;
    const maxCycles = 4;
    let countdown;
    let isWorkTime = true;
    let isPaused = false;

    const timerContainer = document.querySelector('.timer-container');
    const alarmUrl = timerContainer.getAttribute('data-alarm-url');
    const lowAlarmUrl = timerContainer.getAttribute('data-low-alarm-url');

    const alarm = new Audio(alarmUrl);
    const lowAlarm = new Audio(lowAlarmUrl);
    const statusDisplay = document.getElementById('status');

    function startTimer() {
        if (isPaused) {
            isPaused = false;
            countdown = setInterval(updateTimer, 1000);
        } else {
            clearInterval(countdown);
            timer = isWorkTime ? workDuration : (cycles < maxCycles ? shortBreakDuration : longBreakDuration);
            updateStatus();
            countdown = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(countdown);
        isPaused = true;
    }

    function resetTimer() {
        clearInterval(countdown);
        document.getElementById('timer').innerText = '25:00';
        statusDisplay.textContent = 'Work';
        isWorkTime = true;
        isPaused = false;
        cycles = 0;
    }

    function updateStatus() {
        if (isWorkTime) {
            statusDisplay.textContent = 'Work';
        } else {
            statusDisplay.textContent = cycles < maxCycles ? 'Short Break' : 'Long Break';
        }
    }

    function updateTimer() {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timer > 0) {
            if (timer <= 3) {
                lowAlarm.play();
            }
            timer--;
        } else {
            clearInterval(countdown);
            alarm.play();
            if (isWorkTime) {
                cycles++;
                isWorkTime = false;
            } else {
                isWorkTime = true;
                if (cycles >= maxCycles) {
                    cycles = 0;
                }
            }
            startTimer();
        }
    }

    window.startTimer = startTimer;
    window.pauseTimer = pauseTimer;
    window.resetTimer = resetTimer;
});

