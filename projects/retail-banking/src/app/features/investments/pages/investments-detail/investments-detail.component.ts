import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Holding } from '../../investments.model';
import { InvestmentsService } from '../../investments.service';

@Component({
  selector: 'bk-investments-detail',
  templateUrl: './investments-detail.component.html',
  styleUrls: ['./investments-detail.component.scss'],
})
export class InvestmentsDetailComponent implements OnInit, OnDestroy {
  holding: Holding | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Investments', route: '/investments' },
    { label: 'Detail', route: '/investments' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: InvestmentsService,
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
          this.holding = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That holding could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/investments']);
  }
}
