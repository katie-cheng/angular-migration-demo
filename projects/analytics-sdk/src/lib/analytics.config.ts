import { InjectionToken } from '@angular/core';

export interface AnalyticsConfig {
  collectorUrl: string;
  clientName: string;
  clientVersion: string;
  /** Events are flushed once this many are queued. */
  batchSize: number;
  /** ...or once this many milliseconds have passed, whichever comes first. */
  flushIntervalMs: number;
  /** Drop the oldest events rather than growing without bound. */
  maxQueueSize: number;
  debug: boolean;
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG');

export const DEFAULT_ANALYTICS_CONFIG: AnalyticsConfig = {
  collectorUrl: '/api/telemetry/events',
  clientName: 'northwind-retail-web',
  clientVersion: '0.0.0',
  batchSize: 20,
  flushIntervalMs: 10_000,
  maxQueueSize: 200,
  debug: false,
};
