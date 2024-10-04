import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Mortgage, MortgagePage } from './mortgage.model';

const BASE = '/api/mortgage';

@Injectable()
export class MortgageService {
  private cached$: Observable<MortgagePage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<MortgagePage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<MortgagePage>(BASE, { params });
  }

  first(): Observable<MortgagePage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Mortgage> {
    return this.http.get<Mortgage>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Mortgage>): Observable<Mortgage> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Mortgage>(BASE + '/' + payload.id, payload)
      : this.http.post<Mortgage>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
