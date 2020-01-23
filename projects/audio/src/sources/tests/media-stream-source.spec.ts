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

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof MediaStreamAudioSourceNode).toBe(true);
    });
});
