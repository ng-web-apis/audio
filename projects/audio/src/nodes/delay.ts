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
    selector: '[waDelayNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioDelay),
        },
    ],
})
export class WebAudioDelay extends DelayNode implements OnDestroy {
    @Input('delayTime')
    @audioParam('delayTime')
    delayTimeParam?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(context, 'createDelay', WebAudioDelay, node);

        if (result) {
            return result;
        }

        super(context);
        WebAudioDelay.init(this, node);
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init(that: WebAudioDelay, node: AudioNode | null) {
        connect(
            node,
            that,
        );
    }
}
