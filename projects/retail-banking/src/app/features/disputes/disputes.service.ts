import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Dispute, DisputePage } from './disputes.model';

const BASE = '/api/disputes';

@Injectable()
export class DisputesService {
  private cached$: Observable<DisputePage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<DisputePage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<DisputePage>(BASE, { params });
  }

  first(): Observable<DisputePage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Dispute> {
    return this.http.get<Dispute>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Dispute>): Observable<Dispute> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Dispute>(BASE + '/' + payload.id, payload)
      : this.http.post<Dispute>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
