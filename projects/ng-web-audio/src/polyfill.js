AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
StereoPannerNode = globalThis.StereoPannerNode || globalThis.PannerNode;

const context = new AudioContext();

try {
    const gain = new GainNode(context);
} catch (e) {
    // Constructor for AudioNode not supported, probably running Safari, will be polyfilled using setPrototypeOf
    globalThis.BiquadFilterNode = function() {};
    globalThis.ConvolverNode = function() {};
    globalThis.DelayNode = function() {};
    globalThis.DynamicsCompressorNode = function() {};
    globalThis.GainNode = function() {};
    globalThis.PannerNode = function() {};
    globalThis.StereoPannerNode = function() {};
    globalThis.WaveShaperNode = function() {};
    globalThis.AudioBufferSourceNode = function() {};
    globalThis.MediaElementAudioSourceNode = function() {};
    globalThis.OscillatorNode = function() {};
}

context.close();
