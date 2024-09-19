export interface Loan {
  id: string;
  product: string;
  outstanding: number;
  rate: number;
  nextPaymentOn: string;
}

export interface LoanPage {
  items: Loan[];
  total: number;
  page: number;
  pageSize: number;
}
