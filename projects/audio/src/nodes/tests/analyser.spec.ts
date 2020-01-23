import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {take} from 'rxjs/operators';
import {WebAudioModule} from '../../module';
import {WebAudioAnalyser} from '../analyser';

describe('AnalyserNode', () => {
    @Component({
        template: `
            <div waAnalyserNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioAnalyser)
        node!: WebAudioAnalyser;
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
            expect(testComponent.node instanceof AnalyserNode).toBe(true);
        });

        it('emits frequency byte array', done => {
            testComponent.node.frequencyByte$!.pipe(take(1)).subscribe(array => {
                expect(array instanceof Uint8Array).toBe(true);
                done();
            });
        });

        it('emits frequency float array', done => {
            testComponent.node.frequencyFloat$!.pipe(take(1)).subscribe(array => {
                expect(array instanceof Float32Array).toBe(true);
                done();
            });
        });

        it('emits time byte array', done => {
            testComponent.node.timeByte$!.pipe(take(1)).subscribe(array => {
                expect(array instanceof Uint8Array).toBe(true);
                done();
            });
        });

        it('emits time float array', done => {
            testComponent.node.timeFloat$!.pipe(take(1)).subscribe(array => {
                expect(array instanceof Float32Array).toBe(true);
                done();
            });
        });
    });

    it('falls back to factory method', () => {
        const temp = (window as any).GainNode;

        (window as any).GainNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).GainNode = temp;

        expect(testComponent.node instanceof AnalyserNode).toBe(true);
    });
});
