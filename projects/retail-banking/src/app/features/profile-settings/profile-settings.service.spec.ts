import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProfileSettingsService } from './profile-settings.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProfileSettingsService', () => {
  let service: ProfileSettingsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ProfileSettingsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ProfileSettingsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the first page by default', () => {
    service.list().subscribe();

    const request = http.expectOne((req) => req.url === '/api/profile-settings');
    expect(request.request.params.get('page')).toBe('1');
    expect(request.request.params.get('pageSize')).toBe('25');
    request.flush({ items: [], total: 0, page: 1, pageSize: 25 });
  });

  it('caches the first page', () => {
    service.first().subscribe();
    service.first().subscribe();

    http.expectOne((req) => req.url === '/api/profile-settings').flush({
      items: [],
      total: 0,
      page: 1,
      pageSize: 25,
    });
  });

  it('posts new records and puts existing ones', () => {
    service.save({}).subscribe();
    expect(http.expectOne('/api/profile-settings').request.method).toBe('POST');
    http.verify();

    service.save({ id: 'x-1' } as never).subscribe();
    expect(http.expectOne('/api/profile-settings/x-1').request.method).toBe('PUT');
  });
});
