export type ApplicationStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Application {
  id: string;
  product: string;
  stage: string;
  startedOn: string;
  status: ApplicationStatus;
}

export interface ApplicationPage {
  items: Application[];
  total: number;
  page: number;
  pageSize: number;
}
