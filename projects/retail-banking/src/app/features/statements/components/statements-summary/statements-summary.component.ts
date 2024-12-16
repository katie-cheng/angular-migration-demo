import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-statements-summary',
  templateUrl: './statements-summary.component.html',
  styleUrls: ['./statements-summary.component.scss'],
})
export class StatementsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
