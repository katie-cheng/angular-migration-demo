import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.check(state.url);
  }

  canLoad(_route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.check('/' + segments.map((segment) => segment.path).join('/'));
  }

  private check(returnUrl: string): boolean | UrlTree {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl } });
  }
}

@Injectable({ providedIn: 'root' })
export class EntitlementGuard  {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const required = (route.data && (route.data['entitlement'] as string)) || null;
    if (!required || this.auth.hasEntitlement(required)) {
      return true;
    }
    return this.router.createUrlTree(['/not-entitled'], { queryParams: { need: required } });
  }
}

@Injectable({ providedIn: 'root' })
export class MfaGuard  {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const session = this.auth.session;
    if (session && session.mfaSatisfied) {
      return true;
    }
    return this.router.createUrlTree(['/step-up'], { queryParams: { returnUrl: state.url } });
  }
}
