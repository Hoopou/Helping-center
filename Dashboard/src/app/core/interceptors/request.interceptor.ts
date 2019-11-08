import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    private api: ApiService;

    constructor(private injector: Injector,
        private router: Router,
        private cookieService: CookieService
        ) {
        this.api = injector.get(ApiService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         if(localStorage.getItem("token") != null){
              req = req.clone({
                headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
                
             });
             //console.log("REQUETE AVEC TOKEN:", req);
         }else{
            //console.log("REQUETE SANS TOKEN:", req);
         }
        return next.handle(req).pipe(
            tap(() => { }, err => {
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    this.cookieService.set(env.urlRedirectCookie, this.router.url)
                    this.api.loginService.logout();
                }
            })
        );
    }
}