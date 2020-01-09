AudioContext = AudioContext || webkitAudioContext;

const context = new AudioContext();

try {
    const gain = new GainNode(context);
} catch (e) {
    // Constructor for AudioNode not supported, probably running Safari
    function BiquadFilterNode(context) {
        return context.createBiquadFilter();
    }
    function ConvolverNode(context) {
        return context.createConvolver();
    }
    function DelayNode(context) {
        return context.createDelay();
    }
    function DynamicsCompressorNode(context) {
        return context.createDynamicsCompressor();
    }
    function GainNode(context) {
        return context.createGain();
    }
    function PannerNode(context) {
        return context.createPanner();
    }
    function StereoPannerNode(context) {
        return context.createStereoPanner();
    }
    function WaveShaperNode(context) {
        return context.createWaveShaper();
    }
    function AudioBufferSourceNode(context) {
        return context.createBufferSource();
    }
    function MediaElementAudioSourceNode(context, element) {
        return context.createMediaElementSource(element);
    }
    function OscillatorNode(context) {
        return context.createOscillator();
    }
}

context.close();
