export interface Mortgage {
  id: string;
  property: string;
  outstanding: number;
  rate: number;
  termEndsOn: string;
}

export interface MortgagePage {
  items: Mortgage[];
  total: number;
  page: number;
  pageSize: number;
}
