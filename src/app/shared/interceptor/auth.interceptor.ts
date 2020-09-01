import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { SecurityHelper } from '../helpers';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private securityHelper: SecurityHelper
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req;
    //const accessToken = this.securityHelper.getAccessToken();
    //if (accessToken !== null) {
    //  request = req.clone({
    //    setHeaders: {
    //      Authorization: `Bearer ${accessToken}`
    //    }
    //  });
    //}
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl(`/account/login?returnUrl=${this.router.url}`)
        } else {
          return throwError(err);
        }
      })
    );
    //return next.handle(request);
  }
}
