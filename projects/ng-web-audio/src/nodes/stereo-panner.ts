import {Directive, forwardRef, Inject, Input, SkipSelf} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';

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
export class WebAudioStereoPanner extends StereoPannerNode {
    @Input()
    @audioParam('pan')
    StereoPannerNode?: AudioParamInput;

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
