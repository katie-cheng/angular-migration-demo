import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Reward, RewardPage } from './rewards.model';

const BASE = '/api/rewards';

@Injectable()
export class RewardsService {
  private cached$: Observable<RewardPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<RewardPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<RewardPage>(BASE, { params });
  }

  first(): Observable<RewardPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Reward> {
    return this.http.get<Reward>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Reward>): Observable<Reward> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Reward>(BASE + '/' + payload.id, payload)
      : this.http.post<Reward>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
