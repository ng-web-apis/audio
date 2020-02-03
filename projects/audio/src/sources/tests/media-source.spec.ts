import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {providers} from '../../constants/fallback';
import {WebAudioModule} from '../../module';
import {WebAudioMediaSource} from '../media-source';

describe('MediaElementAudioSourceNode', () => {
    @Component({
        template: `
            <audio waMediaElementAudioSourceNode></audio>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioMediaSource)
        node!: AudioNode;
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
        expect(testComponent.node instanceof MediaElementAudioSourceNode).toBe(true);
    });
});

describe('MediaElementAudioSourceNode factory fallback', () => {
    @Component({
        template: `
            <audio waMediaElementAudioSourceNode></audio>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioMediaSource)
        node!: AudioNode;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WebAudioModule],
            declarations: [TestComponent],
            providers,
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof MediaElementAudioSourceNode).toBe(true);
    });
});
