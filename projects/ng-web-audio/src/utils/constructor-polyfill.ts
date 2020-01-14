export function constructorPolyfill<T extends AudioNode>(that: any, node: T) {
    if (!(that instanceof node.constructor)) {
        polyfillAudioNode(that, node);
    }
}

function polyfillAudioNode(that: any, node: AudioNode) {
    const proto = Object.getPrototypeOf(node);
    const audioNodeProto = Object.getPrototypeOf(proto);

    Object.defineProperties(that, Object.getOwnPropertyDescriptors(audioNodeProto));
    Object.defineProperties(that, Object.getOwnPropertyDescriptors(proto));
}
