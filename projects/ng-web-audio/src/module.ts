import {NgModule} from '@angular/core';
import {WebAudioContext} from './directives/audio-context';
import {WebAudioDestination} from './directives/destination';
import {WebAudioListener} from './directives/listener';
import {WebAudioOfflineContext} from './directives/offline-audio-context';
import {WebAudioOutput} from './directives/output';
import {WebAudioAnalyser} from './nodes/analyser';
import {WebAudioBiquadFilter} from './nodes/biquad-filter';
import {WebAudioConvolver} from './nodes/convolver';
import {WebAudioDelay} from './nodes/delay';
import {WebAudioDynamicsCompressor} from './nodes/dynamics-compressor';
import {WebAudioGain} from './nodes/gain';
import {WebAudioPanner} from './nodes/panner';
import {WebAudioStereoPanner} from './nodes/stereo-panner';
import {WebAudioWaveShaper} from './nodes/wave-shaper';
import {WebAudioPeriodicWavePipe} from './pipes/periodic-wave.pipe';
import {WebAudioBufferSource} from './sources/buffer-source';
import {WebAudioMediaSource} from './sources/media-source';
import {WebAudioOscillator} from './sources/oscillator';

@NgModule({
    declarations: [
        WebAudioContext,
        WebAudioDestination,
        WebAudioListener,
        WebAudioOfflineContext,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioMediaSource,
        WebAudioOscillator,
        WebAudioAnalyser,
        WebAudioBiquadFilter,
        WebAudioConvolver,
        WebAudioDelay,
        WebAudioDynamicsCompressor,
        WebAudioGain,
        WebAudioPanner,
        WebAudioStereoPanner,
        WebAudioWaveShaper,
        WebAudioPeriodicWavePipe,
    ],
    exports: [
        WebAudioContext,
        WebAudioDestination,
        WebAudioListener,
        WebAudioOfflineContext,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioMediaSource,
        WebAudioOscillator,
        WebAudioAnalyser,
        WebAudioBiquadFilter,
        WebAudioConvolver,
        WebAudioDelay,
        WebAudioDynamicsCompressor,
        WebAudioGain,
        WebAudioPanner,
        WebAudioStereoPanner,
        WebAudioWaveShaper,
        WebAudioPeriodicWavePipe,
    ],
})
export class WebAudioModule {}