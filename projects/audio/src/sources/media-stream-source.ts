import {Directive, forwardRef, Inject, OnDestroy} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {MEDIA_STREAM} from '../tokens/media-stream';

// @dynamic
@Directive({
    selector: '[waMediaStreamAudioSourceNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioMediaStreamSource),
        },
    ],
})
export class WebAudioMediaStreamSource extends MediaStreamAudioSourceNode
    implements OnDestroy {
    constructor(
        @Inject(MEDIA_STREAM) mediaStream: MediaStream,
        @Inject(AUDIO_CONTEXT) context: AudioContext,
    ) {
        try {
            // @ts-ignore
            const _test = new GainNode(context);
        } catch (_) {
            const result = context.createMediaStreamSource(mediaStream);

            Object.setPrototypeOf(result, WebAudioMediaStreamSource.prototype);

            return result as WebAudioMediaStreamSource;
        }

        super(context, {mediaStream});
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
