import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[WaveShaperNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioWaveShaper),
        },
    ],
})
export class WebAudioWaveShaper extends WaveShaperNode implements OnDestroy {
    @Input()
    oversample: OverSampleType = 'none';

    @Input()
    curve: Float32Array | null = null;

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
