import {
    Directive,
    forwardRef,
    Inject,
    OnDestroy,
    Optional,
    Output,
    SkipSelf,
} from '@angular/core';
import {animationFrameScheduler, interval, Observable} from 'rxjs';
import {map, mapTo, tap} from 'rxjs/operators';
import {AUDIO_CONTEXT} from '../tokens/audio-context';
import {connect} from '../utils/connect';
import {constructorPolyfill} from '../utils/constructor-polyfill';

// @dynamic
@Directive({
    selector: '[waAnalyserNode]',
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
            provide: AudioNode,
            useExisting: forwardRef(() => WebAudioAnalyser),
        },
    ],
})
export class WebAudioAnalyser extends AnalyserNode implements OnDestroy {
    @Output()
    frequencyByte$?: Observable<Uint8Array>;

    @Output()
    frequencyFloat$?: Observable<Float32Array>;

    @Output()
    timeByte$?: Observable<Uint8Array>;

    @Output()
    timeFloat$?: Observable<Float32Array>;

    constructor(
        @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
        @SkipSelf() @Optional() @Inject(AudioNode) node: AudioNode | null,
    ) {
        const result = constructorPolyfill(
            context,
            'createAnalyser',
            WebAudioAnalyser,
            node,
        );

        if (result) {
            return result;
        }

        super(context);
        WebAudioAnalyser.init(this, node);
    }

    ngOnDestroy() {
        this.disconnect();
    }

    static init(that: WebAudioAnalyser, node: AudioNode | null) {
        connect(
            node,
            that,
        );

        that.frequencyByte$ = interval(0, animationFrameScheduler).pipe(
            mapTo(new Uint8Array(that.frequencyBinCount)),
            map(array =>
                array.length === that.frequencyBinCount
                    ? array
                    : new Uint8Array(that.frequencyBinCount),
            ),
            tap(array => that.getByteFrequencyData(array)),
        );

        that.frequencyFloat$ = interval(0, animationFrameScheduler).pipe(
            mapTo(new Float32Array(that.frequencyBinCount)),
            map(array =>
                array.length === that.frequencyBinCount
                    ? array
                    : new Float32Array(that.frequencyBinCount),
            ),
            tap(array => that.getFloatFrequencyData(array)),
        );

        that.timeByte$ = interval(0, animationFrameScheduler).pipe(
            mapTo(new Uint8Array(that.fftSize)),
            map(array =>
                array.length === that.fftSize
                    ? array
                    : new Uint8Array(that.frequencyBinCount),
            ),
            tap(array => that.getByteTimeDomainData(array)),
        );

        that.timeFloat$ = interval(0, animationFrameScheduler).pipe(
            mapTo(new Float32Array(that.fftSize)),
            map(array =>
                array.length === that.fftSize
                    ? array
                    : new Float32Array(that.frequencyBinCount),
            ),
            tap(array => that.getFloatTimeDomainData(array)),
        );
    }
}
