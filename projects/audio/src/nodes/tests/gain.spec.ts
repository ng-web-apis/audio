import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {AudioParamInput} from '../../types/audio-param-input';
import {WebAudioGain} from '../gain';

describe('GainNode', () => {
    @Component({
        template: `
            <div waGainNode [gain]="gain">
                <div waAudioDestinationNode></div>
            </div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioGain)
        node!: GainNode;

        gain: AudioParamInput = 10;
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
            expect(testComponent.node instanceof GainNode).toBe(true);
        });

        describe('AudioParam', () => {
            it('sets gain instantly', done => {
                setTimeout(() => {
                    expect(testComponent.node.gain.value).toBe(10);
                    done();
                }, 100);
            });

            it('sets gain linearly', done => {
                testComponent.gain = {
                    value: 10,
                    duration: 1,
                    mode: 'linear',
                };
                fixture.detectChanges();

                setTimeout(() => {
                    expect(
                        testComponent.node.gain.value < 6 &&
                            testComponent.node.gain.value > 5,
                    ).toBe(true);
                    setTimeout(() => {
                        expect(Math.round(testComponent.node.gain.value)).toBe(10);
                        done();
                    }, 500);
                }, 500);
            });

            it('sets gain exponentially', done => {
                testComponent.gain = {
                    value: 10,
                    duration: 1,
                    mode: 'exponential',
                };
                fixture.detectChanges();

                setTimeout(() => {
                    expect(
                        testComponent.node.gain.value < 4 &&
                            testComponent.node.gain.value > 2,
                    ).toBe(true);
                    setTimeout(() => {
                        expect(Math.round(testComponent.node.gain.value)).toBe(10);
                        done();
                    }, 500);
                }, 500);
            });

            it('sets gain curve', done => {
                testComponent.gain = {
                    value: [10, 5, 10],
                    duration: 1,
                };
                fixture.detectChanges();

                setTimeout(() => {
                    expect(Math.round(testComponent.node.gain.value)).toBe(5);
                    setTimeout(() => {
                        expect(Math.round(testComponent.node.gain.value)).toBe(10);
                        done();
                    }, 500);
                }, 500);
            });

            it('schedules multiple changes', done => {
                testComponent.gain = [
                    {
                        value: 5,
                        duration: 1,
                        mode: 'instant',
                    },
                    {
                        value: 10,
                        duration: 1,
                        mode: 'linear',
                    },
                    {
                        value: [10, 5, 10],
                        duration: 1,
                    },
                ];
                fixture.detectChanges();

                setTimeout(() => {
                    expect(Math.round(testComponent.node.gain.value)).toBe(5);
                    setTimeout(() => {
                        expect(
                            testComponent.node.gain.value < 9 &&
                                testComponent.node.gain.value > 7,
                        ).toBe(true);
                        setTimeout(() => {
                            expect(Math.round(testComponent.node.gain.value)).toBe(10);
                            setTimeout(() => {
                                expect(
                                    testComponent.node.gain.value < 6 &&
                                        testComponent.node.gain.value > 5,
                                ).toBe(true);
                                setTimeout(() => {
                                    expect(
                                        Math.round(testComponent.node.gain.value),
                                    ).toBe(10);
                                    done();
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 1000);
                }, 500);
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

        expect(testComponent.node instanceof GainNode).toBe(true);
    });
});
