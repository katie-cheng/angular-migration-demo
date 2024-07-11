import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Alert } from '../../alerts.model';
import { AlertsService } from '../../alerts.service';

@Component({
  selector: 'bk-alerts-detail',
  templateUrl: './alerts-detail.component.html',
  styleUrls: ['./alerts-detail.component.scss'],
})
export class AlertsDetailComponent implements OnInit, OnDestroy {
  alert: Alert | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Alerts', route: '/alerts' },
    { label: 'Detail', route: '/alerts' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: AlertsService,
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
          this.alert = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That alert could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/alerts']);
  }

  edit(): void {
    this.router.navigate(['/alerts', this.alert?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove alert?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.alert) {
          this.service.remove(this.alert.id).subscribe(() => this.back());
        }
      });
  }
}
