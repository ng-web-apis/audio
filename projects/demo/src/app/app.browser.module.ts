import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {WebAudioModule} from 'ng-web-audio';
import {AppComponent} from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        WebAudioModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppBrowserModule {}
