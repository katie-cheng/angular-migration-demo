import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AUTH_CONFIG, AuthConfig } from './auth.config';
import { ensureCorrelationId } from './correlation';
import {
  LoginRequest,
  LoginResponse,
  MfaVerifyRequest,
  Session,
  UserProfile,
} from './auth.models';
import { SessionStore } from './session-store.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: SessionStore,
    @Inject(AUTH_CONFIG) private readonly config: AuthConfig
  ) {}

  get session(): Session | null {
    return this.store.snapshot;
  }

  isAuthenticated(): boolean {
    const session = this.store.snapshot;
    return !!session && session.tokens.expiresAt > Date.now();
  }

  hasEntitlement(entitlement: string): boolean {
    const session = this.store.snapshot;
    return !!session && session.profile.entitlements.indexOf(entitlement) !== -1;
  }

  /**
   * Exchanges credentials for a session and pins the correlation id that the
   * rest of the stack uses to stitch the journey together.
   *
   * Callers await this during bootstrap, so it is a promise rather than an
   * observable.
   */
  establishSession(request: LoginRequest): Promise<Session> {
    const correlationId = ensureCorrelationId(this.config.correlationCookieName);

    const response$ = this.http
      .post<LoginResponse>(this.config.issuer + '/login', {
        ...request,
        clientId: this.config.clientId,
        correlationId,
      })
      .pipe(
        map((response) => {
          const session: Session = {
            tokens: response.tokens,
            profile: response.profile,
            correlationId,
            mfaSatisfied: !response.mfaRequired,
          };
          this.store.set(session);
          return session;
        })
      );

    return firstValueFrom(response$);
  }

  /** Restores a session on cold boot; resolves to null when there is none. */
  resumeSession(): Promise<Session | null> {
    const existing = this.store.snapshot;
    if (existing && existing.tokens.expiresAt > Date.now()) {
      return Promise.resolve(existing);
    }
    if (!existing) {
      return Promise.resolve(null);
    }
    return firstValueFrom(this.refresh().pipe(catchError(() => of(null))), {
      defaultValue: null,
    });
  }

  refresh(): Observable<Session | null> {
    const existing = this.store.snapshot;
    if (!existing) {
      return throwError(() => new Error('No session to refresh'));
    }

    return this.http
      .post<{ tokens: LoginResponse['tokens'] }>(this.config.issuer + '/refresh', {
        refreshToken: existing.tokens.refreshToken,
        clientId: this.config.clientId,
      })
      .pipe(
        map((response) => {
          const next: Session = { ...existing, tokens: response.tokens };
          this.store.update(next);
          return next;
        })
      );
  }

  completeMfa(request: MfaVerifyRequest): Promise<Session> {
    const mfa$ = this.http
      .post<{ tokens: LoginResponse['tokens'] }>(this.config.issuer + '/mfa/verify', request)
      .pipe(
        map((response) => {
          const existing = this.store.snapshot;
          if (!existing) {
            throw new Error('MFA completed without an active session');
          }
          const next: Session = { ...existing, tokens: response.tokens, mfaSatisfied: true };
          this.store.update(next);
          return next;
        })
      );

    return firstValueFrom(mfa$);
  }

  loadProfile(): Promise<UserProfile | undefined> {
    return firstValueFrom(this.http.get<UserProfile>(this.config.issuer + '/profile'), {
      defaultValue: undefined,
    });
  }

  logout(): Promise<void> {
    const logout$ = this.http
      .post<void>(this.config.issuer + '/logout', {})
      .pipe(
        catchError(() => of(void 0)),
        tap(() => this.store.clear())
      );

    return firstValueFrom(logout$, { defaultValue: undefined });
  }
}
