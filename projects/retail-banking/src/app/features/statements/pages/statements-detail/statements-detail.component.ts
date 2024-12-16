import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Statement } from '../../statements.model';
import { StatementsService } from '../../statements.service';

@Component({
  selector: 'bk-statements-detail',
  templateUrl: './statements-detail.component.html',
  styleUrls: ['./statements-detail.component.scss'],
})
export class StatementsDetailComponent implements OnInit, OnDestroy {
  statement: Statement | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Statements', route: '/statements' },
    { label: 'Detail', route: '/statements' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: StatementsService,
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
          this.statement = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That statement could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/statements']);
  }
}
