import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[GainNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioGain),
        },
    ],
})
export class WebAudioGain extends GainNode implements OnDestroy {
    @Input()
    @audioParam('gain')
    GainNode?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createGain());

        if (node) {
            node.connect(this);
        }
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
