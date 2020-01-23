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

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof MediaStreamAudioDestinationNode).toBe(true);
    });
});
