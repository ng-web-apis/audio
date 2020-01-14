import {Directive} from '@angular/core';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';

export function audioNodeExtractor({node}: AudioNodeAccessor): AudioNode {
    return node;
}

@Directive({
    selector:
        '[AnalyserNode],[BiquadFilterNode],[ConvolverNode],[DelayNode],[DynamicsCompressorNode],[GainNode],[PannerNode],[StereoPannerNode],[WaveShaperNode],[AudioBufferSourceNode],[MediaElementAudioSourceNode],[OscillatorNode]',
    providers: [
        {
            provide: AUDIO_NODE,
            deps: [AUDIO_NODE_ACCESSOR],
            useFactory: audioNodeExtractor,
        },
    ],
})
export class WebAudioNode {}
