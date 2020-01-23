import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioChannelSplitter} from '../channel-splitter';

describe('ChannelSplitterNode', () => {
    @Component({
        template: `
            <div waChannelSplitterNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioChannelSplitter)
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

        expect(testComponent.node instanceof ChannelSplitterNode).toBe(true);
    });

    it('falls back to factory method', () => {
        const temp = (window as any).ChannelSplitterNode;

        (window as any).ChannelSplitterNode = undefined;
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        (window as any).ChannelSplitterNode = temp;

        expect(testComponent.node instanceof ChannelSplitterNode).toBe(true);
    });
});
