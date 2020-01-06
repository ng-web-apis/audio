import {Directive, ElementRef, forwardRef, Inject, OnDestroy} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

// @dynamic
@Directive({
    selector: 'audio[MediaElementAudioSourceNode], video[MediaElementAudioSourceNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioMediaSource),
        },
    ],
})
export class WebAudioMediaSource extends MediaElementAudioSourceNode implements OnDestroy {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLMediaElement>,
    ) {
        super(context, {mediaElement: nativeElement});
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
