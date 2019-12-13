import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[audioWire]',
})
export class WebAudioWire {
    @Input()
    source?: AudioNode;

    @Input()
    destination?: AudioNode;

    ngOnInit() {
        this.source!.connect(this.destination!);
    }
}
