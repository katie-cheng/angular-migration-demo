import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { ANALYTICS_CONFIG, AnalyticsConfig } from './analytics.config';
import { AnalyticsBatch, AnalyticsEvent, AnalyticsEventName } from './analytics.models';
import { ConsentService } from './consent.service';

/**
 * Buffers product analytics and ships them in batches.
 *
 * The collector is fire-and-forget: a failed batch is dropped rather than
 * retried, because duplicated funnel events are worse than missing ones.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService implements OnDestroy {
  private queue: AnalyticsEvent[] = [];
  private correlationId = 'unknown';
  private sessionId: string | null = null;
  private timer: Subscription | null = null;
  private readonly onHidden = () => {
    if (document.visibilityState === 'hidden') {
      this.flush();
    }
  };

  constructor(
    private readonly http: HttpClient,
    private readonly consent: ConsentService,
    private readonly zone: NgZone,
    @Inject(ANALYTICS_CONFIG) private readonly config: AnalyticsConfig
  ) {
    this.startTimer();
    document.addEventListener('visibilitychange', this.onHidden);
  }

  identify(correlationId: string, sessionId: string | null): void {
    this.correlationId = correlationId;
    this.sessionId = sessionId;
  }

  track(name: AnalyticsEventName, properties: AnalyticsEvent['properties'] = {}): void {
    if (!this.consent.current.analytics) {
      return;
    }

    this.queue.push({
      name,
      at: Date.now(),
      correlationId: this.correlationId,
      sessionId: this.sessionId,
      properties,
    });

    if (this.queue.length > this.config.maxQueueSize) {
      this.queue = this.queue.slice(this.queue.length - this.config.maxQueueSize);
    }
    if (this.queue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  pageView(path: string, title: string): void {
    this.track('page_view', { path, title });
  }

  flush(): void {
    if (!this.queue.length) {
      return;
    }
    const batch: AnalyticsBatch = {
      sentAt: Date.now(),
      events: this.queue,
      client: { name: this.config.clientName, version: this.config.clientVersion },
    };
    this.queue = [];

    this.http.post(this.config.collectorUrl, batch).subscribe({
      error: () => {
        if (this.config.debug) {
          console.warn('[analytics] batch dropped', batch.events.length);
        }
      },
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.onHidden);
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = null;
    }
  }

  private startTimer(): void {
    this.zone.runOutsideAngular(() => {
      this.timer = interval(this.config.flushIntervalMs).subscribe(() => this.flush());
    });
  }
}
