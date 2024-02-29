import { TestBed } from '@angular/core/testing';

import { ConsentService } from './consent.service';

describe('ConsentService', () => {
  let service: ConsentService;

  beforeEach(() => {
    window.localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsentService);
  });

  afterEach(() => window.localStorage.clear());

  it('denies everything by default', () => {
    expect(service.current.analytics).toBeFalse();
    expect(service.current.personalisation).toBeFalse();
  });

  it('grants a single category without affecting the others', () => {
    service.grant({ analytics: true });

    expect(service.current.analytics).toBeTrue();
    expect(service.current.personalisation).toBeFalse();
  });

  it('revokes everything', () => {
    service.grant({ analytics: true, personalisation: true });
    service.revokeAll();

    expect(service.current.analytics).toBeFalse();
  });

  it('notifies subscribers of changes', () => {
    const seen: boolean[] = [];
    service.changes().subscribe((state) => seen.push(state.analytics));
    service.grant({ analytics: true });

    expect(seen).toEqual([false, true]);
  });
});
