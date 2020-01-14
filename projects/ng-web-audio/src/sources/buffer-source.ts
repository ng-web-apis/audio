import {
    Attribute,
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import {of, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {audioParam} from '../decorators/audio-param';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AudioBufferService} from '../services/audio-buffer.service';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {AudioParamInput} from '../types/audio-param-input';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[AudioBufferSourceNode]',
    exportAs: 'AudioNode',
    inputs: [
        'loop',
        'loopStart',
        'loopEnd',
        'channelCount',
        'channelCountMode',
        'channelInterpretation',
    ],
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioBufferSource),
        },
    ],
})
export class WebAudioBufferSource extends AudioBufferSourceNode
    implements OnDestroy, AudioNodeAccessor {
    @Input('buffer')
    set bufferSetter(source: AudioBuffer | null | string) {
        this.buffer$.next(source);
    }

    @Input('detune')
    @audioParam('detune')
    detuneParam?: AudioParamInput;

    @Input('playbackRate')
    @audioParam('playbackRate')
    playbackRateParam?: AudioParamInput;

    @Output()
    readonly ended = new EventEmitter<void>();

    readonly onended = () => this.ended.emit();

    private readonly buffer$ = new Subject<AudioBuffer | null | string>();

    constructor(
        @Inject(AudioBufferService) audioBufferService: AudioBufferService,
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Attribute('autoplay') autoplay: string | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createBufferSource());

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

                if (autoplay !== null) {
                    this.start();
                }
            });
    }

    get node(): AudioNode {
        // @ts-ignore
        return this['__node'] || this;
    }

    ngOnDestroy() {
        this.buffer$.complete();

        try {
            this.stop();
        } catch (_) {}

        this.disconnect();
    }
}
