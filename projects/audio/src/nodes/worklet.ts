import {
    Attribute,
    Directive,
    EventEmitter,
    forwardRef,
    Inject,
    OnDestroy,
    Optional,
    Output,
    SkipSelf,
} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {connect} from '../utils/connect';

// @dynamic
@Directive({
    selector: '[waAudioWorkletNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioWorklet),
        },
    ],
})
export class WebAudioWorklet extends AudioWorkletNode implements OnDestroy {
    @Output()
    processorerror = new EventEmitter<void>();

    readonly onprocessorerror = () => this.processorerror.emit();

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
        @Attribute('name') name: string,
    ) {
        super(context, name);

        connect(
            node,
            this,
        );
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
