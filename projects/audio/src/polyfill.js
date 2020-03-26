var windowRef = typeof window === 'undefined' ? globalThis : window;

windowRef.AudioContext = windowRef.AudioContext || windowRef.webkitAudioContext;
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
