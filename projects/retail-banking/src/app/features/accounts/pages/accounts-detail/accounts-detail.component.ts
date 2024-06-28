import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Account } from '../../accounts.model';
import { AccountsService } from '../../accounts.service';

@Component({
  selector: 'bk-accounts-detail',
  templateUrl: './accounts-detail.component.html',
  styleUrls: ['./accounts-detail.component.scss'],
})
export class AccountsDetailComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Accounts', route: '/accounts' },
    { label: 'Detail', route: '/accounts' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: AccountsService,
    private readonly dialogs: DialogService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => this.service.get(params.get('id') || '')),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (result) => {
          this.account = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That account could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/accounts']);
  }
}
