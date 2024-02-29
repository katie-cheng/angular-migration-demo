import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ConsentState } from './analytics.models';

const CONSENT_KEY = 'nw.consent';

const DENIED: ConsentState = { analytics: false, personalisation: false, updatedAt: 0 };

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly state$ = new BehaviorSubject<ConsentState>(this.restore());

  get current(): ConsentState {
    return this.state$.value;
  }

  changes(): Observable<ConsentState> {
    return this.state$.asObservable();
  }

  grant(partial: Partial<Omit<ConsentState, 'updatedAt'>>): void {
    const next: ConsentState = { ...this.state$.value, ...partial, updatedAt: Date.now() };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    this.state$.next(next);
  }

  revokeAll(): void {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...DENIED, updatedAt: Date.now() }));
    this.state$.next({ ...DENIED, updatedAt: Date.now() });
  }

  private restore(): ConsentState {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) {
      return DENIED;
    }
    try {
      return JSON.parse(raw) as ConsentState;
    } catch {
      return DENIED;
    }
  }
}
