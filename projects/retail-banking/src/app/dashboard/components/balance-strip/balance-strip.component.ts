import { Component, Input } from '@angular/core';

import { Account } from 'data-providers';

@Component({
  selector: 'bk-balance-strip',
  templateUrl: './balance-strip.component.html',
  styleUrls: ['./balance-strip.component.scss'],
})
export class BalanceStripComponent {
  @Input() total = 0;
  @Input() accounts: Account[] = [];
  @Input() loading = false;

  get openCount(): number {
    return this.accounts.filter((account) => account.status === 'open').length;
  }

  get creditUsed(): number {
    return this.accounts
      .filter((account) => account.kind === 'credit-card')
      .reduce((sum, account) => sum + Math.abs(Math.min(account.currentBalance, 0)), 0);
  }
}
