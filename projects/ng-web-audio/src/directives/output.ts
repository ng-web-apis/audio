import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[AudioOutput]',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioOutput),
        },
    ],
})
export class WebAudioOutput extends GainNode implements OnDestroy {
    @Input()
    set AudioOutput(node: AudioNode | undefined) {
        if (!node) {
            return;
        }

        this.disconnect();
        this.connect(node);
    }

    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);

        if (node) {
            node.connect(this);
        }
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
