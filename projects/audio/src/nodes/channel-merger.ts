import {
    Attribute,
    ContentChildren,
    Directive,
    forwardRef,
    Inject,
    OnDestroy,
    QueryList,
} from '@angular/core';
import {WebAudioChannel} from '../directives/channel';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

// @dynamic
@Directive({
    selector: '[waChannelMergerNode]',
    exportAs: 'AudioNode',
    inputs: ['channelCount', 'channelCountMode', 'channelInterpretation'],
    providers: [
        {
            provide: AUDIO_NODE,
            useExisting: forwardRef(() => WebAudioChannelMerger),
        },
    ],
})
export class WebAudioChannelMerger extends ChannelMergerNode implements OnDestroy {
    @ContentChildren(WebAudioChannel, {descendants: false})
    set channels(channels: QueryList<AudioNode>) {
        channels.forEach((node, index) => {
            node.connect(this, 0, index);
        });
    }

    constructor(
        @Attribute('numberOfInputs') inputs: string | null,
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
    ) {
        const numberOfInputs = Number.parseInt(inputs || '', 10) || 6;

        try {
            // @ts-ignore
            const _test = new ChannelMergerNode(context);
        } catch (_) {
            const result = context.createChannelMerger(numberOfInputs);

            Object.setPrototypeOf(result, WebAudioChannelMerger.prototype);

            return result as WebAudioChannelMerger;
        }

        super(context, {numberOfInputs});
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
