import {
    Directive,
    forwardRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SkipSelf,
} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';
import {fallbackAudioParam} from '../utils/fallback-audio-param';

// @dynamic
@Directive({
    selector: '[PannerNode]',
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
            provide: AUDIO_NODE,
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

    private readonly paramSupported = this.positionX instanceof AudioParam;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);

        if (node) {
            node.connect(this);
        }
    }

    ngOnChanges() {
        if (this.paramSupported) {
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
}
