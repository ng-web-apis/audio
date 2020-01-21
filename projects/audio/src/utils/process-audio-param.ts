import {AudioParamAutomation} from '../types/audio-param-automation';
import {AudioParamInput} from '../types/audio-param-input';

export function processAudioParam(
    param: AudioParam,
    value: AudioParamInput,
    currentTime: number = 0,
) {
    if (param.cancelAndHoldAtTime) {
        param.cancelAndHoldAtTime(currentTime);
    } else {
        param.cancelScheduledValues(currentTime);
        param.setValueAtTime(param.value, currentTime);
    }

    if (typeof value === 'number') {
        param.value = value;

        return;
    }

    if (value instanceof Array) {
        value.forEach(automation => {
            if ('mode' in automation) {
                processAutomation(param, automation, currentTime);
            } else {
                param.setValueCurveAtTime(
                    automation.value,
                    currentTime,
                    automation.duration,
                );
            }

            currentTime += automation.duration;
        });

        return;
    }

    if (!('mode' in value)) {
        param.setValueCurveAtTime(value.value, currentTime, value.duration);

        return;
    }

    param.setValueAtTime(param.value, currentTime);
    processAutomation(param, value, currentTime);
}

function processAutomation(
    param: AudioParam,
    {value, mode = 'instant', duration}: AudioParamAutomation,
    currentTime: number,
) {
    switch (mode) {
        case 'instant':
            param.setValueAtTime(value, currentTime);
            param.setValueAtTime(value, currentTime + duration);
            break;
        case 'exponential':
            param.exponentialRampToValueAtTime(value || 0.001, currentTime + duration);
            param.setValueAtTime(value, currentTime + duration);
            break;
        case 'linear':
            param.linearRampToValueAtTime(value, currentTime + duration);
            break;
    }
}
