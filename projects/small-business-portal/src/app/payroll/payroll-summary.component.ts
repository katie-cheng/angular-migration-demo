import { Component } from '@angular/core';

@Component({
  selector: 'sbp-payroll-summary',
  template: `
    <mat-card fxLayout="column" fxLayoutGap="8px" class="sbp-payroll">
      <h2>Payroll</h2>
      <mat-divider></mat-divider>
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <span>Next run</span>
        <strong>28 of the month</strong>
      </div>
      <div fxLayout="row" fxLayoutAlign="space-between center">
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
