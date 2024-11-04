import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Payment, PaymentPage } from './p2p-payments.model';

const BASE = '/api/p2p-payments';

@Injectable()
export class P2pPaymentsService {
  private cached$: Observable<PaymentPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<PaymentPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<PaymentPage>(BASE, { params });
  }

  first(): Observable<PaymentPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Payment> {
    return this.http.get<Payment>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Payment>): Observable<Payment> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Payment>(BASE + '/' + payload.id, payload)
      : this.http.post<Payment>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
