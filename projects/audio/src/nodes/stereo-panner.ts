import {
    Directive,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    SkipSelf,
} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AudioParamInput} from '../types/audio-param-input';
import {connect} from '../utils/connect';
import {fallbackAudioParam} from '../utils/fallback-audio-param';
import {processAudioParam} from '../utils/process-audio-param';

// @dynamic
@Directive({
    selector: '[waStereoPannerNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioStereoPanner),
        },
    ],
})
export class WebAudioStereoPanner extends StereoPannerNode implements OnDestroy {
    @Input('pan')
    set panParam(pan: AudioParamInput) {
        if ('setPosition' in this) {
            /** fallback for browsers not supporting {@link StereoPannerNode} */
            // @ts-ignore
            this.fallbackToPannerNode(fallbackAudioParam(pan));
        } else {
            processAudioParam(this.pan, pan, this.context.currentTime);
        }
    }

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        try {
            // @ts-ignore
            const _test = new StereoPannerNode(context);
        } catch (_) {
            const result = (context.createPanner() as unknown) as WebAudioStereoPanner;

            Object.setPrototypeOf(result, WebAudioStereoPanner.prototype);
            WebAudioStereoPanner.init(result, node);

            return result;
        }

        super(context);
        WebAudioStereoPanner.init(this, node);
    }

    ngOnDestroy() {
        this.disconnect();
    }

    // @ts-ignore
    private fallbackToPannerNode(pan: number) {
        const xDeg = pan * 100;
        const zDeg = xDeg > 0 ? 270 - xDeg : xDeg + 90;
        const x = Math.sin(xDeg * (Math.PI / 180));
        const z = Math.sin(zDeg * (Math.PI / 180));

        // @ts-ignore
        this.setPosition(x, 0, z);
    }

    static init(that: WebAudioStereoPanner, node: AudioNode | null) {
        connect(
            node,
            that,
        );
    }
}
