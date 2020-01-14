import {Directive, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[Output]',
})
export class WebAudioOutput extends GainNode implements OnDestroy {
    @Input()
    set Output(destination: AudioNode | AudioParam | undefined) {
        this.disconnect();
        // @ts-ignore in Safari real node is stored under hacked '__node' property
        this.connect(destination['__node'] || destination);
    }

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createGain());

        if (node) {
            // @ts-ignore
            node.connect(this['__node'] || this);
        }
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
