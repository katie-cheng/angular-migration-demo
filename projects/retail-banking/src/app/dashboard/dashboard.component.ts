import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { AnalyticsService } from 'analytics-sdk';
import { AuthService } from 'auth';
import { Account, BankingFacade, Transaction } from 'data-providers';

@Component({
  selector: 'bk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  accounts: Account[] = [];
  recent: Transaction[] = [];
  totalAvailable = 0;
  loading = true;
  error: string | null = null;

  /** Two columns on desktop, one on anything narrower. */
  columns = 2;

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly facade: BankingFacade,
    private readonly auth: AuthService,
    private readonly analytics: AnalyticsService,
    private readonly media: MediaObserver
  ) {}

  get greeting(): string {
    const name = this.auth.session?.profile.displayName?.split(' ')[0] || 'there';
    const hour = new Date().getHours();
    const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return part + ', ' + name;
  }

  ngOnInit(): void {
    this.media
      .asObservable()
      .pipe(
        map((changes) => changes.some((change) => change.mqAlias === 'xs' || change.mqAlias === 'sm')),
        takeUntil(this.destroyed$)
      )
      .subscribe((isNarrow) => (this.columns = isNarrow ? 1 : 2));

    combineLatest([this.facade.openAccounts(), this.facade.totalAvailable('GBP')])
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: ([accounts, total]) => {
          this.accounts = accounts;
          this.totalAvailable = total;
          this.loading = false;
          this.loadRecent(accounts);
        },
        error: () => {
          this.error = 'We could not load your dashboard.';
          this.loading = false;
        },
      });

    this.analytics.pageView('/dashboard', 'Dashboard');
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadRecent(accounts: Account[]): void {
    const primary = accounts.find((account) => account.kind === 'checking') || accounts[0];
    if (!primary) {
      return;
    }
    this.facade
      .transactions({ accountId: primary.id, pageSize: 8 })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((page) => (this.recent = page.items));
  }
}
