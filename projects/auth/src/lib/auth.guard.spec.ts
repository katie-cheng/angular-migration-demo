import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AUTH_CONFIG, DEFAULT_AUTH_CONFIG } from './auth.config';
import { AuthGuard, EntitlementGuard, MfaGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Session } from './auth.models';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

function session(overrides: Partial<Session> = {}): Session {
  return {
    tokens: { accessToken: 'a', refreshToken: 'r', expiresAt: Date.now() + 600_000 },
    profile: {
      id: 'u-1',
      displayName: 'Dana Whitfield',
      email: 'dana@example.test',
      segment: 'retail',
      entitlements: ['accounts:read'],
    },
    correlationId: 'c-1',
    mfaSatisfied: true,
    ...overrides,
  };
}

describe('auth guards', () => {
  let auth: AuthService;
  let router: Router;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [{ provide: AUTH_CONFIG, useValue: DEFAULT_AUTH_CONFIG }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('redirects anonymous users to login with a return url', () => {
    const guard = TestBed.inject(AuthGuard);
    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      { url: '/accounts' } as RouterStateSnapshot
    );

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toContain('returnUrl=%2Faccounts');
  });

  it('allows authenticated users through', () => {
    spyOn(auth, 'isAuthenticated').and.returnValue(true);
    const guard = TestBed.inject(AuthGuard);

    expect(
      guard.canActivate({} as ActivatedRouteSnapshot, { url: '/accounts' } as RouterStateSnapshot)
    ).toBeTrue();
  });

  it('blocks routes that require a missing entitlement', () => {
    spyOnProperty(auth, 'session', 'get').and.returnValue(session());
    spyOn(auth, 'hasEntitlement').and.returnValue(false);
    const guard = TestBed.inject(EntitlementGuard);

    const result = guard.canActivate({ data: { entitlement: 'wealth:trade' } } as unknown as ActivatedRouteSnapshot);
    expect(result instanceof UrlTree).toBeTrue();
  });

  it('sends users to step-up when mfa is outstanding', () => {
    spyOnProperty(auth, 'session', 'get').and.returnValue(session({ mfaSatisfied: false }));
    const guard = TestBed.inject(MfaGuard);

    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      { url: '/transfers/new' } as RouterStateSnapshot
    );
    expect(router.serializeUrl(result as UrlTree)).toContain('step-up');
  });
});
