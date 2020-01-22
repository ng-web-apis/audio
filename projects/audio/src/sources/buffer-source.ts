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
import {AudioBufferService} from '../services/audio-buffer.service';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[waAudioBufferSourceNode]',
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
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioBufferSource),
        },
    ],
})
export class WebAudioBufferSource extends AudioBufferSourceNode implements OnDestroy {
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
    ended?: EventEmitter<void>;

    buffer$!: Subject<AudioBuffer | null | string>;

    constructor(
        @Inject(AudioBufferService) audioBufferService: AudioBufferService,
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Attribute('autoplay') autoplay: string | null,
    ) {
        const result = constructorPolyfill(
            context,
            'createBufferSource',
            WebAudioBufferSource,
            null,
            autoplay,
            audioBufferService,
        );

        if (result) {
            return result;
        }

        super(context);
        WebAudioBufferSource.init(this, null, autoplay, audioBufferService);
    }

    ngOnDestroy() {
        this.buffer$.complete();

        try {
            this.stop();
        } catch (_) {}

        this.disconnect();
    }

    static init(
        that: WebAudioBufferSource,
        _node: AudioNode | null,
        autoplay: string | null,
        audioBufferService: AudioBufferService,
    ) {
        if (autoplay !== null) {
            that.start();
        }

        const ended = new EventEmitter<void>();

        that.ended = ended;
        that.onended = () => ended.emit();
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
