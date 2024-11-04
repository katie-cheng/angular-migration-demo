export type PaymentStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Payment {
  id: string;
  recipient: string;
  handle: string;
  amount: number;
  status: PaymentStatus;
}

export interface PaymentPage {
  items: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
