import {NgModule} from '@angular/core';
import {WebAudioDestination} from './directives/destination';
import {WebAudioGain} from './directives/gain';
import {WebAudioMediaSource} from './directives/media';
import {WebAudioWire} from './directives/wire';

@NgModule({
    declarations: [WebAudioDestination, WebAudioWire, WebAudioMediaSource, WebAudioGain],
    exports: [WebAudioDestination, WebAudioWire, WebAudioMediaSource, WebAudioGain],
})
export class WebAudioModule {}
