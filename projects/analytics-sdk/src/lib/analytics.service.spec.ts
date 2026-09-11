import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ANALYTICS_CONFIG, DEFAULT_ANALYTICS_CONFIG } from './analytics.config';
import { AnalyticsBatch } from './analytics.models';
import { AnalyticsService } from './analytics.service';
import { ConsentService } from './consent.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let http: HttpTestingController;
  let consent: ConsentService;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        { provide: ANALYTICS_CONFIG, useValue: { ...DEFAULT_ANALYTICS_CONFIG, batchSize: 3 } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
});
    service = TestBed.inject(AnalyticsService);
    http = TestBed.inject(HttpTestingController);
    consent = TestBed.inject(ConsentService);
    consent.grant({ analytics: true });
  });

  afterEach(() => {
    http.verify();
    window.localStorage.clear();
  });

  it('drops events until analytics consent is granted', () => {
    consent.revokeAll();
    service.track('cta_click', { id: 'open-account' });
    service.flush();

    http.expectNone(DEFAULT_ANALYTICS_CONFIG.collectorUrl);
  });

  it('flushes once the batch size is reached', () => {
    service.track('cta_click', { id: 'a' });
    service.track('cta_click', { id: 'b' });
    service.track('cta_click', { id: 'c' });

    const request = http.expectOne(DEFAULT_ANALYTICS_CONFIG.collectorUrl);
    const batch = request.request.body as AnalyticsBatch;
    expect(batch.events.length).toBe(3);
    request.flush({});
  });

  it('stamps the correlation and session identifiers on every event', () => {
    service.identify('c-42', 's-7');
    service.track('transfer_initiated', { amount: 25 });
    service.flush();

    const request = http.expectOne(DEFAULT_ANALYTICS_CONFIG.collectorUrl);
    const batch = request.request.body as AnalyticsBatch;
    expect(batch.events[0].correlationId).toBe('c-42');
    expect(batch.events[0].sessionId).toBe('s-7');
    request.flush({});
  });

  it('does not send an empty batch', () => {
    service.flush();
    http.expectNone(DEFAULT_ANALYTICS_CONFIG.collectorUrl);
  });

  it('swallows collector failures', () => {
    service.track('page_view', { path: '/accounts' });
    service.flush();

    http
      .expectOne(DEFAULT_ANALYTICS_CONFIG.collectorUrl)
      .flush(null, { status: 503, statusText: 'Service Unavailable' });

    expect(() => service.flush()).not.toThrow();
  });
});
