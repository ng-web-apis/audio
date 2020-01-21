import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WebAudioModule} from '../../module';
import {WebAudioOutput} from '../output';

describe('Output', () => {
    @Component({
        template: `
            <div [Output]="destination"></div>
            <div AudioDestinationNode #destination="AudioNode"></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioOutput)
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
        expect(testComponent.node instanceof AudioNode).toBe(true);
    });
});
