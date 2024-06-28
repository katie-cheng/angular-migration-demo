export type AccountStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Account {
  id: string;
  nickname: string;
  maskedNumber: string;
  availableBalance: number;
  currentBalance: number;
  status: AccountStatus;
}

export interface AccountPage {
  items: Account[];
  total: number;
  page: number;
  pageSize: number;
}
