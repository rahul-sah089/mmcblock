import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    isAuthenticated: boolean;
    userName: string;
    constructor(public oktaAuth: OktaAuthService) {
        
    }

    async ngOnInit() {
        this.isAuthenticated = await this.oktaAuth.isAuthenticated();
        if (this.isAuthenticated) {
          const userClaims = await this.oktaAuth.getUser();
          this.userName = userClaims.name;
        }
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken =  this.oktaAuth.getAccessToken();
        if (this.isAuthenticated) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}