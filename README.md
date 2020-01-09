# Web Audio API for Angular

[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)

This is a library for declarative use of [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) with Angular 6+.

## How to use

You can build audio graph with directives. For example, here's a typical echo feedback loop:

```html
<audio src="/demo.wav" MediaElementAudioSourceNode>
    <ng-container #node="AudioNode" [DelayNode]="delayTime">
        <ng-container [GainNode]="gain">
            <ng-container [Output]="node"></ng-container>
            <ng-container Destination></ng-container>
        </ng-container>
    </ng-container>
    <ng-container Destination></ng-container>
</audio>
```

_Note that single input nodes, such as `GainNode` or `DelayNode` use directive name as
input alias for underlying `gain` or `delayTime` parameters. Whereas more complex nodes
use respective parameters names._

## AudioBufferService

This library has `AudioBufferService` with `fetch` method, returning `Promise` which allows
you to easily turn your hosted audio file into `AudioBuffer` through GET requests.

This service is also used within directives that have `AudioBuffer` inputs so you can just
pass string URL, as well as an actual `AudioBuffer`. For example:

```html
<button
    #source="AudioNode"
    buffer="/demo.wav"
    AudioBufferSourceNode
    (click)="source.start()"
>
    Play
    <ng-container Destination></ng-container>
</button>
```

## Supported nodes

You can use following audio nodes through directives:

### Sources

-   [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode)
    -   Additionally supports setting URL to media file as `buffer` so it will be automatically downloaded and turned into `ArrayBuffer`
    -   Additionally supports empty `autoplay` attribute similar to `audio` tag so it would start playing immediately
-   [MediaElementAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode)
-   [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
    -   Additionally supports empty `autoplay` attribute similar to `audio` tag so it would start playing immediately

### Processors

-   [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)
-   [ConvolverNode](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)
    -   Additionally supports setting URL to media file as `buffer` so it will be automatically downloaded and turned into `ArrayBuffer`
-   [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode)
-   [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)
-   [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode)
-   [WaveShaperNode](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode)

## Special cases

-   Use `Destination` directive to end the graph (see examples above)
-   Use `Output` directive when you need non-linear graph (see feedback loop example above) or to connect `AudioNode` to `AudioParam`
-   Use `PeriodicWave` pipe to create `PeriodicWave` for `OscillatorNode`
-   All node directives are exported as `AudioNode` so you can use them with template reference variables (see feedback loop example above)

## Tokens

-   You can inject `AudioContext` through `AUDIO_CONTEXT` token
-   You can also provide custom `AudioContext` through that token
-   Use `AUDIO_CONTEXT_OPTIONS` token to customize default `AudioContext`
-   All node directives provide themselves as `AUDIO_NODE` token

## TODO

-   Add remaining audio nodes:
    -   `AnalyserNode`
    -   `AudioScheduledSourceNode`
    -   `ChannelMergerNode`
    -   `ChannelSplitterNode`
    -   `ConstantSourceNode`
    -   `IIRFilterNode`
    -   `PannerNode`
-   Add sophisticated `AudioParam` manipulations such as ramping and scheduled changes
-   `AudioListener` concept
-   `AudioWorklet` concept
-   `OfflineAudioContext`
-   Streaming concept
    -   `MediaStreamAudioDestinationNode`
    -   `MediaStreamAudioSourceNode`
