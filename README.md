# Web Audio API for Angular

[![npm version](https://img.shields.io/npm/v/ng-web-apis/audio.svg)](https://npmjs.com/package/ng-web-apis/audio)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/ng-web-apis/audio)
![Travis (.org)](https://img.shields.io/travis/ng-web-apis/audio)
![Coveralls github](https://img.shields.io/coveralls/github/ng-web-apis/audio)
[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)

This is a library for declarative use of
[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) with Angular 6+.
It is a complete conversion to declarative Angular directives, if you find any inconsistencies
or errors, please [file an issue](https://github.com/ng-web-apis/audio/issues). Watch out
for 💡 emoji in this README for addition features and special use cases.

## How to use

You can build audio graph with directives. For example, here's a typical echo feedback loop:

```html
<audio src="/demo.wav" MediaElementAudioSourceNode>
    <ng-container #node="AudioNode" [DelayNode]="delayTime">
        <ng-container [GainNode]="gain">
            <ng-container [Output]="node"></ng-container>
            <ng-container AudioDestinationNode></ng-container>
        </ng-container>
    </ng-container>
    <ng-container AudioDestinationNode></ng-container>
</audio>
```

> Note that single input nodes, such as
> [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) or
> [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode) use directive name as
> input alias for underlying [gain](https://developer.mozilla.org/en-US/docs/Web/API/GainNode/gain) or
> [delayTime](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode/delayTime) parameters.
> Whereas more complex nodes use respective parameters names.

## 💡 AudioBufferService

This library has `AudioBufferService` with `fetch` method, returning
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
which allows you to easily turn your hosted audio file into
[AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) through GET requests.
Result is stored in service's cache so same file is not requested again while application is running.

This service is also used within directives that have
[AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) inputs (such as
[AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) or
[ConvolverNode](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)) so you can just
pass string URL, as well as an actual
[AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer). For example:

```html
<button
    #source="AudioNode"
    buffer="/demo.wav"
    AudioBufferSourceNode
    (click)="source.start()"
>
    Play
    <ng-container AudioDestinationNode></ng-container>
</button>
```

## Supported nodes

You can use following audio nodes through directives of the same name:

### Terminal nodes

-   [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

    💡 Not required if you only need one, global context will be created when needed

    💡 Also gives you access to
    [AudioListener](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener)
    parameters such as
    [positionX](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/positionX)

-   [OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext)

    💡 Additionally supports empty `autoplay` attribute similar to `audio` tag so it would start
    rendering immediately

    💡 Also gives you access to
    [AudioListener](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener)
    parameters such as
    [positionX](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/positionX)

-   [AudioDestinationNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode)

    💡 Use it to terminate branch of your graph

    💡 can be used multiple times inside single
    [BaseAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext)
    referencing the same
    [BaseAudioContext.destination](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination)

    💡 Has `(quiet)` output to watch for particular graph branch going silent

### Sources

-   [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode)

    💡 Additionally supports setting URL to media file as
    [buffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/buffer)
    so it will be fetched and turned into
    [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)

    💡 Additionally supports empty `autoplay` attribute similar to `audio` tag so it would start
    playing immediately

-   [ConstantSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/ConstantSourceNode)

    💡 Additionally supports empty `autoplay` attribute similar to `audio` tag so it would start
    playing immediately

-   [MediaElementAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode)
-   [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)

    💡 Additionally supports empty `autoplay` attribute similar to `audio` tag so it would start
    playing immediately

### Processors

-   [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)
-   [ChannelMergerNode](https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode)

    💡 Use `Channel` directive to merge channels, see example in **Special cases** section

-   [ChannelSplitterNode](https://developer.mozilla.org/en-US/docs/Web/API/ChannelSplitterNode)
-   [ConvolverNode](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode)

    💡 Additionally supports setting URL to media file as
    [buffer](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode/buffer)
    so it will be fetched and turned into
    [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)

-   [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode)
-   [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)
-   [PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode)
-   [ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode)
-   [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode)
-   [WaveShaperNode](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode)

## 💡 Special cases

-   Use `Output` directive when you need non-linear graph (see feedback loop example above)
    or to manually connect [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode)
    to [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) or
    [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam)
-   Use `PeriodicWave` pipe to create [PeriodicWave](https://developer.mozilla.org/en-US/docs/Web/API/PeriodicWave)
    for [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
-   All node directives are exported as `AudioNode` so you can use them with
    [template reference variables](https://angular.io/guide/template-syntax#ref-var) (see feedback loop example above)
-   Use `Channel` directive within
    [ChannelMergerNode](https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode)
    and direct `Output` directive to it in order to perform channel merging:

```html
<!-- Inverting left and right channel -->
<audio src="/demo.wav" MediaElementAudioSourceNode>
    <ng-container ChannelSplitterNode>
        <ng-container [Output]="right"></ng-container>
        <ng-container [Output]="left"></ng-container>
    </ng-container>
    <ng-container ChannelMergerNode>
        <ng-container #left="AudioNode" Channel></ng-container>
        <ng-container #right="AudioNode" Channel></ng-container>
        <ng-container AudioDestinationNode></ng-container>
    </ng-container>
</audio>
```

## 💡 Tokens

-   You can inject
    [BaseAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext)
    through `AUDIO_CONTEXT` token
-   [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
    is created by default with default options when token is requested
-   You can also provide custom
    [BaseAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext)
    through that token
-   All node directives provide underlying
    [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode)
    as `AUDIO_NODE` token

## Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                12+                                                                                                |                                                                                                  31+                                                                                                  |                                                                                                34+                                                                                                 |                                                                                                 9+                                                                                                 |

> Note that some features
> ([AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) etc.)
> were added later and are supported only by more recent versions

_**IMPORTANT**: You must add `@ng-web-apis/audio/polyfill` to `polyfills.ts` used in
`angular.json` if you want to support Safari_

💡 [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode)
is emulated with [PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode)
in browsers that do not support it yet

💡 [positionX](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/positionX)
([orientationX](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/orientationX)) and
other similar properties of [AudioListener](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener)
and [PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode) fall back to
[setPosition](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/setPosition)
([setOrientation](https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/setOrientation))
method if browser does not support it

## Demo

You can [try online demo here](https://ng-web-apis.github.io/audio/)

## TODO

-   [IIRFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/IIRFilterNode),
    however it is not supported by Safari and generally
    [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)
    is sufficient
-   Add sophisticated [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam)
    manipulations such as ramping and scheduled changes
-   [AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) concept
-   Streaming concept
    -   [MediaStreamAudioDestinationNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioDestinationNode)
    -   [MediaStreamAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode)
-   Add some sort of SSR fallback so it doesn't crash in Angular Universal environment
