export type AudioNodeFactoryMethod = {
    [K in keyof BaseAudioContext]: BaseAudioContext[K] extends () => AudioNode
        ? K
        : never;
}[keyof BaseAudioContext];
