import { APP_INITIALIZER, Provider } from '@angular/core';

import { AuthService } from './auth.service';
import { SessionStore } from './session-store.service';

/**
 * Bootstrap must not race the first authenticated request, so the app waits
 * for a stored session to be validated (or discarded) before rendering.
 */
export function sessionInitializerFactory(auth: AuthService, store: SessionStore) {
  return () =>
    auth.resumeSession().then((session) => {
      if (!session) {
        store.clear(false);
      }
      return session;
    });
}

export const SESSION_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: sessionInitializerFactory,
  deps: [AuthService, SessionStore],
  multi: true,
};
