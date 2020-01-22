import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioDynamicsCompressor} from '../dynamics-compressor';

describe('DynamicsCompressorNode', () => {
    @Component({
        template: `
            <div waDynamicsCompressorNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioDynamicsCompressor)
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
        expect(testComponent.node instanceof DynamicsCompressorNode).toBe(true);
    });
});
