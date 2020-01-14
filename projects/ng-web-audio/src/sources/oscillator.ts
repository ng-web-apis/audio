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
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {AudioParamInput} from '../types/audio-param-input';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[OscillatorNode]',
    exportAs: 'AudioNode',
    inputs: ['type', 'channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioOscillator),
        },
    ],
})
export class WebAudioOscillator extends OscillatorNode
    implements OnDestroy, AudioNodeAccessor {
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
        @Attribute('autoplay') autoplay: string | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createOscillator());

        if (autoplay !== null) {
            this.start();
        }
    }

    get node(): AudioNode {
        // @ts-ignore
        return this['__node'] || this;
    }

    ngOnDestroy() {
        try {
            this.stop();
        } catch (_) {}

        this.disconnect();
    }
}
