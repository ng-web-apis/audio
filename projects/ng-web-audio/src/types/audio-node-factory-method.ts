export type AudioNodeFactoryMethod = {
    [K in keyof AudioContext]: AudioContext[K] extends () => AudioNode ? K : never;
}[keyof AudioContext];
