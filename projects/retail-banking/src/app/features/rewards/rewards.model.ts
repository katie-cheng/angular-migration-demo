export interface Reward {
  id: string;
  offer: string;
  merchant: string;
  value: number;
  expiresOn: string;
}

export interface RewardPage {
  items: Reward[];
  total: number;
  page: number;
  pageSize: number;
}
