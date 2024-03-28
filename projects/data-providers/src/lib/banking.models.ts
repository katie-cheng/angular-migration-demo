export type AccountKind = 'checking' | 'savings' | 'credit-card' | 'loan' | 'mortgage' | 'brokerage';

export interface Account {
  id: string;
  kind: AccountKind;
  nickname: string;
  maskedNumber: string;
  sortCode: string;
  currency: string;
  availableBalance: number;
  currentBalance: number;
  status: 'open' | 'frozen' | 'closed';
}

export type TransactionStatus = 'pending' | 'posted' | 'declined' | 'returned';

export interface Transaction {
  id: string;
  accountId: string;
  postedAt: string;
  description: string;
  merchantCategory: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  runningBalance: number | null;
}

export interface Payee {
  id: string;
  name: string;
  maskedNumber: string;
  sortCode: string;
  kind: 'internal' | 'domestic' | 'international';
  lastPaidAt: string | null;
}

export interface TransferRequest {
  fromAccountId: string;
  toPayeeId: string;
  amount: number;
  currency: string;
  reference: string;
  scheduledFor: string | null;
}

export interface TransferReceipt {
  id: string;
  status: 'accepted' | 'scheduled' | 'rejected';
  clearedAt: string | null;
  reason: string | null;
}

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface TransactionQuery {
  accountId: string;
  page?: number;
  pageSize?: number;
  from?: string;
  to?: string;
  search?: string;
  status?: TransactionStatus;
}
