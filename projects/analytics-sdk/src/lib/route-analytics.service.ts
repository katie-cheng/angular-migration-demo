import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AnalyticsService } from './analytics.service';

/** Emits a page_view for every completed navigation. */
@Injectable({ providedIn: 'root' })
export class RouteAnalytics {
  private subscription: Subscription | null = null;

  constructor(private readonly router: Router, private readonly analytics: AnalyticsService) {}

  start(): void {
    if (this.subscription) {
      return;
    }
    this.subscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.analytics.pageView(event.urlAfterRedirects, document.title);
      });
  }

  stop(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
