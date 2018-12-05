import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
//https://hackernoon.com/global-http-error-catching-in-angular-4-3-9e15cc1e0a6b
//http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
 
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
 
  constructor(public oktaAuth: OktaAuthService) {}
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
        console.log("********Error in response********");
        console.log(err);
        console.log("********Error in response********");
      if (err instanceof HttpErrorResponse) {
        if(err.status == 401){
            console.log("Error in response");
            this.oktaAuth.logout('/');
        }
      }
    });
  }
}