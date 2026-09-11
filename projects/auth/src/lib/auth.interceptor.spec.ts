import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AUTH_CONFIG, DEFAULT_AUTH_CONFIG } from './auth.config';
import { AuthInterceptor } from './auth.interceptor';
import { Session } from './auth.models';
import { SessionStore } from './session-store.service';

const activeSession: Session = {
  tokens: { accessToken: 'access-1', refreshToken: 'refresh-1', expiresAt: Date.now() + 600_000 },
  profile: {
    id: 'u-1',
    displayName: 'Dana Whitfield',
    email: 'dana@example.test',
    segment: 'retail',
    entitlements: [],
  },
  correlationId: 'c-1',
  mfaSatisfied: true,
};

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let store: SessionStore;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        { provide: AUTH_CONFIG, useValue: DEFAULT_AUTH_CONFIG },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    store = TestBed.inject(SessionStore);
  });

  afterEach(() => {
    controller.verify();
    window.localStorage.clear();
  });

  it('attaches a bearer token to api requests', () => {
    store.set(activeSession, false);
    http.get('/api/accounts').subscribe();

    const request = controller.expectOne('/api/accounts');
    expect(request.request.headers.get('Authorization')).toBe('Bearer access-1');
  });

  it('leaves non-api requests untouched', () => {
    store.set(activeSession, false);
    http.get('/assets/config.json').subscribe();

    const request = controller.expectOne('/assets/config.json');
    expect(request.request.headers.has('Authorization')).toBeFalse();
  });

  it('refreshes once and replays the failed request', () => {
    store.set(activeSession, false);
    let body: unknown = null;
    http.get('/api/accounts').subscribe((response) => (body = response));

    controller.expectOne('/api/accounts').flush(null, { status: 401, statusText: 'Unauthorized' });
    controller.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/refresh').flush({
      tokens: { accessToken: 'access-2', refreshToken: 'refresh-2', expiresAt: Date.now() + 600_000 },
    });

    const replay = controller.expectOne('/api/accounts');
    expect(replay.request.headers.get('Authorization')).toBe('Bearer access-2');
    replay.flush({ accounts: [] });
    expect(body).toEqual({ accounts: [] });
  });
});
