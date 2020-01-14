import {Directive, ElementRef, forwardRef, Inject, OnDestroy} from '@angular/core';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: 'audio[MediaElementAudioSourceNode], video[MediaElementAudioSourceNode]',
    exportAs: 'AudioNode',
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioMediaSource),
        },
    ],
})
export class WebAudioMediaSource extends MediaElementAudioSourceNode
    implements OnDestroy, AudioNodeAccessor {
    constructor(
        @Inject(AUDIO_CONTEXT) context: AudioContext,
        @Inject(ElementRef) {nativeElement}: ElementRef<HTMLMediaElement>,
    ) {
        super(context, {mediaElement: nativeElement});

        try {
            constructorPolyfill(this, context.createMediaElementSource(nativeElement));
        } catch (_) {}
    }

    get node(): AudioNode {
        // @ts-ignore
        return this['__node'] || this;
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
