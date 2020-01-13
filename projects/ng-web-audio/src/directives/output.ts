import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

// @dynamic
@Directive({
    selector: '[Output]',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioOutput),
        },
    ],
})
export class WebAudioOutput extends GainNode implements OnDestroy {
    @Input()
    set Output(destination: AudioNode | AudioParam | undefined) {
        this.disconnect();

        // TODO: Workaround TS buggy overload
        if (destination instanceof AudioNode) {
            this.connect(destination);
        } else if (destination) {
            this.connect(destination);
        }
    }

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);

        if (node) {
            node.connect(this);
        }
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
