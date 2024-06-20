import { Component, Input } from '@angular/core';

import { Transaction } from 'data-providers';

@Component({
  selector: 'bk-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent {
  @Input() transactions: Transaction[] = [];
  @Input() loading = false;

  trackById(_index: number, transaction: Transaction): string {
    return transaction.id;
  }
}
