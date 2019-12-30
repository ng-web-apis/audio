import {NgModule} from '@angular/core';
import {WebAudioDestination} from './directives/destination';
import {WebAudioOutput} from './directives/output';
import {WebAudioBiquadFilter} from './nodes/biquad-filter';
import {WebAudioConvolver} from './nodes/convolver';
import {WebAudioDelay} from './nodes/delay';
import {WebAudioGain} from './nodes/gain';
import {WebAudioStereoPanner} from './nodes/stereo-panner';
import {WebAudioWaveShaper} from './nodes/wave-shaper';
import {WebAudioBufferSource} from './sources/buffer-source';
import {WebAudioMediaSource} from './sources/media-source';

@NgModule({
    declarations: [
        WebAudioDestination,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioMediaSource,
        WebAudioBiquadFilter,
        WebAudioConvolver,
        WebAudioDelay,
        WebAudioGain,
        WebAudioStereoPanner,
        WebAudioWaveShaper,
    ],
    exports: [
        WebAudioDestination,
        WebAudioOutput,
        WebAudioBufferSource,
        WebAudioMediaSource,
        WebAudioBiquadFilter,
        WebAudioConvolver,
        WebAudioDelay,
        WebAudioGain,
        WebAudioStereoPanner,
        WebAudioWaveShaper,
    ],
})
export class WebAudioModule {}
