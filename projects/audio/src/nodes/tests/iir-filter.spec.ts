import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {FEEDBACK_COEFFICIENTS} from '../../tokens/feedback-coefficients';
import {FEEDFORWARD_COEFFICIENTS} from '../../tokens/feedforward-coefficients';
import {WebAudioIIRFilter} from '../iir-filter';

describe('IIRFilterNode', () => {
    @Component({
        template: `
            <div waIIRFilterNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioIIRFilter)
        node!: AudioNode;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WebAudioModule],
            declarations: [TestComponent],
            providers: [
                {
                    provide: FEEDFORWARD_COEFFICIENTS,
                    useValue: [1],
                },
                {
                    provide: FEEDBACK_COEFFICIENTS,
                    useValue: [1],
                },
            ],
        });
    });

    it('creates node', () => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        expect(testComponent.node instanceof IIRFilterNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).IIRFilterNode;

        (window as any).IIRFilterNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).IIRFilterNode = temp;

        expect(testComponent.node instanceof IIRFilterNode).toBe(true);
    });
});
