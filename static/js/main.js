import { PomodoroUI } from "./pomodoroUI.js";
import { PomodoroTimer } from "./pomodoroTimer.js";
import { timerConfig, audioConfig } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const pomodoroUI = new PomodoroUI();

  const alarm = new Audio(audioConfig.alarmUrl);
  const lowAlarm = new Audio(audioConfig.lowAlarmUrl);

  const pomodoroTimer = new PomodoroTimer(
    pomodoroUI,
    alarm,
    lowAlarm,
    timerConfig
  );

  pomodoroTimer.initialize();
});
