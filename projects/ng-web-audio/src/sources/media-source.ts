import {Directive, ElementRef, forwardRef, Inject, OnDestroy} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {constructorPolyfill} from '../utils/constructor-polyfill';

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
export class WebAudioMediaSource extends MediaElementAudioSourceNode
    implements OnDestroy {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLMediaElement>,
    ) {
        super(context, {mediaElement: nativeElement});
        constructorPolyfill(this, context.createMediaElementSource(nativeElement));
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
