import {AudioNodeFactoryMethod} from '../types/audio-node-factory-method';

export function constructorPolyfill<T extends AudioNode>(
    method: AudioNodeFactoryMethod,
): ClassDecorator {
    return (constructor: Function) => {
        const context = new AudioContext();

        try {
            const test = new GainNode(context);

            test.channelCount = 2;
            context.close();
        } catch (_) {
            const patched: any = (context: AudioContext) => {
                // tslint:disable-next-line:no-console
                console.log('Patched');

                const result = context[method]();

                Object.setPrototypeOf(result, constructor.prototype);

                return result as T;
            };

            context.close();
            patched.prototype = constructor.prototype;

            return patched;
        }
    };
}
