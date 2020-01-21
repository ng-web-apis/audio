import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioOfflineContext} from '../offline-audio-context';

describe('OfflineAudioContext', () => {
    @Component({
        template: `
            <div OfflineAudioContext sampleRate="22050" length="44100"></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioOfflineContext)
        audioContext!: OfflineAudioContext;
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
    });

    it('creates context', () => {
        expect(testComponent.audioContext instanceof OfflineAudioContext).toBe(true);
    });

    it('parses sampleRate', () => {
        expect(testComponent.audioContext.sampleRate).toBe(22050);
    });

    it('parses length', () => {
        expect(testComponent.audioContext.length).toBe(44100);
    });
});
