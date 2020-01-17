import {NgModule} from '@angular/core';
import {WebAudioContext} from './directives/audio-context';
import {WebAudioChannel} from './directives/channel';
import {WebAudioDestination} from './directives/destination';
import {WebAudioListener} from './directives/listener';
import {WebAudioOfflineContext} from './directives/offline-audio-context';
import {WebAudioOutput} from './directives/output';
import {WebAudioAnalyser} from './nodes/analyser';
import {WebAudioBiquadFilter} from './nodes/biquad-filter';
import {WebAudioChannelMerger} from './nodes/channel-merger';
import {WebAudioChannelSplitter} from './nodes/channel-splitter';
import {WebAudioConvolver} from './nodes/convolver';
import {WebAudioDelay} from './nodes/delay';
import {WebAudioDynamicsCompressor} from './nodes/dynamics-compressor';
import {WebAudioGain} from './nodes/gain';
import {WebAudioPanner} from './nodes/panner';
import {WebAudioScriptProcessor} from './nodes/script-processor';
import {WebAudioStereoPanner} from './nodes/stereo-panner';
import {WebAudioWaveShaper} from './nodes/wave-shaper';
import {WebAudioPeriodicWavePipe} from './pipes/periodic-wave.pipe';
import {WebAudioBufferSource} from './sources/buffer-source';
import {WebAudioConstantSource} from './sources/constant-source';
import {WebAudioMediaSource} from './sources/media-source';
import {WebAudioOscillator} from './sources/oscillator';

@NgModule({
    declarations: [
        WebAudioContext,
        WebAudioChannel,
        WebAudioDestination,
        WebAudioListener,
        WebAudioOfflineContext,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioConstantSource,
        WebAudioMediaSource,
        WebAudioOscillator,
        WebAudioAnalyser,
        WebAudioBiquadFilter,
        WebAudioChannelSplitter,
        WebAudioChannelMerger,
        WebAudioConvolver,
        WebAudioDelay,
        WebAudioDynamicsCompressor,
        WebAudioGain,
        WebAudioPanner,
        WebAudioScriptProcessor,
        WebAudioStereoPanner,
        WebAudioWaveShaper,
        WebAudioPeriodicWavePipe,
    ],
    exports: [
        WebAudioContext,
        WebAudioChannel,
        WebAudioDestination,
        WebAudioListener,
        WebAudioOfflineContext,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioConstantSource,
        WebAudioMediaSource,
        WebAudioOscillator,
        WebAudioAnalyser,
        WebAudioBiquadFilter,
        WebAudioChannelSplitter,
        WebAudioChannelMerger,
        WebAudioConvolver,
        WebAudioDelay,
        WebAudioDynamicsCompressor,
        WebAudioGain,
        WebAudioPanner,
        WebAudioScriptProcessor,
        WebAudioStereoPanner,
        WebAudioWaveShaper,
        WebAudioPeriodicWavePipe,
    ],
})
export class WebAudioModule {}
