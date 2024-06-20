import { Component, Input, OnChanges } from '@angular/core';

import { Transaction } from 'data-providers';

interface CategorySlice {
  category: string;
  amount: number;
  share: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  '5411': 'Groceries',
  '5814': 'Eating out',
  '4111': 'Transport',
  '5912': 'Health',
  '5941': 'Leisure',
};

@Component({
  selector: 'bk-spend-breakdown',
  templateUrl: './spend-breakdown.component.html',
  styleUrls: ['./spend-breakdown.component.scss'],
})
export class SpendBreakdownComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];

  slices: CategorySlice[] = [];
  trend: number[] = [];

  ngOnChanges(): void {
    const debits = this.transactions.filter((transaction) => transaction.amount < 0);
    const totals = new Map<string, number>();

    for (const debit of debits) {
      const label = CATEGORY_LABELS[debit.merchantCategory] || 'Other';
      totals.set(label, (totals.get(label) || 0) + Math.abs(debit.amount));
    }

    const grand = Array.from(totals.values()).reduce((sum, value) => sum + value, 0);
    this.slices = Array.from(totals.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        share: grand ? Math.round((amount / grand) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    this.trend = debits
      .slice()
      .reverse()
      .map((transaction) => Math.abs(transaction.amount));
  }
}
