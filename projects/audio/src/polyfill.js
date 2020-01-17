AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
PannerNode = globalThis.PannerNode || globalThis.webkitAudioPannerNode;
StereoPannerNode = globalThis.StereoPannerNode || globalThis.PannerNode;

// Just to compile in old browsers, these features are not supported if not supported natively
BaseAudioContext = globalThis.BaseAudioContext || globalThis.AudioContext;
OfflineAudioContext = globalThis.OfflineAudioContext || globalThis.AudioContext;
ConstantSourceNode = globalThis.ConstantSourceNode || function() {};
