import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'ui-kit';

import { Application } from '../../onboarding.model';
import { OnboardingService } from '../../onboarding.service';

@Component({
  selector: 'bk-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.scss'],
})
export class OnboardingFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editing = false;
  saving = false;

  private id: string | null = null;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: OnboardingService,
    private readonly notifications: NotificationService
  ) {
    this.form = this.fb.group({
      product: ['', [Validators.required]],
      stage: ['', [Validators.required]],
      startedOn: ['', []],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.editing = true;
      this.id = id;
      this.service
        .get(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((entity) => this.form.patchValue(entity as unknown as Record<string, unknown>));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload = { ...this.form.value, id: this.id || undefined } as Partial<Application>;
    this.service
      .save(payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (saved) => {
          this.saving = false;
          this.notifications.success('Application saved');
          this.router.navigate(['/onboarding', saved.id]);
        },
        error: () => {
          this.saving = false;
          this.notifications.error('We could not save that application.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/onboarding']);
  }
}
