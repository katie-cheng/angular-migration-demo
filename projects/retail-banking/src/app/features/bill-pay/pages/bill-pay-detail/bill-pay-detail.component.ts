import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Bill } from '../../bill-pay.model';
import { BillPayService } from '../../bill-pay.service';

@Component({
  selector: 'bk-bill-pay-detail',
  templateUrl: './bill-pay-detail.component.html',
  styleUrls: ['./bill-pay-detail.component.scss'],
})
export class BillPayDetailComponent implements OnInit, OnDestroy {
  bill: Bill | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Bill Pay', route: '/bill-pay' },
    { label: 'Detail', route: '/bill-pay' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: BillPayService,
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
          this.bill = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That bill could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/bill-pay']);
  }

  edit(): void {
    this.router.navigate(['/bill-pay', this.bill?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove bill?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.bill) {
          this.service.remove(this.bill.id).subscribe(() => this.back());
        }
      });
  }
}
