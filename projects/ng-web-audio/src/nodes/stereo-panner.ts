import {Directive, forwardRef, Inject, Input, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[StereoPannerNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioStereoPanner),
        },
    ],
})
export class WebAudioStereoPanner extends StereoPannerNode {
    @Input()
    set StereoPannerNode(value: number) {
        this.pan.setValueAtTime(value, this.context.currentTime);
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
}
