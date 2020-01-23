import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioContext} from '../audio-context';

describe('AudioListener', () => {
    @Component({
        template: `
            <div waAudioContext [forwardX]="237">
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
