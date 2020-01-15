AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
StereoPannerNode =
    globalThis.StereoPannerNode || globalThis.PannerNode || globalThis.webkitPannerNode;

// Just to compile in Safari, these features are not supported if not supported natively
BaseAudioContext = globalThis.BaseAudioContext || globalThis.AudioContext;
OfflineAudioContext = globalThis.OfflineAudioContext || globalThis.AudioContext;
