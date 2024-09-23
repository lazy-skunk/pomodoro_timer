import numpy as np
from scipy.io.wavfile import write


class ToneGenerator:
    def __init__(self, sample_rate: int = 44100) -> None:
        self._sample_rate = sample_rate

    @staticmethod
    def _validate_tone_parameters(
        frequency: int, duration: float, volume: float
    ) -> None:
        if frequency <= 0:
            raise ValueError("Frequency must be positive.")
        if duration <= 0:
            raise ValueError("Duration must be positive.")
        if not (0 <= volume <= 1):
            raise ValueError("Volume must be between 0 and 1.")

    def generate_tone(
        self, frequency: int, duration: float, volume: float = 0.5
    ) -> np.ndarray:
        self._validate_tone_parameters(frequency, duration, volume)

        num_samples = int(self._sample_rate * duration)
        t = np.linspace(0, duration, num_samples, False)
        tone = np.sin(frequency * t * 2 * np.pi)

        audio = tone * (2**15 - 1) * volume
        return audio.astype(np.int16)

    def save_tone(self, filename: str, tone: np.ndarray) -> None:
        write(filename, self._sample_rate, tone)


if __name__ == "__main__":
    generator = ToneGenerator()

    alarm_sound = generator.generate_tone(frequency=880, duration=1)
    generator.save_tone("alarm.wav", alarm_sound)

    low_sound = generator.generate_tone(frequency=440, duration=0.3)
    generator.save_tone("low_alarm.wav", low_sound)
