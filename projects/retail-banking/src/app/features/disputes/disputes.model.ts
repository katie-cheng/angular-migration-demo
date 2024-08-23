export type DisputeStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Dispute {
  id: string;
  transactionRef: string;
  reason: string;
  amount: number;
  raisedOn: string;
  status: DisputeStatus;
}

export interface DisputePage {
  items: Dispute[];
  total: number;
  page: number;
  pageSize: number;
}
