import {TestBed} from '@angular/core/testing';
import {AUDIO_CONTEXT} from '../audio-context';
import {AUDIO_WORKLET_PROCESSORS_READY} from '../audio-worklet-processors-ready';

describe('AUDIO_WORKLET_PROCESSORS_READY', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AUDIO_CONTEXT,
                    useValue: {},
                },
            ],
        });
    });

    it('rejects Promise if worklets are not supported', done => {
        let rejected = false;

        TestBed.get(AUDIO_WORKLET_PROCESSORS_READY).catch(() => {
            rejected = true;
        });

        setTimeout(() => {
            expect(rejected).toBe(true);
            done();
        });
    });
});
