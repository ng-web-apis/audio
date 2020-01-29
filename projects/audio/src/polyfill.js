var windowRef = typeof window === 'undefined' ? globalThis : window;

AudioContext = windowRef.AudioContext || windowRef.webkitAudioContext;
PannerNode = windowRef.PannerNode || windowRef.webkitAudioPannerNode;
StereoPannerNode = windowRef.StereoPannerNode || windowRef.PannerNode;

// Just to compile in old browsers, these features are not supported if not supported natively
BaseAudioContext = windowRef.BaseAudioContext || windowRef.AudioContext;
OfflineAudioContext = windowRef.OfflineAudioContext || windowRef.AudioContext;
ConstantSourceNode = windowRef.ConstantSourceNode || function() {};
AudioWorkletNode = windowRef.AudioWorkletNode || function() {};
IIRFilterNode = windowRef.IIRFilterNode || function() {};
MediaStreamAudioDestinationNode =
    windowRef.MediaStreamAudioDestinationNode || function() {};
MediaStreamAudioSourceNode = windowRef.MediaStreamAudioSourceNode || function() {};
MediaStreamTrackAudioSourceNode =
    windowRef.MediaStreamTrackAudioSourceNode || function() {};
