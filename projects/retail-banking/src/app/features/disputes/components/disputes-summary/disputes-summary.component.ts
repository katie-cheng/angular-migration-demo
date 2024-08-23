import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-disputes-summary',
  templateUrl: './disputes-summary.component.html',
  styleUrls: ['./disputes-summary.component.scss'],
})
export class DisputesSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
