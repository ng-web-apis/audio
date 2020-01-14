import {Directive, forwardRef, Inject, OnDestroy, Output, SkipSelf} from '@angular/core';
import {animationFrameScheduler, interval, Observable} from 'rxjs';
import {map, mapTo, tap} from 'rxjs/operators';
import {AudioNodeAccessor} from '../interfaces/audio-node-accessor';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {AUDIO_NODE} from '../tokens/audio-node';
import {AUDIO_NODE_ACCESSOR} from '../tokens/audio-node-accessor';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[AnalyserNode]',
    exportAs: 'AudioNode',
    inputs: [
        'fftSize',
        'minDecibels',
        'maxDecibels',
        'maxDecibels',
        'smoothingTimeConstant',
        'channelCount',
        'channelCountMode',
        'channelInterpretation',
    ],
    providers: [
        {
            provide: AUDIO_NODE_ACCESSOR,
            useExisting: forwardRef(() => WebAudioAnalyser),
        },
    ],
})
export class WebAudioAnalyser extends AnalyserNode
    implements OnDestroy, AudioNodeAccessor {
    @Output()
    readonly frequencyByte$: Observable<Uint8Array> = interval(
        0,
        animationFrameScheduler,
    ).pipe(
        mapTo(new Uint8Array(this.frequencyBinCount)),
        map(array =>
            array.length === this.frequencyBinCount
                ? array
                : new Uint8Array(this.frequencyBinCount),
        ),
        tap(array => this.getByteFrequencyData(array)),
    );

    @Output()
    readonly frequencyFloat$: Observable<Float32Array> = interval(
        0,
        animationFrameScheduler,
    ).pipe(
        mapTo(new Float32Array(this.frequencyBinCount)),
        map(array =>
            array.length === this.frequencyBinCount
                ? array
                : new Float32Array(this.frequencyBinCount),
        ),
        tap(array => this.getFloatFrequencyData(array)),
    );

    @Output()
    readonly timeByte$: Observable<Uint8Array> = interval(
        0,
        animationFrameScheduler,
    ).pipe(
        mapTo(new Uint8Array(this.fftSize)),
        map(array =>
            array.length === this.fftSize
                ? array
                : new Uint8Array(this.frequencyBinCount),
        ),
        tap(array => this.getByteTimeDomainData(array)),
    );

    @Output()
    readonly timeFloat$: Observable<Float32Array> = interval(
        0,
        animationFrameScheduler,
    ).pipe(
        mapTo(new Float32Array(this.fftSize)),
        map(array =>
            array.length === this.fftSize
                ? array
                : new Float32Array(this.frequencyBinCount),
        ),
        tap(array => this.getFloatTimeDomainData(array)),
    );

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    ) {
        super(context);
        constructorPolyfill(this, context.createAnalyser());

        if (node) {
            node.connect(this.node);
        }
    }

    get node(): AudioNode {
        // @ts-ignore
        return this['__node'] || this;
    }

    ngOnDestroy() {
        this.disconnect();
    }
}
