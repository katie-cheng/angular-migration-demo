import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-p2p-payments-summary',
  templateUrl: './p2p-payments-summary.component.html',
  styleUrls: ['./p2p-payments-summary.component.scss'],
})
export class P2pPaymentsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
