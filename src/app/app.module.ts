import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


import {
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';


import sampleConfig from './.samples.config';

const oktaConfig = Object.assign({
  onAuthRequired: ({ oktaAuth, router }) => {
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, sampleConfig.oidc);

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor} from './_helpers/jwt.interceptor';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [OktaAuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule.initAuth(oktaConfig),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent],

})
export class AppModule { }
