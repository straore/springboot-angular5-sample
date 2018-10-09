import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CarService} from './shared/car.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {GiphyService} from './shared/giphy.service';
import { CarEditComponent } from './car-edit/car-edit.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import {AuthInterceptor} from './shared/auth.interceptor';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {
        path: 'home',
        component: HomeComponent
    },
    { path: '', redirectTo: '/car-list', pathMatch: 'full' },
    {
        path: 'car-list',
        component: CarListComponent
    },
    {
        path: 'car-add',
        component: CarEditComponent
    },
    {
        path: 'car-edit/:id',
        component: CarEditComponent
    },
    {
        path: 'implicit/callback',
        component: OktaCallbackComponent
    }
];

const config = {
    issuer: 'https://dev-982933.oktapreview.com/oauth2/default',
    redirectUri: 'http://localhost:4200/implicit/callback',
    clientId: '0oag73438nnXksA8O0h7'
};

@NgModule({
    declarations: [
        AppComponent,
        CarListComponent,
        CarEditComponent,
        HomeComponent
    ],
    imports: [
        OktaAuthModule.initAuth(config),
        FormsModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [CarService, GiphyService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
