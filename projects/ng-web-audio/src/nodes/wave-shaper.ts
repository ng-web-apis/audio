import {Directive, forwardRef, Inject, OnDestroy, SkipSelf} from '@angular/core';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[WaveShaperNode]',
    exportAs: 'AudioNode',
    inputs: [
        'oversample',
        'curve',
        'channelCount',
        'channelCountMode',
        'channelInterpretation',
    ],
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioWaveShaper),
        },
    ],
})
export class WebAudioWaveShaper extends WaveShaperNode
    implements OnDestroy, AudioNodeAccessor {
    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createWaveShaper());

        if (node) {
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
