import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-accounts-summary',
  templateUrl: './accounts-summary.component.html',
  styleUrls: ['./accounts-summary.component.scss'],
})
export class AccountsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
