import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioContext} from '../audio-context';

describe('AudioListener', () => {
    @Component({
        template: `
            <div
                waAudioContext
                forwardX="237"
                forwardY="1"
                forwardZ="2"
                positionX="3"
                positionY="4"
                positionZ="5"
                upX="6"
                upY="7"
                upZ="8"
            >
                <div waAudioDestinationNode></div>
            </div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioContext)
        context!: AudioContext;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WebAudioModule],
            declarations: [TestComponent],
        });
    });

    describe('normal behavior', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            testComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('creates node', () => {
            expect(testComponent.context.listener instanceof AudioListener).toBe(true);
        });

        it('sets AudioParam value', done => {
            setTimeout(() => {
                expect(testComponent.context.listener.forwardX.value).toBe(237);
                done();
            }, 50);
        });
    });

    it('falls back to factory method', () => {
        const temp = (window as any).GainNode;

        (window as any).GainNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).GainNode = temp;

        expect(testComponent.context.listener instanceof AudioListener).toBe(true);
    });
});
