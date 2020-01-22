import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioWaveShaper} from '../wave-shaper';

describe('WaveShaperNode', () => {
    @Component({
        template: `
            <div waWaveShaperNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioWaveShaper)
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
        expect(testComponent.node instanceof WaveShaperNode).toBe(true);
    });
});
