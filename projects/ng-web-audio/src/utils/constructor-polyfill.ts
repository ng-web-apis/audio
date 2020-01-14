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
            const {get, set, value, enumerable, configurable} = descriptor;
            const newDescriptor: PropertyDescriptor = {
                enumerable,
                configurable,
            };

            if (get) {
                newDescriptor.get = get.bind(node);
            }

            if (set) {
                newDescriptor.set = set.bind(node);
            }

            if (typeof value === 'function') {
                newDescriptor.value = value.bind(node);
            }

            Object.defineProperty(that, prop, newDescriptor);
        }
    });
}
