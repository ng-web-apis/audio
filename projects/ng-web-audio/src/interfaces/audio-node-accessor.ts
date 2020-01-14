/**
 * Safari and older browsers do not support constructor mode of creating AudioNodes,
 * so `this` does not reference AudioNode in them. Use node getter when referencing
 * your AudioNodes through template reference variables.
 */
// tslint:disable-next-line:interface-name
export interface AudioNodeAccessor {
    readonly node: AudioNode;
}
