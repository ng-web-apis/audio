import {AudioNodeFactoryMethod} from '../types/audio-node-factory-method';

type Constructor<T> = (new (...args: any[]) => T) & {
    init: (that: T, node: AudioNode | null, ...args: any[]) => void;
};

export function constructorPolyfill<T extends AudioNode>(
    context: BaseAudioContext,
    method: AudioNodeFactoryMethod,
    constructor: Constructor<T>,
    node: AudioNode | null = null,
    ...args: any[]
): T | void {
    try {
        // @ts-ignore
        const _test = new GainNode(context);
    } catch (_) {
        const result = context[method]() as T;

        Object.setPrototypeOf(result, constructor.prototype);
        constructor.init(result, node, ...args);

        return result;
    }
}
