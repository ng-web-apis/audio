import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {providers} from '../../constants/fallback';
import {WebAudioModule} from '../../module';
import {WebAudioChannel} from '../channel';

describe('Channel', () => {
    @Component({
        template: `
            <div waChannel></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioChannel)
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

        expect(testComponent.node instanceof AudioNode).toBe(true);
    });
});

describe('Channel factory fallback', () => {
    @Component({
        template: `
            <div waChannel></div>
        `,
    })
    class TestComponent {
        @ViewChild(WebAudioChannel)
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

    it('creates node', () => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        expect(testComponent.node instanceof AudioNode).toBe(true);
    });
});
