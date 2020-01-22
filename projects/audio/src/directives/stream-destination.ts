import {Directive, Inject} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {connect} from '../utils/connect';

// @dynamic
@Directive({
    selector: '[waMediaStreamAudioDestinationNode]',
    exportAs: 'AudioNode',
})
export class WebAudioMediaStreamDestination extends MediaStreamAudioDestinationNode {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        try {
            // @ts-ignore
            const _test = new GainNode(context);
        } catch (_) {
            const result = context.createMediaStreamDestination();

            Object.setPrototypeOf(result, WebAudioMediaStreamDestination.prototype);
            connect(
                node,
                result,
            );

            return result as WebAudioMediaStreamDestination;
        }

        super(context);
        connect(
            node,
            this,
        );
    }
}
