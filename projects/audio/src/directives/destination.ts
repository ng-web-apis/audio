import {Directive, Inject, OnDestroy, Output} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    mapTo,
    skipWhile,
    tap,
} from 'rxjs/operators';
import {DC_OFFSET} from '../constants/dc-offset';
import {POLLING_TIME} from '../constants/polling-time';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {CONSTRUCTOR_SUPPORT} from '../tokens/constructor-support';
import {connect} from '../utils/connect';

// @dynamic
@Directive({
    selector: '[waAudioDestinationNode]',
    exportAs: 'AudioNode',
})
export class WebAudioDestination extends AnalyserNode implements OnDestroy {
    @Output()
    quiet?: Observable<unknown>;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @Inject(AUDIO_NODE) node: AudioNode | null,
        @Inject(CONSTRUCTOR_SUPPORT) modern: boolean,
    ) {
        if (modern) {
            super(context);
            WebAudioDestination.init(this, node);
        } else {
            const result = context.createAnalyser() as WebAudioDestination;

            Object.setPrototypeOf(result, WebAudioDestination.prototype);
            WebAudioDestination.init(result, node);

            return result;
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

    static init(that: WebAudioDestination, node: AudioNode | null) {
        connect(
            node,
            that,
        );
        that.fftSize = 256;
        that.connect(that.context.destination);
        that.quiet = interval(POLLING_TIME).pipe(
            mapTo(new Uint8Array(that.fftSize)),
            tap(array => that.getByteTimeDomainData(array)),
            map(array => that.isSilent(array)),
            distinctUntilChanged(),
            skipWhile(isSilent => !isSilent),
            debounceTime(1000),
            filter(isSilent => isSilent),
        );
    }
}
