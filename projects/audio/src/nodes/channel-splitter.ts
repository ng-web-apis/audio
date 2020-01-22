import {
    Attribute,
    ContentChildren,
    Directive,
    Inject,
    OnDestroy,
    Optional,
    QueryList,
    SkipSelf,
} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {connect} from '../utils/connect';

// @dynamic
@Directive({
    selector: '[waChannelSplitterNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AudioNode,
            useValue: null,
        },
    ],
})
export class WebAudioChannelSplitter extends ChannelSplitterNode implements OnDestroy {
    @ContentChildren(AudioNode, {descendants: false})
    set channels(channels: QueryList<AudioNode | null>) {
        this.disconnect();
        channels
            .filter(node => !!node)
            .forEach((node, index) => {
                this.connect(node!, index);
            });
    }

    constructor(
        @Attribute('numberOfOutputs') outputs: string | null,
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        const numberOfOutputs = Number.parseInt(outputs || '', 10) || 6;

        try {
            // @ts-ignore
            const _test = new GainNode(context);
        } catch (_) {
            const result = context.createChannelSplitter(numberOfOutputs);

            Object.setPrototypeOf(result, WebAudioChannelSplitter.prototype);

            connect(
                node,
                result,
            );

            return result as WebAudioChannelSplitter;
        }

        super(context, {numberOfOutputs});
        connect(
            node,
            this,
        );
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
