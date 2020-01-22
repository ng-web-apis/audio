import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioBiquadFilter} from '../biquad-filter';

describe('BiquadFilterNode', () => {
    @Component({
        template: `
            <div waBiquadFilterNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioBiquadFilter)
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

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof BiquadFilterNode).toBe(true);
    });
});
