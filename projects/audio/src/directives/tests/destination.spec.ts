import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {WebAudioModule} from '../../module';
import {WebAudioBufferSource} from '../../sources/buffer-source';
import {WebAudioDestination} from '../destination';

describe('AudioDestinationNode', () => {
    @Component({
        template: `
            <div waAudioBufferSourceNode buffer="base/demo.mp3" autoplay>
                <div waAudioDestinationNode (quiet)="quiet = true"></div>
            </div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioDestination)
        node!: WebAudioDestination;

        @ViewChild(WebAudioBufferSource)
        source!: WebAudioBufferSource;

        quiet = false;
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

    afterEach(() => {
        testComponent.source.stop();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof AudioNode).toBe(true);
    });

    it('inits output', () => {
        expect(testComponent.node.quiet instanceof Observable).toBe(true);
    });

    it('does not fire output initially', () => {
        expect(testComponent.quiet).toBe(false);
    });

    it('fires output after destination has gone silent', done => {
        testComponent.source.stop(testComponent.source.context.currentTime + 0.5);
        setTimeout(() => {
            fixture.detectChanges();
            expect(testComponent.quiet).toBe(true);
            done();
        }, 2000);
    });
});
