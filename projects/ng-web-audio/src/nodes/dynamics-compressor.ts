import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {AudioParamInput} from '../types/audio-param-input';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[DynamicsCompressorNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioDynamicsCompressor),
        },
    ],
})
export class WebAudioDynamicsCompressor extends DynamicsCompressorNode
    implements OnDestroy, AudioNodeAccessor {
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
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createDynamicsCompressor());

        if (node) {
            // @ts-ignore
            node.connect(this.node);
        }
    }

    get node(): AudioNode {
        // @ts-ignore
        return this['__node'] || this;
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
