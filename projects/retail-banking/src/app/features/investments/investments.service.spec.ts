import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InvestmentsService } from './investments.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InvestmentsService', () => {
  let service: InvestmentsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [InvestmentsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(InvestmentsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the first page by default', () => {
    service.list().subscribe();

    const request = http.expectOne((req) => req.url === '/api/investments');
    expect(request.request.params.get('page')).toBe('1');
    expect(request.request.params.get('pageSize')).toBe('25');
    request.flush({ items: [], total: 0, page: 1, pageSize: 25 });
  });

  it('caches the first page', () => {
    service.first().subscribe();
    service.first().subscribe();

    http.expectOne((req) => req.url === '/api/investments').flush({
      items: [],
      total: 0,
      page: 1,
      pageSize: 25,
    });
  });

  it('posts new records and puts existing ones', () => {
    service.save({}).subscribe();
    expect(http.expectOne('/api/investments').request.method).toBe('POST');
    http.verify();

    service.save({ id: 'x-1' } as never).subscribe();
    expect(http.expectOne('/api/investments/x-1').request.method).toBe('PUT');
  });
});
