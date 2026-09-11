import { Component } from '@angular/core';

@Component({
  selector: 'sbp-payroll-summary',
  template: `
    <mat-card class="sbp-payroll bk-col bk-gap-8px">
      <h2>Payroll</h2>
      <mat-divider></mat-divider>
      <div class="bk-row bk-justify-space-between bk-items-center">
        <span>Next run</span>
        <strong>28 of the month</strong>
      </div>
      <div class="bk-row bk-justify-space-between bk-items-center">
        <span>Employees</span>
        <strong>14</strong>
      </div>
      <button mat-stroked-button color="primary">Review payroll</button>
    </mat-card>
  `,
  styles: [
    `
      .sbp-payroll {
        padding: 16px;
      }
    `,
  ],
})
export class PayrollSummaryComponent {}
