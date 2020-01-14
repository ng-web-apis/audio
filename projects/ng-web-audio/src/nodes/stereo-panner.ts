import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';
import {constructorPolyfill} from '../utils/constructor-polyfill';
import {fallbackAudioParam} from '../utils/fallback-audio-param';
import {processAudioParam} from '../utils/process-audio-param';

// @dynamic
@Directive({
    selector: '[StereoPannerNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioStereoPanner),
        },
    ],
})
export class WebAudioStereoPanner extends StereoPannerNode implements OnDestroy {
    @Input()
    set StereoPannerNode(pan: AudioParamInput) {
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
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createPanner());

        if (node) {
            node.connect(this);
        }
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

    ngOnDestroy() {
        this.disconnect();
    }
}
