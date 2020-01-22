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

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates node', () => {
        expect(testComponent.node instanceof ChannelSplitterNode).toBe(true);
    });
});
