import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadSpinner } from '../../store/actions/todo.actions';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store.dispatch(loadSpinner());
    return next.handle(request);
  }
}
