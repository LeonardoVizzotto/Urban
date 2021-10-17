import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request.url.includes(environment.API) &&
      !request.url.includes(environment.PROFILE_PICTURE_API)
    ) {
      return next.handle(request);
    }
    this.loadingService.setLoading(1, request.url);

    return next
      .handle(request)
      .pipe(
        delay(400), // So the spinner is visible
        catchError((err) => {
          this.loadingService.setLoading(-1, request.url);
          return err;
        })
      )
      .pipe(
        map((evenet) => {
          if (evenet instanceof HttpResponse) {
            this.loadingService.setLoading(-1, request.url);
          }
          return evenet as any;
        })
      );
  }
}
