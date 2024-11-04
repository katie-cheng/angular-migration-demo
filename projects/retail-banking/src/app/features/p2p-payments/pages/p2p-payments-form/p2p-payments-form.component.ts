import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'ui-kit';

import { Payment } from '../../p2p-payments.model';
import { P2pPaymentsService } from '../../p2p-payments.service';

@Component({
  selector: 'bk-p2p-payments-form',
  templateUrl: './p2p-payments-form.component.html',
  styleUrls: ['./p2p-payments-form.component.scss'],
})
export class P2pPaymentsFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editing = false;
  saving = false;

  private id: string | null = null;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: P2pPaymentsService,
    private readonly notifications: NotificationService
  ) {
    this.form = this.fb.group({
      recipient: ['', [Validators.required]],
      handle: ['', [Validators.required]],
      amount: [0, []],
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
    const payload = { ...this.form.value, id: this.id || undefined } as Partial<Payment>;
    this.service
      .save(payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (saved) => {
          this.saving = false;
          this.notifications.success('Payment saved');
          this.router.navigate(['/p2p-payments', saved.id]);
        },
        error: () => {
          this.saving = false;
          this.notifications.error('We could not save that payment.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/p2p-payments']);
  }
}
