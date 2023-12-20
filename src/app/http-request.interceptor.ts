import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('AccessToken')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      });
      return next.handle(request);
    }

    return next.handle(request);
  }
}
