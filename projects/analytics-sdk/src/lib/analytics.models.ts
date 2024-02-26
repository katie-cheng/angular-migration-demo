export type AnalyticsEventName =
  | 'page_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'form_error'
  | 'transfer_initiated'
  | 'transfer_confirmed'
  | 'payment_scheduled'
  | 'card_locked'
  | 'dispute_opened'
  | 'session_established'
  | 'session_ended'
  | 'mfa_prompted'
  | 'mfa_satisfied'
  | 'feature_flag_exposed';

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  /** Milliseconds since epoch, stamped when the event is queued. */
  at: number;
  correlationId: string;
  sessionId: string | null;
  properties: Record<string, string | number | boolean | null>;
}

export interface AnalyticsBatch {
  sentAt: number;
  events: AnalyticsEvent[];
  client: { name: string; version: string };
}

export interface ConsentState {
  analytics: boolean;
  personalisation: boolean;
  updatedAt: number;
}
