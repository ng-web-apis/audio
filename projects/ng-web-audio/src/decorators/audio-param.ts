import {AudioNodeWithParams} from '../types/audio-node-with-params';
import {AudioParamDecorator} from '../types/audio-param-decorator';
import {AudioParamInput} from '../types/audio-param-input';
import {processAudioParam} from '../utils/process-audio-param';

export function audioParam<K extends string>(param: K): AudioParamDecorator<K> {
    const decorator: AudioParamDecorator<K> = (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            set(this: AudioNodeWithParams<K>, value: AudioParamInput) {
                if (this[param] instanceof AudioParam) {
                    processAudioParam(this[param], value, this.context.currentTime);
                } else {
                    // Fallback for older browsers for
                    Object.defineProperty(target, propertyKey, {value});
                }
            },
        });
    };

    return decorator;
}
