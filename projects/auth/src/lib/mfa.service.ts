import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap, takeWhile } from 'rxjs/operators';

import { AUTH_CONFIG, AuthConfig } from './auth.config';
import { MfaChannel } from './auth.models';

export interface MfaChallenge {
  transactionId: string;
  channels: MfaChannel[];
  expiresAt: number;
}

export type PushStatus = 'pending' | 'approved' | 'denied' | 'expired';

@Injectable({ providedIn: 'root' })
export class MfaService {
  constructor(
    private readonly http: HttpClient,
    @Inject(AUTH_CONFIG) private readonly config: AuthConfig
  ) {}

  start(channelId: string): Observable<MfaChallenge> {
    return this.http.post<MfaChallenge>(this.config.issuer + '/mfa/start', { channelId });
  }

  resend(transactionId: string): Observable<MfaChallenge> {
    return this.http.post<MfaChallenge>(this.config.issuer + '/mfa/resend', { transactionId });
  }

  /** Polls a push approval until it leaves the pending state. */
  watchPush(transactionId: string, intervalMs = 2000): Observable<PushStatus> {
    return timer(0, intervalMs).pipe(
      switchMap(() =>
        this.http.get<{ status: PushStatus }>(
          this.config.issuer + '/mfa/push/' + transactionId
        )
      ),
      map((response) => response.status),
      takeWhile((status) => status === 'pending', true)
    );
  }
}
