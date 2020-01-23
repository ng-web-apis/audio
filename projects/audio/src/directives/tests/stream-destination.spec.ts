import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioMediaStreamDestination} from '../stream-destination';

describe('MediaStreamAudioDestinationNode', () => {
    @Component({
        template: `
            <div waMediaStreamAudioDestinationNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioMediaStreamDestination)
        node!: MediaStreamAudioDestinationNode;
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

        expect(testComponent.node instanceof MediaStreamAudioDestinationNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).MediaStreamAudioDestinationNode;

        (window as any).MediaStreamAudioDestinationNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).MediaStreamAudioDestinationNode = temp;

        expect(testComponent.node instanceof MediaStreamAudioDestinationNode).toBe(true);
    });
});
