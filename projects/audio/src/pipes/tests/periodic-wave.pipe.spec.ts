import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioPeriodicWavePipe} from '../periodic-wave.pipe';

describe('waPeriodicWave', () => {
    @Component({
        template: `
            <div waOscillatorNode [periodicWave]="[10] | waPeriodicWave"></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioPeriodicWavePipe)
        pipe!: WebAudioPeriodicWavePipe;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WebAudioModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates PeriodicWave', () => {
        expect(testComponent.pipe.transform([10]) instanceof PeriodicWave).toBe(true);
    });
});
