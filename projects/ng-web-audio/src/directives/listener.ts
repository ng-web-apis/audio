import {Directive, Inject, Input, OnChanges, Self} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AudioParamInput} from '../types/audio-param-input';
import {fallbackAudioParam} from '../utils/fallback-audio-param';

// @dynamic
@Directive({
    selector: '[AudioContext],[OfflineAudioContext][length][sampleRate]',
})
export class WebAudioListener extends GainNode implements OnChanges {
    @Input('forwardX')
    @audioParam('forwardX')
    forwardXParam?: AudioParamInput;

    @Input('forwardY')
    @audioParam('forwardY')
    forwardYParam?: AudioParamInput;

    @Input('forwardZ')
    @audioParam('forwardZ')
    forwardZParam?: AudioParamInput;

    @Input('positionX')
    @audioParam('positionX')
    positionXParam?: AudioParamInput;

    @Input('positionY')
    @audioParam('positionY')
    positionYParam?: AudioParamInput;

    @Input('positionZ')
    @audioParam('positionZ')
    positionZParam?: AudioParamInput;

    @Input('upX')
    @audioParam('upX')
    upXParam?: AudioParamInput;

    @Input('upY')
    @audioParam('upY')
    upYParam?: AudioParamInput;

    @Input('upZ')
    @audioParam('upZ')
    upZParam?: AudioParamInput;

    private readonly paramSupported =
        this.context.listener.positionX instanceof AudioParam;

    constructor(@Self() @Inject(AUDIO_CONTEXT) context: BaseAudioContext) {
        super(context);
    }

    get forwardX(): AudioParam {
        return this.context.listener.forwardX;
    }

    get forwardY(): AudioParam {
        return this.context.listener.forwardY;
    }

    get forwardZ(): AudioParam {
        return this.context.listener.forwardZ;
    }

    get positionX(): AudioParam {
        return this.context.listener.positionX;
    }

    get positionY(): AudioParam {
        return this.context.listener.positionY;
    }

    get positionZ(): AudioParam {
        return this.context.listener.positionZ;
    }

    get upX(): AudioParam {
        return this.context.listener.upX;
    }

    get upY(): AudioParam {
        return this.context.listener.upY;
    }

    get upZ(): AudioParam {
        return this.context.listener.upZ;
    }

    ngOnChanges() {
        if (this.paramSupported) {
            return;
        }

        // Fallback for older browsers
        this.context.listener.setOrientation(
            fallbackAudioParam(this.forwardXParam),
            fallbackAudioParam(this.forwardYParam),
            fallbackAudioParam(this.forwardZParam),
            fallbackAudioParam(this.upXParam),
            fallbackAudioParam(this.upYParam),
            fallbackAudioParam(this.upZParam),
        );
        this.context.listener.setPosition(
            fallbackAudioParam(this.positionXParam),
            fallbackAudioParam(this.positionYParam),
            fallbackAudioParam(this.positionZParam),
        );
    }
}
