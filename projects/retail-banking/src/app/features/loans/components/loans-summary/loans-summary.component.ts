import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-loans-summary',
  templateUrl: './loans-summary.component.html',
  styleUrls: ['./loans-summary.component.scss'],
})
export class LoansSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
