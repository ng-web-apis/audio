import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {MEDIA_STREAM} from '../../tokens/media-stream';
import {WebAudioMediaStreamSource} from '../media-stream-source';

describe('MediaStreamAudioSourceNode', () => {
    @Component({
        template: `
            <audio waMediaStreamAudioSourceNode></audio>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioMediaStreamSource)
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
                    provide: MEDIA_STREAM,
                    useFactory: () => {
                        const context = new AudioContext();
                        const destination = new MediaStreamAudioDestinationNode(context);

                        return destination.stream;
                    },
                },
            ],
        });
    });

    it('creates node', () => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        expect(testComponent.node instanceof MediaStreamAudioSourceNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).GainNode;

        (window as any).GainNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).GainNode = temp;

        expect(testComponent.node instanceof MediaStreamAudioSourceNode).toBe(true);
    });
});
