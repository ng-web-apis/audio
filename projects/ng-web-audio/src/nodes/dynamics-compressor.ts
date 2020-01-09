import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';

// @dynamic
@Directive({
    selector: '[DynamicsCompressorNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioDynamicsCompressor),
        },
    ],
})
export class WebAudioDynamicsCompressor extends DynamicsCompressorNode
    implements OnDestroy {
    @Input('attack')
    @audioParam('attack')
    attackParam?: AudioParamInput;

    @Input('knee')
    @audioParam('knee')
    kneeParam?: AudioParamInput;

    @Input('ratio')
    @audioParam('ratio')
    ratioParam?: AudioParamInput;

    @Input('release')
    @audioParam('release')
    releaseParam?: AudioParamInput;

    @Input('threshold')
    @audioParam('threshold')
    thresholdParam?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
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
