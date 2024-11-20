import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'ui-kit';

import { Preference } from '../../profile-settings.model';
import { ProfileSettingsService } from '../../profile-settings.service';

@Component({
  selector: 'bk-profile-settings-form',
  templateUrl: './profile-settings-form.component.html',
  styleUrls: ['./profile-settings-form.component.scss'],
})
export class ProfileSettingsFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editing = false;
  saving = false;

  private id: string | null = null;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: ProfileSettingsService,
    private readonly notifications: NotificationService
  ) {
    this.form = this.fb.group({
      label: ['', [Validators.required]],
      value: ['', [Validators.required]],
      updatedOn: ['', []],
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
    const payload = { ...this.form.value, id: this.id || undefined } as Partial<Preference>;
    this.service
      .save(payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (saved) => {
          this.saving = false;
          this.notifications.success('Preference saved');
          this.router.navigate(['/profile-settings', saved.id]);
        },
        error: () => {
          this.saving = false;
          this.notifications.error('We could not save that preference.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/profile-settings']);
  }
}
