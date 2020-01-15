import {Directive, forwardRef, Inject, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[WaveShaperNode]',
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
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioWaveShaper),
        },
    ],
})
export class WebAudioWaveShaper extends WaveShaperNode implements OnDestroy {
    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
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
