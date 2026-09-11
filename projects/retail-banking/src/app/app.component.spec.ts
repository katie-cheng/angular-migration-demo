import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnalyticsService, RouteAnalytics } from 'analytics-sdk';
import { AuthService, SessionStore } from 'auth';

import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
  let analytics: jasmine.SpyObj<AnalyticsService>;
  let routeAnalytics: jasmine.SpyObj<RouteAnalytics>;

  beforeEach(async () => {
    analytics = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', ['identify', 'track', 'pageView', 'flush']);
    routeAnalytics = jasmine.createSpyObj<RouteAnalytics>('RouteAnalytics', ['start']);

    await TestBed.configureTestingModule({
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [
        { provide: AnalyticsService, useValue: analytics },
        { provide: RouteAnalytics, useValue: routeAnalytics },
        { provide: AuthService, useValue: { session: null } },
        {
            provide: SessionStore,
            useValue: { changes: () => of(null), events: () => of() },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
  });

  it('creates the application', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts route analytics on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(routeAnalytics.start).toHaveBeenCalled();
  });
});
