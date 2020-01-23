import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioBufferSource} from '../buffer-source';

describe('AudioBufferSourceNode', () => {
    @Component({
        template: `
            <div waAudioBufferSourceNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioBufferSource)
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

        expect(testComponent.node instanceof AudioBufferSourceNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).GainNode;

        (window as any).GainNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).GainNode = temp;

        expect(testComponent.node instanceof AudioBufferSourceNode).toBe(true);
    });
});
