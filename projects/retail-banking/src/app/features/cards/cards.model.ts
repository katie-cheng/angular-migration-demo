export type CardStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Card {
  id: string;
  network: string;
  maskedNumber: string;
  expiry: string;
  status: CardStatus;
}

export interface CardPage {
  items: Card[];
  total: number;
  page: number;
  pageSize: number;
}
