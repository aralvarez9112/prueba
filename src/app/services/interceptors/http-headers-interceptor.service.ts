import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoadingService } from '../loading.service';

import {  tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root',
})
export class HttpHeadersInterceptorService implements HttpInterceptor {
  protected _currentLanguage = '';

  constructor(public httpClient: HttpClient, private loader:LoadingService) { }

  get userToken(): any {
    return "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiY3R5IjoiSldUIn0..A1Otp5l7mStylVvn0slQ9Q.wOQDaEnZh9Ak10ySWFgHTTgcQvEiYa5W3UxXcwuCITJcsU3IZ4V-gpiMopFPFfWa-g_MlKHpHQ0vGVs0yPXC65sUy0nJq-Cuogp_ZyQq_12Lv_MRAwM2U4xdDpUzTzpfOobO1bSgtxxzSrKcGrl63p98edAkhOGng0qwaX_0rpRBT0S8S5w0qMqia4kDMBYjF08PeIcQyqnkeFafCAzYgMK7CcVyGo-hm6j4n6AEvp-geXT6ieU-VzlzgvPd4XthpMb7UKmpJlUAjsqKkJ8bCQ93RcbGPUyH2ribxaLhxCyJGsh1iNcYUVP1BJKg9CYzVSvh1G08MU7B9ytEVDt9uw.YHFsoJe9aj5KMyNxkTckag"//localStorage.getItem('token');
  }

  set userToken(value: string) {
    localStorage.setItem('token', value);
  }

  get currentLanguage(): string {
    return this._currentLanguage;
  }

  set currentLanguage(value: string) {
    this._currentLanguage = value;
  }

  public getHeaders(): HttpHeaders {
    const requestOptions = new HttpHeaders({
      'Accept-Language': this.currentLanguage ? this.currentLanguage : '',
      'Content-Type': 'application/json',
      'Authorization': this.userToken ? 'Bearer ' + this.userToken : '',
      //'useroauth': this.userToken ? this.userToken : '',
    });
    return requestOptions;
  }

  public getRequestOptionArgs(request: HttpRequest<any>): HttpRequest<any> {
    if (request.headers.keys().length === 0) {
      const headers = this.getHeaders();
      const requestOptions = new HttpHeaders({
        'Accept-Language': this.currentLanguage ? this.currentLanguage : '',
        'Content-Type': 'application/json',
        'Authorization': this.userToken ? 'Bearer ' + this.userToken : '',
      });
      const req = request.clone({
        headers: requestOptions
      });
      return req;
    } else {
      return request;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
   // request = this.getRequestOptionArgs(request);

 return  next.handle(request)
      .pipe(
        tap((request) => {
          if (request instanceof HttpResponse) {
            this.loader.hide();
          }
          return request;
        }),
        catchError((error: HttpErrorResponse) => {
          this.loader.hide();
          return throwError(error);
        }),
      );
  }
}
