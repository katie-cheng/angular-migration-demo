import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionRowComponent {
  @Input() description: string = '';
  @Input() postedAt: string = '';
  @Input() amount: number = 0;
  @Input() pending: boolean = false;
}
