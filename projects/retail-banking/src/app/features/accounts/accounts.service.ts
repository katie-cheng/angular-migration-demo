import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Account, AccountPage } from './accounts.model';

const BASE = '/api/accounts';

@Injectable()
export class AccountsService {
  private cached$: Observable<AccountPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<AccountPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<AccountPage>(BASE, { params });
  }

  first(): Observable<AccountPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Account> {
    return this.http.get<Account>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Account>): Observable<Account> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Account>(BASE + '/' + payload.id, payload)
      : this.http.post<Account>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
