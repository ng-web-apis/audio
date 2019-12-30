import {Inject, Injectable} from '@angular/core';
import {AUDIO_CONTEXT} from '../tokens/audio-context';

@Injectable({
    providedIn: 'root',
})
export class AudioBufferService {
    constructor(@Inject(AUDIO_CONTEXT) private readonly context: AudioContext) {}

    fetch(url: string): Promise<AudioBuffer> {
        return new Promise<AudioBuffer>((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onerror = reject;
            request.onabort = reject;
            request.onload = () => {
                this.context.decodeAudioData(request.response, resolve, reject);
            };
            request.send();
        });
    }
}
