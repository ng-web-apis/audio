import {Directive, Inject, OnDestroy} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[Channel]',
    exportAs: 'AudioNode',
})
export class WebAudioChannel extends GainNode implements OnDestroy {
    constructor(@Inject(AUDIO_CONTEXT) context: BaseAudioContext) {
        const result = constructorPolyfill(context, 'createGain', WebAudioChannel);

        if (result) {
            return result;
        }

        super(context);
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init() {}
}
