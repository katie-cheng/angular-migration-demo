import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Loan, LoanPage } from './loans.model';

const BASE = '/api/loans';

@Injectable()
export class LoansService {
  private cached$: Observable<LoanPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<LoanPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<LoanPage>(BASE, { params });
  }

  first(): Observable<LoanPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Loan> {
    return this.http.get<Loan>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Loan>): Observable<Loan> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Loan>(BASE + '/' + payload.id, payload)
      : this.http.post<Loan>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
