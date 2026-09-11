import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AUTH_CONFIG, AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { ensureCorrelationId } from './correlation';
import { SessionStore } from './session-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshing = false;
  private readonly refreshed$ = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly auth: AuthService,
    private readonly store: SessionStore,
    @Inject(AUTH_CONFIG) private readonly config: AuthConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(this.config.apiBase)) {
      return next.handle(request);
    }

    const correlationId = ensureCorrelationId(this.config.correlationCookieName);
    const authorized = this.decorate(request, correlationId);

    return next.handle(authorized).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && this.store.snapshot) {
          return this.retryAfterRefresh(request, next, correlationId);
        }
        return throwError(() => error);
      })
    );
  }

  private decorate(request: HttpRequest<unknown>, correlationId: string): HttpRequest<unknown> {
    const session = this.store.snapshot;
    const headers: Record<string, string> = { 'X-Correlation-Id': correlationId };
    if (session) {
      headers['Authorization'] = 'Bearer ' + session.tokens.accessToken;
      headers['X-Customer-Segment'] = session.profile.segment;
    }
    return request.clone({ setHeaders: headers });
  }

  private retryAfterRefresh(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    correlationId: string
  ): Observable<HttpEvent<unknown>> {
    if (this.refreshing) {
      return this.refreshed$.pipe(
        filter((token): token is string => token !== null),
        take(1),
        switchMap(() => next.handle(this.decorate(request, correlationId)))
      );
    }

    this.refreshing = true;
    this.refreshed$.next(null);

    return this.auth.refresh().pipe(
      switchMap((session) => {
        this.refreshing = false;
        this.refreshed$.next(session ? session.tokens.accessToken : null);
        return next.handle(this.decorate(request, correlationId));
      }),
      catchError((error: unknown) => {
        this.refreshing = false;
        this.store.clear();
        return throwError(() => error);
      })
    );
  }
}
