export function constructorPolyfill<T extends AudioNode>(that: any, node: T) {
    if (!(that instanceof node.constructor)) {
        polyfillAudioNode(that, node);
    }
}

function polyfillAudioNode<T extends AudioNode>(that: any, node: T) {
    const proto = Object.getPrototypeOf(node);
    const props = Object.getOwnPropertyNames(proto);
    const audioNodeProto = Object.getPrototypeOf(proto);
    const audioNodeProps = Object.getOwnPropertyNames(audioNodeProto);

    [...audioNodeProps, ...props].forEach(prop => {
        const descriptor =
            Object.getOwnPropertyDescriptor(proto, prop) ||
            Object.getOwnPropertyDescriptor(audioNodeProto, prop);

        if (prop !== 'constructor' && descriptor) {
            const {writable, enumerable, configurable} = descriptor;
            let {get, set, value} = descriptor;

            get = get ? get.bind(node) : undefined;
            set = set ? set.bind(node) : undefined;
            value = typeof value === 'function' ? value.bind(node) : value;

            Object.defineProperty(that, prop, {
                writable,
                enumerable,
                configurable,
                get,
                set,
                value,
            });
        }
    });
}
