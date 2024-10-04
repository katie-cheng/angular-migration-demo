import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-mortgage-summary',
  templateUrl: './mortgage-summary.component.html',
  styleUrls: ['./mortgage-summary.component.scss'],
})
export class MortgageSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
