import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-investments-summary',
  templateUrl: './investments-summary.component.html',
  styleUrls: ['./investments-summary.component.scss'],
})
export class InvestmentsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
