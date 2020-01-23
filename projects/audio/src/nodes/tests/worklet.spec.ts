import {Component, Inject, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {AUDIO_WORKLET_PROCESSORS} from '../../tokens/audio-worklet-processors';
import {AUDIO_WORKLET_PROCESSORS_READY} from '../../tokens/audio-worklet-processors-ready';
import {WebAudioWorklet} from '../worklet';

describe('AudioWorkletNode', () => {
    @Component({
        template: `
            <div *ngIf="ready | async" waAudioWorkletNode name="test"></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioWorklet)
        node!: AudioNode;

        constructor(
            @Inject(AUDIO_WORKLET_PROCESSORS_READY) readonly ready: Promise<boolean>,
        ) {}
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WebAudioModule],
            declarations: [TestComponent],
            providers: [
                {
                    provide: AUDIO_WORKLET_PROCESSORS,
                    useValue: ['base/test.js'],
                },
            ],
        });
    });

    beforeEach(done => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        setTimeout(() => {
            fixture.detectChanges();
            done();
        }, 100);
    });

    it('creates node', () => {
        expect(testComponent.node instanceof AudioWorkletNode).toBe(true);
    });
});
