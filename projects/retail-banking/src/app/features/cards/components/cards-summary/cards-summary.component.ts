import { Component, Input } from '@angular/core';

@Component({
  selector: 'bk-cards-summary',
  templateUrl: './cards-summary.component.html',
  styleUrls: ['./cards-summary.component.scss'],
})
export class CardsSummaryComponent {
  @Input() count = 0;
  @Input() loading = false;

  get headline(): string {
    return this.count === 1 ? '1 record' : this.count + ' records';
  }
}
