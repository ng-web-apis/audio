import {
    Directive,
    forwardRef,
    Inject,
    OnDestroy,
    Optional,
    SkipSelf,
} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[waWaveShaperNode]',
    exportAs: 'AudioNode',
    inputs: [
        'oversample',
        'curve',
        'channelCount',
        'channelCountMode',
        'channelInterpretation',
    ],
    providers: [
        {
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioWaveShaper),
        },
    ],
})
export class WebAudioWaveShaper extends WaveShaperNode implements OnDestroy {
    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(
            context,
            'createWaveShaper',
            WebAudioWaveShaper,
            node,
        );

        if (result) {
            return result;
        }

        super(context);
        WebAudioWaveShaper.init(this, node);
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init(that: WebAudioWaveShaper, node: AudioNode | null) {
        connect(
            node,
            that,
        );
    }
}
