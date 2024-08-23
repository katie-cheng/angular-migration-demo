import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'ui-kit';

import { Dispute } from '../../disputes.model';
import { DisputesService } from '../../disputes.service';

@Component({
  selector: 'bk-disputes-form',
  templateUrl: './disputes-form.component.html',
  styleUrls: ['./disputes-form.component.scss'],
})
export class DisputesFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editing = false;
  saving = false;

  private id: string | null = null;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: DisputesService,
    private readonly notifications: NotificationService
  ) {
    this.form = this.fb.group({
      transactionRef: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      amount: [0, []],
      raisedOn: ['', []],
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
    const payload = { ...this.form.value, id: this.id || undefined } as Partial<Dispute>;
    this.service
      .save(payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (saved) => {
          this.saving = false;
          this.notifications.success('Dispute saved');
          this.router.navigate(['/disputes', saved.id]);
        },
        error: () => {
          this.saving = false;
          this.notifications.error('We could not save that dispute.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/disputes']);
  }
}
