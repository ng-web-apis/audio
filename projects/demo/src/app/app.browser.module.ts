import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {WebAudioModule} from 'ng-web-audio';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {StaticModule} from './modules/static/static.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        WebAudioModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
        StaticModule,
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
