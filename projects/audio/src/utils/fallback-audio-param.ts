import {AudioParamInput} from '../types/audio-param-input';

export function fallbackAudioParam(value?: AudioParamInput): number {
    return value || 0;
}
