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
import {audioParam} from '../decorators/audio-param';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AudioParamInput} from '../types/audio-param-input';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[waOscillatorNode]',
    exportAs: 'AudioNode',
    inputs: ['type', 'channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AudioNode,
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
    ended?: EventEmitter<void>;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Attribute('autoplay') autoplay: string | null,
    ) {
        const result = constructorPolyfill(
            context,
            'createOscillator',
            WebAudioOscillator,
            null,
            autoplay,
        );

        if (result) {
            return result;
        }

        super(context);
        WebAudioOscillator.init(this, null, autoplay);
    }

    ngOnDestroy() {
        try {
            this.stop();
        } catch (_) {}

        this.disconnect();
    }

    static init(
        that: WebAudioOscillator,
        node: AudioNode | null,
        autoplay: string | null,
    ) {
        connect(
            node,
            that,
        );

        if (autoplay !== null) {
            that.start();
        }

        const ended = new EventEmitter<void>();

        that.ended = ended;
        that.onended = () => ended.emit();
    }
}
