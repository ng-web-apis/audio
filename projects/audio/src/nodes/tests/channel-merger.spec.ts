import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioChannelMerger} from '../channel-merger';

describe('ChannelMergerNode', () => {
    @Component({
        template: `
            <div waChannelMergerNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioChannelMerger)
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

        expect(testComponent.node instanceof ChannelMergerNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).ChannelMergerNode;

        (window as any).ChannelMergerNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).ChannelMergerNode = temp;

        expect(testComponent.node instanceof ChannelMergerNode).toBe(true);
    });
});
