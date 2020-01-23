import {WebAudioPeriodicWavePipe} from '../periodic-wave.pipe';

describe('waPeriodicWave', () => {
    const pipe = new WebAudioPeriodicWavePipe(new AudioContext());

    it('creates PeriodicWave', () => {
        expect(pipe.transform([10]) instanceof PeriodicWave).toBe(true);
    });
});
