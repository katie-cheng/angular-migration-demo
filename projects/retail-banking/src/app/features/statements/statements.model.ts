export interface Statement {
  id: string;
  period: string;
  issuedOn: string;
  format: string;
}

export interface StatementPage {
  items: Statement[];
  total: number;
  page: number;
  pageSize: number;
}
