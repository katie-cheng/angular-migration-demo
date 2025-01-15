import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-transfers-summary',
  templateUrl: './transfers-summary.component.html',
  styleUrls: ['./transfers-summary.component.scss'],
})
export class TransfersSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
