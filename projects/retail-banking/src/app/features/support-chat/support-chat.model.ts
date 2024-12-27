export type ConversationStatus = 'active' | 'pending' | 'complete' | 'failed';

export interface Conversation {
  id: string;
  subject: string;
  lastMessageOn: string;
  status: ConversationStatus;
}

export interface ConversationPage {
  items: Conversation[];
  total: number;
  page: number;
  pageSize: number;
}
