import {InjectionToken} from '@angular/core';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';

export const AUDIO_NODE_ACCESSOR = new InjectionToken<AudioNodeAccessor>(
    'Web Audio API audio node accessor directive',
);
