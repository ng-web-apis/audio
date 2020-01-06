import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    buffers = [Date.now()];

    selectedChain = 'dry';

    selectedSource = 'buffer';

    gain = 1;

    pan = 0;

    delayTime = 1;

    delayGain = 0.5;

    distortion = 20;

    frequency = 350;

    detune = 0;

    filterGain = 0;

    Q = 1;

    type: BiquadFilterType = 'lowpass';

    curve = makeDistortionCurve(this.distortion);

    @ViewChild('chain')
    readonly chain?: AudioNode;

    get distortionCompensation(): number {
        return 1.2 - this.distortion / 20;
    }

    onCurveChange(distortion: number) {
        this.distortion = distortion;
        this.curve = makeDistortionCurve(distortion);
    }

    onClick(source: AudioBufferSourceNode, button: HTMLButtonElement) {
        if (button.textContent!.trim() === 'Play') {
            button.textContent = 'Stop';
            source.start();
        } else {
            this.buffers[0] = Date.now();
        }
    }
}

function makeDistortionCurve(amount: number): Float32Array {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; ++i) {
        const x = (i * 2) / samples - 1;

        curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
}
