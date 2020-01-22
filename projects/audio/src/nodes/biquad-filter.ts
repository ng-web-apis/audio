import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

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
    @Input('gain')
    @audioParam('gain')
    gainParam?: AudioParamInput;

    @Input('frequency')
    @audioParam('frequency')
    frequencyParam?: AudioParamInput;

    @Input('Q')
    @audioParam('Q')
    qParam?: AudioParamInput;

    @Input('detune')
    @audioParam('detune')
    detuneParam?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(
            context,
            'createBiquadFilter',
            WebAudioBiquadFilter,
            node,
        );

        if (result) {
            return result;
        }

        super(context);
        WebAudioBiquadFilter.init(this, node);
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
