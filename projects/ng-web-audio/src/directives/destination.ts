import {Directive, Inject, Optional} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[audioDestination]',
})
export class WebAudioDestination {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Optional() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        if (node) {
            node.connect(context.destination);
        }
    }
}
