import {inject, InjectionToken} from '@angular/core';
import {AUDIO_CONTEXT} from './audio-context';
import {AUDIO_WORKLET_PROCESSORS} from './audio-worklet-processors';

export const AUDIO_WORKLET_PROCESSORS_READY = new InjectionToken<Promise<boolean>>(
    'Web Audio API worklet processors resolution promise',
    {
        providedIn: 'root',
        factory: () => {
            const context = inject(AUDIO_CONTEXT);
            const processors = inject(AUDIO_WORKLET_PROCESSORS);

            if (!context.audioWorklet) {
                return Promise.reject('AudioWorklet is not supported');
            }

            return Promise.all(
                processors.map(processor => context.audioWorklet.addModule(processor)),
            ).then(() => true);
        },
    },
);
