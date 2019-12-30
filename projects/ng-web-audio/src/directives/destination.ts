import {Directive, Inject, OnDestroy} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[Destination]',
    exportAs: 'AudioNode',
})
export class WebAudioDestination extends GainNode implements OnDestroy {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);

        this.connect(context.destination);

        if (node) {
            node.connect(this);
        }
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
