import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DialogService } from 'ui-kit';

import { Application } from '../../onboarding.model';
import { OnboardingService } from '../../onboarding.service';

@Component({
  selector: 'bk-onboarding-detail',
  templateUrl: './onboarding-detail.component.html',
  styleUrls: ['./onboarding-detail.component.scss'],
})
export class OnboardingDetailComponent implements OnInit, OnDestroy {
  application: Application | null = null;
  loading = false;
  error: string | null = null;
  readonly crumbs = [
    { label: 'Onboarding', route: '/onboarding' },
    { label: 'Detail', route: '/onboarding' },
  ];

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: OnboardingService,
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
          this.application = result;
          this.loading = false;
        },
        error: () => {
          this.error = 'That application could not be loaded.';
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  back(): void {
    this.router.navigate(['/onboarding']);
  }

  edit(): void {
    this.router.navigate(['/onboarding', this.application?.id, 'edit']);
  }

  confirmRemove(): void {
    this.dialogs
      .confirm({ title: 'Remove application?', message: 'This cannot be undone.' })
      .pipe(takeUntil(this.destroyed$))
      .subscribe((confirmed) => {
        if (confirmed && this.application) {
          this.service.remove(this.application.id).subscribe(() => this.back());
        }
      });
  }
}
