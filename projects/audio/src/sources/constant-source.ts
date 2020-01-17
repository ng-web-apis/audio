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
import {AUDIO_NODE} from '../tokens/audio-node';
import {AudioParamInput} from '../types/audio-param-input';

// @dynamic
@Directive({
    selector: '[ConstantSourceNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioConstantSource),
        },
    ],
})
export class WebAudioConstantSource extends ConstantSourceNode implements OnDestroy {
    @Input('offset')
    @audioParam('offset')
    offsetParam?: AudioParamInput;

    @Output()
    ended = new EventEmitter<void>();

    readonly onended = () => this.ended.emit();

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Attribute('autoplay') autoplay: string | null,
    ) {
        super(context);

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
