import {
    Directive,
    forwardRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    SkipSelf,
} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AudioParamInput} from '../types/audio-param-input';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';
import {fallbackAudioParam} from '../utils/fallback-audio-param';

// @dynamic
@Directive({
    selector: '[waPannerNode]',
    exportAs: 'AudioNode',
    inputs: [
        'coneInnerAngle',
        'coneOuterAngle',
        'coneOuterGain',
        'distanceModel',
        'maxDistance',
        'panningModel',
        'refDistance',
        'rolloffFactor',
        'channelCount',
        'channelCountMode',
        'channelInterpretation',
    ],
    providers: [
        {
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioPanner),
        },
    ],
})
export class WebAudioPanner extends PannerNode implements OnDestroy, OnChanges {
    @Input()
    @audioParam('orientationX')
    orientationXParam?: AudioParamInput;

    @Input()
    @audioParam('orientationY')
    orientationYParam?: AudioParamInput;

    @Input()
    @audioParam('orientationZ')
    orientationZParam?: AudioParamInput;

    @Input()
    @audioParam('positionX')
    positionXParam?: AudioParamInput;

    @Input()
    @audioParam('positionY')
    positionYParam?: AudioParamInput;

    @Input()
    @audioParam('positionZ')
    positionZParam?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(context, 'createPanner', WebAudioPanner, node);

        if (result) {
            return result;
        }

        super(context);
        WebAudioPanner.init(this, node);
    }

    ngOnChanges() {
        if (this.positionX instanceof AudioParam) {
            return;
        }

        // Fallback for older browsers
        this.setOrientation(
            fallbackAudioParam(this.orientationXParam),
            fallbackAudioParam(this.orientationYParam),
            fallbackAudioParam(this.orientationZParam),
        );
        this.setPosition(
            fallbackAudioParam(this.positionXParam),
            fallbackAudioParam(this.positionYParam),
            fallbackAudioParam(this.positionZParam),
        );
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init(that: WebAudioPanner, node: AudioNode | null) {
        connect(
            node,
            that,
        );
    }
}
