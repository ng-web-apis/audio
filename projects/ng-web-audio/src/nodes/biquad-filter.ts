import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: '[BiquadFilterNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioBiquadFilter),
        },
    ],
})
export class WebAudioBiquadFilter extends BiquadFilterNode implements OnDestroy {
    @Input()
    type: BiquadFilterType = 'lowpass';

    @Input('gain')
    set gainSetter(value: number) {
        this.gain.setValueAtTime(value, this.context.currentTime);
    }

    @Input('frequency')
    set frequencySetter(value: number) {
        this.frequency.setValueAtTime(value, this.context.currentTime);
    }

    @Input('Q')
    set qSetter(value: number) {
        this.Q.setValueAtTime(value, this.context.currentTime);
    }

    @Input('detune')
    set detuneSetter(value: number) {
        this.detune.setValueAtTime(value, this.context.currentTime);
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
