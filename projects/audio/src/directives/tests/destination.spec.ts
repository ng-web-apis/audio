import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {WebAudioModule} from '../../module';
import {WebAudioDestination} from '../destination';

describe('AudioDestinationNode', () => {
    @Component({
        template: `
            <div AudioDestinationNode></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioDestination)
        node!: WebAudioDestination;
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

    it('inits output', () => {
        expect(testComponent.node.quiet instanceof Observable).toBe(true);
    });
});
