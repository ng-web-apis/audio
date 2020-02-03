import {
    Attribute,
    Directive,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    SkipSelf,
} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {CONSTRUCTOR_SUPPORT} from '../tokens/constructor-support';
import {AudioParamInput} from '../types/audio-param-input';
import {connect} from '../utils/connect';

// @dynamic
@Directive({
    selector: '[waBiquadFilterNode]',
    exportAs: 'AudioNode',
    inputs: ['type', 'channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioBiquadFilter),
        },
    ],
})
export class WebAudioBiquadFilter extends BiquadFilterNode implements OnDestroy {
    @Input('detune')
    @audioParam('detune')
    detuneParam?: AudioParamInput;

    @Input('frequency')
    @audioParam('frequency')
    frequencyParam?: AudioParamInput;

    @Input('gain')
    @audioParam('gain')
    gainParam?: AudioParamInput;

    @Input('Q')
    @audioParam('Q')
    qParam?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Inject(CONSTRUCTOR_SUPPORT) modern: boolean,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
        @Attribute('detune') detuneArg: string | null,
        @Attribute('frequency') frequencyArg: string | null,
        @Attribute('gain') gainArg: string | null,
        @Attribute('Q') QArg: string | null,
    ) {
        const detune = Number.parseFloat(detuneArg || '') || 0;
        const frequency = Number.parseFloat(frequencyArg || '') || 350;
        const gain = Number.parseFloat(gainArg || '') || 0;
        const Q = Number.parseFloat(QArg || '') || 1;

        if (modern) {
            super(context, {detune, frequency, gain, Q});
            connect(
                node,
                this,
            );
        } else {
            const result = context.createBiquadFilter() as WebAudioBiquadFilter;

            Object.setPrototypeOf(result, WebAudioBiquadFilter.prototype);

            result.detune.value = detune;
            result.frequency.value = frequency;
            result.gain.value = gain;
            result.Q.value = Q;

            connect(
                node,
                result,
            );

            return result;
        }
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init(that: WebAudioBiquadFilter, node: AudioNode | null) {
        connect(
            node,
            that,
        );
    }
}
