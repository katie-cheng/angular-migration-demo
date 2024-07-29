import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Bill, BillPage } from './bill-pay.model';

const BASE = '/api/bill-pay';

@Injectable()
export class BillPayService {
  private cached$: Observable<BillPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<BillPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<BillPage>(BASE, { params });
  }

  first(): Observable<BillPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Bill> {
    return this.http.get<Bill>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Bill>): Observable<Bill> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Bill>(BASE + '/' + payload.id, payload)
      : this.http.post<Bill>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
