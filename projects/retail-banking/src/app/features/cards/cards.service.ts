import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Card, CardPage } from './cards.model';

const BASE = '/api/cards';

@Injectable()
export class CardsService {
  private cached$: Observable<CardPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<CardPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<CardPage>(BASE, { params });
  }

  first(): Observable<CardPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Card> {
    return this.http.get<Card>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Card>): Observable<Card> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Card>(BASE + '/' + payload.id, payload)
      : this.http.post<Card>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
