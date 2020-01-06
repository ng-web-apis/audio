import {AudioNodeWithParams} from './audio-node-with-params';

export type AudioParamDecorator<K extends string> = (
    target: AudioNodeWithParams<K>,
    propertyKey: string | symbol,
) => void
