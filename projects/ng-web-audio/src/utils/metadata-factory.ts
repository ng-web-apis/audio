import {Directive, forwardRef, Type} from '@angular/core';
import {AUDIO_NODE} from '../tokens/audio-node';

const DEFAULT_INPUTS = ['channelCount', 'channelCountMode', 'channelInterpretation'];

export function metadataFactory(selector: string, type: Type<any>, inputs: Array<string> = []): Directive {
    return {
        selector,
        exportAs: 'AudioNode',
        inputs: [...inputs, ...DEFAULT_INPUTS],
        providers: [
            {
                provide: AUDIO_NODE,
                useExisting: forwardRef(() => type),
            },
        ],
    };
}
