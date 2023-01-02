import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'bk-currency-amount',
  templateUrl: './currency-amount.component.html',
  styleUrls: ['./currency-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyAmountComponent {
  @Input() amount: number = 0;
  @Input() currency: string = 'USD';
  @Input() signed: boolean = false;

  get formatted(): string {
    const prefix = this.signed && this.amount > 0 ? '+' : '';
    return prefix + new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currency }).format(this.amount);
  }
}
