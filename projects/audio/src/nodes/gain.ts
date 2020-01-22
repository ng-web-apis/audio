import {
    Directive,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    SkipSelf,
} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AudioParamInput} from '../types/audio-param-input';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[waGainNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioGain),
        },
    ],
})
export class WebAudioGain extends GainNode implements OnDestroy {
    @Input('gain')
    @audioParam('gain')
    gainParam?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(context, 'createGain', WebAudioGain, node);

        if (result) {
            return result;
        }

        super(context);
        WebAudioGain.init(this, node);
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init(that: WebAudioGain, node: AudioNode | null) {
        connect(
            node,
            that,
        );
    }
}
