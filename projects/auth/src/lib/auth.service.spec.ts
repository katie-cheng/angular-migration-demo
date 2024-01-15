import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AUTH_CONFIG, DEFAULT_AUTH_CONFIG } from './auth.config';
import { AuthService } from './auth.service';
import { LoginResponse, Session } from './auth.models';
import { SessionStore } from './session-store.service';

function loginResponse(overrides: Partial<LoginResponse> = {}): LoginResponse {
  return {
    tokens: {
      accessToken: 'access-1',
      refreshToken: 'refresh-1',
      expiresAt: Date.now() + 600_000,
    },
    profile: {
      id: 'u-1',
      displayName: 'Dana Whitfield',
      email: 'dana@example.test',
      segment: 'retail',
      entitlements: ['accounts:read', 'transfers:write'],
    },
    mfaRequired: false,
    ...overrides,
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let store: SessionStore;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AUTH_CONFIG, useValue: DEFAULT_AUTH_CONFIG }],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(SessionStore);
  });

  afterEach(() => {
    http.verify();
    window.localStorage.clear();
  });

  it('establishes a session from credentials', async () => {
    const pending = service.establishSession({
      username: 'dana',
      password: 'hunter2',
      deviceId: 'device-1',
    });

    const request = http.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/login');
    expect(request.request.method).toBe('POST');
    request.flush(loginResponse());

    const session = await pending;
    expect(session.profile.displayName).toBe('Dana Whitfield');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('marks mfa as outstanding when the identity service asks for it', async () => {
    const pending = service.establishSession({
      username: 'dana',
      password: 'hunter2',
      deviceId: 'device-1',
    });
    http.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/login').flush(loginResponse({ mfaRequired: true }));

    const session = await pending;
    expect(session.mfaSatisfied).toBeFalse();
  });

  it('exposes entitlements from the active session', async () => {
    const pending = service.establishSession({
      username: 'dana',
      password: 'hunter2',
      deviceId: 'device-1',
    });
    http.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/login').flush(loginResponse());
    await pending;

    expect(service.hasEntitlement('transfers:write')).toBeTrue();
    expect(service.hasEntitlement('wealth:trade')).toBeFalse();
  });

  it('refreshes an expiring session in place', (done) => {
    const existing: Session = {
      tokens: { accessToken: 'old', refreshToken: 'refresh-1', expiresAt: Date.now() + 1000 },
      profile: loginResponse().profile,
      correlationId: 'c-test',
      mfaSatisfied: true,
    };
    store.set(existing, false);

    service.refresh().subscribe((session) => {
      expect(session!.tokens.accessToken).toBe('access-2');
      expect(session!.profile.id).toBe('u-1');
      done();
    });

    http.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/refresh').flush({
      tokens: { accessToken: 'access-2', refreshToken: 'refresh-2', expiresAt: Date.now() + 600_000 },
    });
  });

  it('clears the session on logout', async () => {
    const pending = service.establishSession({
      username: 'dana',
      password: 'hunter2',
      deviceId: 'device-1',
    });
    http.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/login').flush(loginResponse());
    await pending;

    const loggedOut = service.logout();
    http.expectOne(DEFAULT_AUTH_CONFIG.issuer + '/logout').flush(null);
    await loggedOut;

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('resolves to null when resuming without a stored session', async () => {
    await expectAsync(service.resumeSession()).toBeResolvedTo(null);
  });
});
