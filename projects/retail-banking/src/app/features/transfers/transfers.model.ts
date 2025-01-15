export type TransferStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Transfer {
  id: string;
  reference: string;
  amount: number;
  scheduledFor: string;
  status: TransferStatus;
}

export interface TransferPage {
  items: Transfer[];
  total: number;
  page: number;
  pageSize: number;
}
