import {
    Attribute,
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Output,
    SkipSelf,
} from '@angular/core';
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';

// @dynamic
@Directive({
    selector: '[OscillatorNode]',
    exportAs: 'AudioNode',
    inputs: ['type', 'channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioOscillator),
        },
    ],
})
export class WebAudioOscillator extends OscillatorNode implements OnDestroy {
    @Input()
    set periodicWave(periodicWave: PeriodicWave) {
        this.setPeriodicWave(periodicWave);
    }

    @Input('detune')
    @audioParam('detune')
    detuneParam?: AudioParamInput;

    @Input('frequency')
    @audioParam('frequency')
    frequencyParam?: AudioParamInput;

    @Output()
    readonly ended = new EventEmitter<void>();

    readonly onended = () => this.ended.emit();

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
        @Attribute('autoplay') autoplay: string | null,
    ) {
        super(context);

        if (node) {
            node.connect(this);
        }

        if (autoplay !== null) {
            this.start();
        }
    }

    ngOnDestroy() {
        try {
            this.stop();
        } catch (_) {}

        this.disconnect();
    }
}
