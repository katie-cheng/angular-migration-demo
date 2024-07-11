import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-alerts-summary',
  templateUrl: './alerts-summary.component.html',
  styleUrls: ['./alerts-summary.component.scss'],
})
export class AlertsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
