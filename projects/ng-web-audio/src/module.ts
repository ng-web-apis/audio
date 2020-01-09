import {NgModule} from '@angular/core';
import {WebAudioDestination} from './directives/destination';
import {WebAudioOutput} from './directives/output';
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
        WebAudioDestination,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioMediaSource,
        WebAudioOscillator,
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
        WebAudioDestination,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioMediaSource,
        WebAudioOscillator,
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
