import {DOCUMENT} from '@angular/common';
import {inject, InjectFlags, InjectionToken} from '@angular/core';
import {AUDIO_CONTEXT_OPTIONS} from './audio-context-options';

export const AUDIO_CONTEXT = new InjectionToken<AudioContext>('Web Audio API context', {
    providedIn: 'root',
    factory: () => {
        const options = inject(AUDIO_CONTEXT_OPTIONS, InjectFlags.Optional);
        const windowRef = inject(DOCUMENT).defaultView as
            | null
            | Window & {
                  AudioContext?: typeof AudioContext;
                  webkitAudioContext?: typeof AudioContext;
              };

        if (!windowRef) {
            throw new Error('Window is not available');
        }

        const context = windowRef['AudioContext'] || windowRef['webkitAudioContext'];

        if (!context) {
            throw new Error('AudioContext is not available');
        }

        return new context(options || undefined);
    },
});
