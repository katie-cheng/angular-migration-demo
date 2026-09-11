import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AUTH_CONFIG, AuthConfig } from './auth.config';
import { Session, SessionEvent } from './auth.models';

/**
 * Holds the active session and mirrors it to every other tab.
 *
 * Cross-tab propagation matters for logout: a customer signing out in one
 * tab must not leave an authenticated tab behind on a shared machine.
 */
@Injectable({ providedIn: 'root' })
export class SessionStore implements OnDestroy {
  private readonly session$ = new BehaviorSubject<Session | null>(null);
  private readonly events$ = new Subject<SessionEvent>();
  private channel: BroadcastChannel | null = null;

  constructor(@Inject(AUTH_CONFIG) private readonly config: AuthConfig) {
    this.restore();
    this.connectChannel();
  }

  get snapshot(): Session | null {
    return this.session$.value;
  }

  changes(): Observable<Session | null> {
    return this.session$.asObservable();
  }

  events(): Observable<SessionEvent> {
    return this.events$.asObservable();
  }

  set(session: Session, broadcast = true): void {
    this.session$.next(session);
    this.persist(session);
    this.emit('session-established', session.correlationId);
    if (broadcast) {
      this.post({ type: 'set', session });
    }
  }

  update(session: Session, broadcast = true): void {
    this.session$.next(session);
    this.persist(session);
    this.emit('session-refreshed', session.correlationId);
    if (broadcast) {
      this.post({ type: 'set', session });
    }
  }

  clear(broadcast = true): void {
    const previous = this.session$.value;
    this.session$.next(null);
    window.localStorage.removeItem(this.config.storageKey);
    this.emit('session-ended', previous ? previous.correlationId : 'unknown');
    if (broadcast) {
      this.post({ type: 'clear' });
    }
  }

  ngOnDestroy(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
  }

  private connectChannel(): void {
    if (typeof BroadcastChannel === 'undefined') {
      return;
    }
    this.channel = new BroadcastChannel(this.config.crossTabChannel);
    this.channel.onmessage = (event: MessageEvent) => {
      const data = event.data as { type: string; session?: Session };
      if (data.type === 'clear') {
        this.clear(false);
      } else if (data.type === 'set' && data.session) {
        this.session$.next(data.session);
        this.persist(data.session);
      }
    };
  }

  private post(message: { type: string; session?: Session }): void {
    if (this.channel) {
      this.channel.postMessage(message);
    }
  }

  private persist(session: Session): void {
    window.localStorage.setItem(this.config.storageKey, JSON.stringify(session));
  }

  private restore(): void {
    const raw = window.localStorage.getItem(this.config.storageKey);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Session;
      const usable =
        !!parsed &&
        !!parsed.tokens &&
        (parsed.tokens.expiresAt > Date.now() || !!parsed.tokens.refreshToken);
      if (usable) {
        this.session$.next(parsed);
      } else {
        window.localStorage.removeItem(this.config.storageKey);
      }
    } catch {
      window.localStorage.removeItem(this.config.storageKey);
    }
  }

  private emit(kind: SessionEvent['kind'], correlationId: string): void {
    this.events$.next({ kind, at: Date.now(), correlationId });
  }
}
