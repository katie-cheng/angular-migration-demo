import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Dispute } from '../../disputes.model';
import { DisputesService } from '../../disputes.service';

@Component({
  selector: 'bk-disputes-detail',
  templateUrl: './disputes-detail.component.html',
  styleUrls: ['./disputes-detail.component.scss'],
})
export class DisputesDetailComponent implements OnInit, OnDestroy {
  dispute: Dispute | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Disputes', route: '/disputes' },
    { label: 'Detail', route: '/disputes' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: DisputesService,
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
          this.dispute = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That dispute could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/disputes']);
  }

  edit(): void {
    this.router.navigate(['/disputes', this.dispute?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove dispute?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.dispute) {
          this.service.remove(this.dispute.id).subscribe(() => this.back());
        }
      });
  }
}
