import numpy as np
from scipy.io.wavfile import write

SAMPLE_RATE = 44100


def generate_tone(
    frequency, duration: float, sample_rate: int = SAMPLE_RATE, volume: float = 0.5
)np.ndarray:
    num_samples = int(sample_rate * duration)

    t = np.linspace(0, duration, num_samples, False)
    tone = np.sin(frequency * t * 2 * np.pi)

    audio = tone * (2**15 - 1) * volume
    audio = audio.astype(np.int16)
    return audio


ALARM_FREQUENCY = 880
ALARM_DURATION = 1

LOW_FREQUENCY = 440
LOW_DURATION = 0.3

alarm_sound = generate_tone(ALARM_FREQUENCY, ALARM_DURATION)
write("static/alarm.wav", SAMPLE_RATE, alarm_sound)

low_sound = generate_tone(LOW_FREQUENCY, LOW_DURATION)
write("static/low_alarm.wav", SAMPLE_RATE, low_sound)
