import {AudioNodeWithParams} from '../types/audio-node-with-params';
import {AudioParamDecorator} from '../types/audio-param-decorator';
import {AudioParamInput} from '../types/audio-param-input';

export function audioParam<K extends string>(param: K): AudioParamDecorator<K> {
    const decorator: AudioParamDecorator<K> = (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            set(this: AudioNodeWithParams<K>, value: AudioParamInput) {
                this[param].setValueAtTime(value, this.context.currentTime);
            },
        });
    };

    return decorator;
}
