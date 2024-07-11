export type AlertStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Alert {
  id: string;
  trigger: string;
  channel: string;
  threshold: number;
  status: AlertStatus;
}

export interface AlertPage {
  items: Alert[];
  total: number;
  page: number;
  pageSize: number;
}
