import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-bill-pay-summary',
  templateUrl: './bill-pay-summary.component.html',
  styleUrls: ['./bill-pay-summary.component.scss'],
})
export class BillPaySummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
