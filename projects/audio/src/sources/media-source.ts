import {Directive, ElementRef, forwardRef, Inject, OnDestroy} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

// @dynamic
@Directive({
    selector:
        'audio[waMediaElementAudioSourceNode], video[waMediaElementAudioSourceNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioMediaSource),
        },
    ],
})
export class WebAudioMediaSource extends MediaElementAudioSourceNode
    implements OnDestroy {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLMediaElement>,
    ) {
        try {
            // @ts-ignore
            const _test = new GainNode(context);
        } catch (_) {
            const result = context.createMediaElementSource(nativeElement);

            Object.setPrototypeOf(result, WebAudioMediaSource.prototype);

            return result as WebAudioMediaSource;
        }

        super(context, {mediaElement: nativeElement});
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
