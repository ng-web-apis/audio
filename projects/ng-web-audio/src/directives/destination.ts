import {Directive, Inject, OnDestroy, Output} from '@angular/core';
import {interval} from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    mapTo,
    skip,
    tap,
} from 'rxjs/operators';
import {DC_OFFSET} from '../constants/dc-offset';
import {POLLING_TIME} from '../constants/polling-time';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';

// @dynamic
@Directive({
    selector: '[AudioDestinationNode]',
    exportAs: 'AudioNode',
})
export class WebAudioDestination extends AnalyserNode implements OnDestroy {
    @Output()
    readonly quiet = interval(POLLING_TIME).pipe(
        mapTo(new Uint8Array(this.fftSize)),
        tap(array => this.getByteTimeDomainData(array)),
        map(array => this.isSilent(array)),
        distinctUntilChanged(),
        debounceTime(1000),
        filter(isSilent => isSilent),
        skip(1),
    );

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context, {fftSize: 256});

        this.connect(context.destination);

        if (node) {
            node.connect(this);
        }
    }

    ngOnDestroy() {
        this.disconnect();
    }

    private isSilent(array: Uint8Array): boolean {
        for (let i = 0; i < array.length; i++) {
            if (Math.abs(array[i] - DC_OFFSET) > 2) {
                return false;
            }
        }

        return true;
    }
}