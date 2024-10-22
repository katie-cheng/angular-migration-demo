import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Application, ApplicationPage } from './onboarding.model';

const BASE = '/api/onboarding';

@Injectable()
export class OnboardingService {
  private cached$: Observable<ApplicationPage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<ApplicationPage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<ApplicationPage>(BASE, { params });
  }

  first(): Observable<ApplicationPage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Application> {
    return this.http.get<Application>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Application>): Observable<Application> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Application>(BASE + '/' + payload.id, payload)
      : this.http.post<Application>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
