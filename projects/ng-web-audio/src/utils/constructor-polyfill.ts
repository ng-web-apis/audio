export function constructorPolyfill(that: AudioNode, node: AudioNode) {
    // tslint:disable-next-line:no-console
    console.log(that instanceof node.constructor);

    let o2nd = that;
    let o1st = Object.getPrototypeOf(o2nd);

    while (o1st !== Object.prototype && o1st !== Function.prototype) {
        o2nd = o1st;
        o1st = Object.getPrototypeOf(o2nd);
    }

    Object.setPrototypeOf(o2nd, node);
}
