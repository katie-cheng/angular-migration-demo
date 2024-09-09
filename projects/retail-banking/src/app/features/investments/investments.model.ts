export interface Holding {
  id: string;
  symbol: string;
  units: number;
  marketValue: number;
  gainLoss: number;
}

export interface HoldingPage {
  items: Holding[];
  total: number;
  page: number;
  pageSize: number;
}
