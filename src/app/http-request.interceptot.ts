import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';

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
    // const started = Date.now();
    // let ok: string;
    // return next.handle(request)
    // .pipe(
    //   tap({
    //     // Succeeds when there is a response; ignore other events
    //     next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
    //     // Operation failed; error is an HttpErrorResponse
    //     error: (_error) => (ok = 'failed')
    //   }),
    //   // Log when response observable either completes or errors
    //   finalize(() => {
    //     const elapsed = Date.now() - started;
    //     const msg = `${req.method} "${req.urlWithParams}"
    //        ${ok} in ${elapsed} ms.`;
    //     this.messenger.add(msg);
    //   })
    // );
  }
}
