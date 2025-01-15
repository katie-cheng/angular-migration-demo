import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Transfer } from '../../transfers.model';
import { TransfersService } from '../../transfers.service';

@Component({
  selector: 'bk-transfers-detail',
  templateUrl: './transfers-detail.component.html',
  styleUrls: ['./transfers-detail.component.scss'],
})
export class TransfersDetailComponent implements OnInit, OnDestroy {
  transfer: Transfer | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Transfers', route: '/transfers' },
    { label: 'Detail', route: '/transfers' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: TransfersService,
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
          this.transfer = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That transfer could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/transfers']);
  }

  edit(): void {
    this.router.navigate(['/transfers', this.transfer?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove transfer?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.transfer) {
          this.service.remove(this.transfer.id).subscribe(() => this.back());
        }
      });
  }
}
