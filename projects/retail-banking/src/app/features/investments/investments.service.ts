import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Holding, HoldingPage } from './investments.model';

const BASE = '/api/investments';

@Injectable()
export class InvestmentsService {
  private cached$: Observable<HoldingPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<HoldingPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<HoldingPage>(BASE, { params });
  }

  first(): Observable<HoldingPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Holding> {
    return this.http.get<Holding>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Holding>): Observable<Holding> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Holding>(BASE + '/' + payload.id, payload)
      : this.http.post<Holding>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
