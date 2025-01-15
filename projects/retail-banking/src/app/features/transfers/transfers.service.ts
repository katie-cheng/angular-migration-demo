import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Transfer, TransferPage } from './transfers.model';

const BASE = '/api/transfers';

@Injectable()
export class TransfersService {
  private cached$: Observable<TransferPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<TransferPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<TransferPage>(BASE, { params });
  }

  first(): Observable<TransferPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Transfer> {
    return this.http.get<Transfer>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Transfer>): Observable<Transfer> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Transfer>(BASE + '/' + payload.id, payload)
      : this.http.post<Transfer>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
