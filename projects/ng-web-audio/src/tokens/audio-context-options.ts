import {InjectionToken} from '@angular/core';

export const AUDIO_CONTEXT_OPTIONS = new InjectionToken<AudioContextOptions | undefined>(
    'Web Audio API context options',
);
