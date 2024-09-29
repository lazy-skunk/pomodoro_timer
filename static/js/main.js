import { PubSub } from "./pub_sub.js";
import { PomodoroModel } from "./pomodoro_model.js";
import { PomodoroUI } from "./pomodoro_ui.js";
import { PomodoroController } from "./pomodoro_controller.js";
import { timerConfig, audioConfig } from "./config.js";

const pubsub = new PubSub();

const alarm = new Audio(audioConfig.alarmUrl);
const lowAlarm = new Audio(audioConfig.lowAlarmUrl);

const pomodoroUI = new PomodoroUI(alarm, lowAlarm);

const pomodoroModel = new PomodoroModel(timerConfig, pubsub);

const pomodoroController = new PomodoroController(
  pomodoroModel,
  pomodoroUI,
  pubsub
);

document.addEventListener("DOMContentLoaded", () => {
  pomodoroController.initialize();
});
