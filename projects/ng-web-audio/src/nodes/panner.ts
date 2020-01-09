import {Directive, forwardRef, Inject, Input, SkipSelf} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';

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
export class WebAudioPanner extends PannerNode {
    @Input()
    @audioParam('orientationX')
    orientationXNode?: AudioParamInput;

    @Input()
    @audioParam('orientationY')
    orientationYNode?: AudioParamInput;

    @Input()
    @audioParam('orientationZ')
    orientationZNode?: AudioParamInput;

    @Input()
    @audioParam('positionX')
    positionXNode?: AudioParamInput;

    @Input()
    @audioParam('positionY')
    positionYNode?: AudioParamInput;

    @Input()
    @audioParam('positionZ')
    positionZNode?: AudioParamInput;

    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);

        if (node) {
            node.connect(this);
        }
    }
}
