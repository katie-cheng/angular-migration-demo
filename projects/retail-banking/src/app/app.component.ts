import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnalyticsService, RouteAnalytics } from 'analytics-sdk';
import { AuthService, SessionStore } from 'auth';

@Component({
  selector: 'bk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly auth: AuthService,
    private readonly store: SessionStore,
    private readonly analytics: AnalyticsService,
    private readonly routeAnalytics: RouteAnalytics,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.routeAnalytics.start();

    this.store.changes().subscribe((session) => {
      this.analytics.identify(
        session ? session.correlationId : 'anonymous',
        session ? session.profile.id : null
      );
    });

    this.store.events().subscribe((event) => {
      if (event.kind === 'session-established') {
        this.analytics.track('session_established', { correlationId: event.correlationId });
      }
      if (event.kind === 'session-ended') {
        this.analytics.track('session_ended', { correlationId: event.correlationId });
        this.analytics.flush();
        if (!this.router.url.startsWith('/login')) {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
