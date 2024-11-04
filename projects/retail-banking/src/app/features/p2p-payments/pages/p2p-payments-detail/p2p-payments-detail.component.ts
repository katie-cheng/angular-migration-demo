import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Payment } from '../../p2p-payments.model';
import { P2pPaymentsService } from '../../p2p-payments.service';

@Component({
  selector: 'bk-p2p-payments-detail',
  templateUrl: './p2p-payments-detail.component.html',
  styleUrls: ['./p2p-payments-detail.component.scss'],
})
export class P2pPaymentsDetailComponent implements OnInit, OnDestroy {
  payment: Payment | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'P2p Payments', route: '/p2p-payments' },
    { label: 'Detail', route: '/p2p-payments' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: P2pPaymentsService,
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
          this.payment = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That payment could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/p2p-payments']);
  }

  edit(): void {
    this.router.navigate(['/p2p-payments', this.payment?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove payment?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.payment) {
          this.service.remove(this.payment.id).subscribe(() => this.back());
        }
      });
  }
}
