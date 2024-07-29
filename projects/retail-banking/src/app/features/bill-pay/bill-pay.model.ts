export type BillStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Bill {
  id: string;
  biller: string;
  accountRef: string;
  amount: number;
  dueOn: string;
  status: BillStatus;
}

export interface BillPage {
  items: Bill[];
  total: number;
  page: number;
  pageSize: number;
}
