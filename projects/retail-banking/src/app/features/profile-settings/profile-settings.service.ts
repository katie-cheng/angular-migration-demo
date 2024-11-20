import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Preference, PreferencePage } from './profile-settings.model';

const BASE = '/api/profile-settings';

@Injectable()
export class ProfileSettingsService {
  private cached$: Observable<PreferencePage> | null = null;

  constructor(private readonly http: HttpClient) {}

  list(page = 1, pageSize = 25): Observable<PreferencePage> {
    const params = new HttpParams().set('page', String(page)).set('pageSize', String(pageSize));
    return this.http.get<PreferencePage>(BASE, { params });
  }

  first(): Observable<PreferencePage> {
    if (!this.cached$) {
      this.cached$ = this.list().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.cached$;
  }

  get(id: string): Observable<Preference> {
    return this.http.get<Preference>(BASE + '/' + id);
  }

  count(): Observable<number> {
    return this.first().pipe(map((page) => page.total));
  }

  save(payload: Partial<Preference>): Observable<Preference> {
    this.cached$ = null;
    return payload.id
      ? this.http.put<Preference>(BASE + '/' + payload.id, payload)
      : this.http.post<Preference>(BASE, payload);
  }

  remove(id: string): Observable<void> {
    this.cached$ = null;
    return this.http.delete<void>(BASE + '/' + id);
  }
}
