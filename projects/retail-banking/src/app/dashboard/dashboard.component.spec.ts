import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { AnalyticsService } from 'analytics-sdk';
import { AuthService } from 'auth';
import { BankingFacade } from 'data-providers';

import { NARROW } from '../core/breakpoints';

import { DashboardComponent } from './dashboard.component';

const ACCOUNTS = [
  {
    id: 'acc-1',
    kind: 'checking',
    nickname: 'Everyday Current',
    maskedNumber: '••••4417',
    sortCode: '04-00-12',
    currency: 'GBP',
    availableBalance: 2483.19,
    currentBalance: 2483.19,
    status: 'open',
  },
];

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let facade: jasmine.SpyObj<BankingFacade>;
  let breakpoints: { observe: jasmine.Spy };

  beforeEach(async () => {
    breakpoints = { observe: jasmine.createSpy('observe').and.returnValue(of({ matches: false, breakpoints: {} })) };
    facade = jasmine.createSpyObj<BankingFacade>('BankingFacade', [
      'accounts',
      'openAccounts',
      'totalAvailable',
      'transactions',
    ]);
    facade.accounts.and.returnValue(of(ACCOUNTS as never));
    facade.openAccounts.and.returnValue(of(ACCOUNTS as never));
    facade.totalAvailable.and.returnValue(of(2483.19));
    facade.transactions.and.returnValue(of({ items: [], page: 1, pageSize: 8, total: 0 } as never));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [
        { provide: BankingFacade, useValue: facade },
        { provide: AuthService, useValue: { session: { profile: { displayName: 'Dana Whitfield' } } } },
        { provide: AnalyticsService, useValue: jasmine.createSpyObj('AnalyticsService', ['pageView']) },
        { provide: BreakpointObserver, useValue: breakpoints },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
  });

  it('greets the customer by first name', () => {
    expect(fixture.componentInstance.greeting).toContain('Dana');
  });

  it('loads accounts and the available total', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.accounts.length).toBe(1);
    expect(fixture.componentInstance.totalAvailable).toBe(2483.19);
  });

  it('uses two columns on a wide viewport', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.columns).toBe(2);
  });

  it('watches the narrow breakpoint and drops to one column when it matches', () => {
    breakpoints.observe.and.returnValue(of({ matches: true, breakpoints: {} }));

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    expect(breakpoints.observe).toHaveBeenCalledWith(NARROW);
    expect(fixture.componentInstance.columns).toBe(1);
  });

  // FIXME(NWR-2231): started failing when the tile grid moved to fxFlex.
  // Left red on purpose so it is not forgotten again.
  it('renders one tile per account', () => {
    fixture.detectChanges();
    const tiles = fixture.nativeElement.querySelectorAll('.dashboard__tile');
    expect(tiles.length).toBe(ACCOUNTS.length);
  });

  // FIXME(NWR-2402): flaky since the analytics flush moved onto a timer.
  it('reports the page view once settled', fakeAsync(() => {
    fixture.detectChanges();
    tick(250);
    const analytics = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
    expect(analytics.pageView).toHaveBeenCalledTimes(2);
  }));
});
