import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Conversation, ConversationPage } from './support-chat.model';

const BASE = '/api/support-chat';

@Injectable()
export class SupportChatService {
  private cached$: Observable<ConversationPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<ConversationPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<ConversationPage>(BASE, { params });
  }

  first(): Observable<ConversationPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Conversation>): Observable<Conversation> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Conversation>(BASE + '/' + payload.id, payload)
      : this.http.post<Conversation>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
