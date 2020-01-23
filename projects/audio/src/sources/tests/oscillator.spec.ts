import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioOscillator} from '../oscillator';

describe('OscillatorNode', () => {
    @Component({
        template: `
            <div waOscillatorNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioOscillator)
        node!: AudioNode;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WebAudioModule],
            declarations: [TestComponent],
        });
    });

    it('creates node', () => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        expect(testComponent.node instanceof OscillatorNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).GainNode;

        (window as any).GainNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).GainNode = temp;

        expect(testComponent.node instanceof OscillatorNode).toBe(true);
    });
});
