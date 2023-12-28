import { InjectionToken } from '@angular/core';

export interface AuthConfig {
  /** Base URL of the identity service. */
  issuer: string;
  /** Base URL that the interceptor is allowed to attach bearer tokens to. */
  apiBase: string;
  clientId: string;
  /** Refresh this many milliseconds before the access token expires. */
  refreshSkewMs: number;
  /** Name of the cookie the edge uses to stitch together request traces. */
  correlationCookieName: string;
  /** BroadcastChannel name used to keep tabs on the same session. */
  crossTabChannel: string;
  storageKey: string;
}

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

export const DEFAULT_AUTH_CONFIG: AuthConfig = {
  issuer: '/api/identity',
  apiBase: '/api',
  clientId: 'northwind-retail-web',
  refreshSkewMs: 60_000,
  correlationCookieName: 'nw_corr',
  crossTabChannel: 'northwind-auth',
  storageKey: 'nw.session',
};
