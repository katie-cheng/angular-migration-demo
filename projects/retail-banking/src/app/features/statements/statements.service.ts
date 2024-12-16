import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Statement, StatementPage } from './statements.model';

const BASE = '/api/statements';

@Injectable()
export class StatementsService {
  private cached$: Observable<StatementPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<StatementPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<StatementPage>(BASE, { params });
  }

  first(): Observable<StatementPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Statement> {
    return this.http.get<Statement>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Statement>): Observable<Statement> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Statement>(BASE + '/' + payload.id, payload)
      : this.http.post<Statement>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
