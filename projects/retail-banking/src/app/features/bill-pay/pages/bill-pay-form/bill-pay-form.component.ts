import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from 'ui-kit';

import { Bill } from '../../bill-pay.model';
import { BillPayService } from '../../bill-pay.service';

@Component({
  selector: 'bk-bill-pay-form',
  templateUrl: './bill-pay-form.component.html',
  styleUrls: ['./bill-pay-form.component.scss'],
})
export class BillPayFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editing = false;
  saving = false;

  private id: string | null = null;
  private readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly service: BillPayService,
    private readonly notifications: NotificationService
  ) {
    this.form = this.fb.group({
      biller: ['', [Validators.required]],
      accountRef: ['', [Validators.required]],
      amount: [0, []],
      dueOn: ['', []],
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
    const payload = { ...this.form.value, id: this.id || undefined } as Partial<Bill>;
    this.service
      .save(payload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (saved) => {
          this.saving = false;
          this.notifications.success('Bill saved');
          this.router.navigate(['/bill-pay', saved.id]);
        },
        error: () => {
          this.saving = false;
          this.notifications.error('We could not save that bill.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/bill-pay']);
  }
}
