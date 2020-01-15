import {Directive, forwardRef, Inject, Input, OnDestroy, SkipSelf} from '@angular/core';
import {of, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AudioBufferService} from '../services/audio-buffer.service';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[ConvolverNode]',
    exportAs: 'AudioNode',
    inputs: ['normalize', 'channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioConvolver),
        },
    ],
})
export class WebAudioConvolver extends ConvolverNode implements OnDestroy {
    @Input('buffer')
    set bufferSetter(source: AudioBuffer | null | string) {
        this.buffer$.next(source);
    }

    buffer$!: Subject<AudioBuffer | null | string>;

    constructor(
        @Inject(AudioBufferService) audioBufferService: AudioBufferService,
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(
            context,
            'createConvolver',
            WebAudioConvolver,
            node,
            audioBufferService,
        );

        if (result) {
            return result;
        }

        super(context);
        WebAudioConvolver.init(this, node, audioBufferService);
    }

    ngOnDestroy() {
        this.buffer$.complete();
        this.disconnect();
    }

    static init(
        that: WebAudioConvolver,
        node: AudioNode | null,
        audioBufferService: AudioBufferService,
    ) {
        connect(
            node,
            that,
        );
        that.buffer$ = new Subject<AudioBuffer | null | string>();
        that.buffer$
            .pipe(
                switchMap(source =>
                    typeof source === 'string'
                        ? audioBufferService.fetch(source)
                        : of(source),
                ),
            )
            .subscribe(buffer => {
                that.buffer = buffer;
            });
    }
}
