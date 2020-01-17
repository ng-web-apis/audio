import {AudioParamInput} from '../types/audio-param-input';

export function processAudioParam(
    param: AudioParam,
    value: AudioParamInput,
    currentTime: number = 0,
) {
    param.setValueAtTime(value, currentTime);
}
