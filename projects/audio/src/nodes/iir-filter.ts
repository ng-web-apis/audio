import {Directive, forwardRef, Inject, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {FEEDBACK_COEFFICIENTS} from '../tokens/feedback-coefficients';
import {FEEDFORWARD_COEFFICIENTS} from '../tokens/feedforward-coefficients';
import {connect} from '../utils/connect';

// @dynamic
@Directive({
    selector: '[waIIRFilterNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioIIRFilter),
        },
    ],
})
export class WebAudioIIRFilter extends IIRFilterNode implements OnDestroy {
    constructor(
        @Inject(FEEDBACK_COEFFICIENTS) feedback: number[],
        @Inject(FEEDFORWARD_COEFFICIENTS) feedforward: number[],
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        try {
            // @ts-ignore
            const _test = new IIRFilterNode(context, {feedback, feedforward});
        } catch (_) {
            const result = context.createIIRFilter(
                feedback,
                feedforward,
            ) as WebAudioIIRFilter;

            Object.setPrototypeOf(result, WebAudioIIRFilter.prototype);
            connect(
                node,
                result,
            );

            return result;
        }

        super(context, {feedback, feedforward});
        connect(
            node,
            this,
        );
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
