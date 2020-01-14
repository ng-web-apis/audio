import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {of, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AudioBufferService} from '../services/audio-buffer.service';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[ConvolverNode]',
    exportAs: 'AudioNode',
    inputs: ['normalize', 'channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioConvolver),
        },
    ],
})
export class WebAudioConvolver extends ConvolverNode
    implements OnDestroy, AudioNodeAccessor {
    @Input('buffer')
    set bufferSetter(source: AudioBuffer | null | string) {
        this.buffer$.next(source);
    }

    private readonly buffer$ = new Subject<AudioBuffer | null | string>();

    constructor(
        @Inject(AudioBufferService) audioBufferService: AudioBufferService,
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createConvolver());

        if (node) {
            node.connect(this.node);
        }

        this.buffer$
            .pipe(
                switchMap(source =>
                    typeof source === 'string'
                        ? audioBufferService.fetch(source)
                        : of(source),
                ),
            )
            .subscribe(buffer => {
                this.buffer = buffer;
            });
    }

    get node(): AudioNode {
        // @ts-ignore
        return this['__node'] || this;
    }

    ngOnDestroy() {
        this.buffer$.complete();
        this.disconnect();
    }
}
