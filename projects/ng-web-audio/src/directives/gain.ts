import {Directive, forwardRef, Inject, Input, Optional, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[audioGain]',
    exportAs: 'audioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioGain),
        },
    ],
})
export class WebAudioGain extends GainNode {
    @Input('gain')
    set gainSetter(gain: number) {
        this.gain.value = gain;
    }

    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Optional() @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);

        if (node) {
            node.connect(this);
        }
    }
}
