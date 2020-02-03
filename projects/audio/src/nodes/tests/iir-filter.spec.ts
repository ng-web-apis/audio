import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {CONSTRUCTOR_SUPPORT} from '../../tokens/constructor-support';
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

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof IIRFilterNode).toBe(true);
    });
});

describe('IIRFilterNode factory fallback', () => {
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
                {
                    provide: CONSTRUCTOR_SUPPORT,
                    useValue: false,
                },
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof IIRFilterNode).toBe(true);
    });
});
