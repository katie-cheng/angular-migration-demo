import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Loan } from '../../loans.model';
import { LoansService } from '../../loans.service';

@Component({
  selector: 'bk-loans-detail',
  templateUrl: './loans-detail.component.html',
  styleUrls: ['./loans-detail.component.scss'],
})
export class LoansDetailComponent implements OnInit, OnDestroy {
  loan: Loan | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Loans', route: '/loans' },
    { label: 'Detail', route: '/loans' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: LoansService,
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
          this.loan = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That loan could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/loans']);
  }
}
