AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
StereoPannerNode = globalThis.StereoPannerNode || globalThis.PannerNode;

// Just to compile in Safari, these features are not supported if not supported natively
BaseAudioContext = globalThis.BaseAudioContext || globalThis.AudioContext;
OfflineAudioContext = globalThis.OfflineAudioContext || globalThis.AudioContext;

const context = new AudioContext();

try {
    const gain = new GainNode(context);
} catch (e) {
    // Constructor for AudioNode not supported, probably running Safari, will be polyfilled using setPrototypeOf
    globalThis.AnalyserNode = function() {};
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
