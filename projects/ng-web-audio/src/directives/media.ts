import {Directive, ElementRef, forwardRef, Inject} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

@Directive({
    selector: 'audio[audioMedia], video[audioMedia]',
    exportAs: 'audioNode',
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioMediaSource),
        },
    ],
})
export class WebAudioMediaSource extends MediaElementAudioSourceNode {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLMediaElement>,
    ) {
        super(context, {mediaElement: nativeElement});
    }
}
