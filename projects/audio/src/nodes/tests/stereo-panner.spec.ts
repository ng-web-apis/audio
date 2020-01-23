import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioStereoPanner} from '../stereo-panner';

describe('StereoPannerNode', () => {
    @Component({
        template: `
            <div waStereoPannerNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioStereoPanner)
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

    it('creates node', () => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        expect(testComponent.node instanceof StereoPannerNode).toBe(true);
    });

    it('falls back to PannerNode', () => {
        const temp = (window as any).StereoPannerNode;

        (window as any).StereoPannerNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).StereoPannerNode = temp;

        expect(testComponent.node instanceof StereoPannerNode).toBe(true);
    });
});
