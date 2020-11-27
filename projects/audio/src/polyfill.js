var windowRef = typeof window === 'undefined' ? global : window;

windowRef.AudioContext = windowRef.AudioContext || windowRef.webkitAudioContext;
windowRef.OscillatorNode = windowRef.OscillatorNode || function() {};
windowRef.AudioBufferSourceNode = windowRef.AudioBufferSourceNode || function() {};
windowRef.PannerNode = windowRef.PannerNode || windowRef.webkitAudioPannerNode;
windowRef.StereoPannerNode = windowRef.StereoPannerNode || windowRef.PannerNode;

// Just to compile in old browsers, these features are not supported if not supported natively
windowRef.BaseAudioContext = windowRef.BaseAudioContext || windowRef.AudioContext;
windowRef.OfflineAudioContext = windowRef.OfflineAudioContext || windowRef.AudioContext;
windowRef.ConstantSourceNode = windowRef.ConstantSourceNode || function() {};
windowRef.AudioWorkletNode = windowRef.AudioWorkletNode || function() {};
windowRef.IIRFilterNode = windowRef.IIRFilterNode || function() {};
windowRef.MediaStreamAudioDestinationNode =
    windowRef.MediaStreamAudioDestinationNode || function() {};
windowRef.MediaStreamAudioSourceNode =
    windowRef.MediaStreamAudioSourceNode || function() {};
windowRef.MediaStreamTrackAudioSourceNode =
    windowRef.MediaStreamTrackAudioSourceNode || function() {};
