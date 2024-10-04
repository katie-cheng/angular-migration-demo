import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Mortgage } from '../../mortgage.model';
import { MortgageService } from '../../mortgage.service';

@Component({
  selector: 'bk-mortgage-detail',
  templateUrl: './mortgage-detail.component.html',
  styleUrls: ['./mortgage-detail.component.scss'],
})
export class MortgageDetailComponent implements OnInit, OnDestroy {
  mortgage: Mortgage | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Mortgage', route: '/mortgage' },
    { label: 'Detail', route: '/mortgage' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: MortgageService,
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
          this.mortgage = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That mortgage could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/mortgage']);
  }
}
