import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-rewards-summary',
  templateUrl: './rewards-summary.component.html',
  styleUrls: ['./rewards-summary.component.scss'],
})
export class RewardsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
