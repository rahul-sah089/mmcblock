/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import sampleConfig from './.samples.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signIn: any;
  title = 'app';
  isAuthenticated: boolean;
  widgetErrorCallback(err) {
  }

  widgetSuccessCallback(res) {

  }



  constructor(public oktaAuth: OktaAuthService, private router: Router) {
    this.signIn = new OktaSignIn({
      features: {
        rememberMe: true,
        router: true
      },
      baseUrl: sampleConfig.oidc.issuer.split('/oauth2')[0],
      clientId: sampleConfig.oidc.clientId,
      redirectUri: sampleConfig.oidc.redirectUri,
      logo: '/assets/angular.svg',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to SCM Block',
        },
      },
      authParams: {
        responseType: ['id_token', 'token'],
        issuer: sampleConfig.oidc.issuer,
        display: 'page',
        scopes: sampleConfig.oidc.scope.split(' '),
      },
    });
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated)
  }
  async ngOnInit() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      () => {
        
      },
      (err) => {
        throw err;
      },
    );
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }
  login(){
    this.oktaAuth.loginRedirect();
  }
  logout() {
    this.oktaAuth.logout('/');
  }


}
