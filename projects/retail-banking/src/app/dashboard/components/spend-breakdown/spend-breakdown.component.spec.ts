import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Transaction } from 'data-providers';
import { UiKitModule } from 'ui-kit';

import { SpendBreakdownComponent } from './spend-breakdown.component';

function transaction(amount: number, merchantCategory: string): Transaction {
  return {
    id: `tx-${amount}-${merchantCategory}`,
    accountId: 'acc-1',
    postedAt: '2024-03-01T10:00:00.000Z',
    description: 'Test',
    merchantCategory,
    amount,
    currency: 'GBP',
    status: 'posted',
    runningBalance: null,
  } as Transaction;
}

describe('SpendBreakdownComponent', () => {
  let fixture: ComponentFixture<SpendBreakdownComponent>;
  let component: SpendBreakdownComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpendBreakdownComponent],
      imports: [CommonModule, NoopAnimationsModule, UiKitModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpendBreakdownComponent);
    component = fixture.componentInstance;
  });

  function sparkline(): SVGPolylineElement | null {
    return fixture.nativeElement.querySelector('bk-sparkline polyline') as SVGPolylineElement | null;
  }

  it('renders the sparkline from the debit trend, oldest first', () => {
    component.transactions = [
      transaction(-30, '5411'),
      transaction(-60, '5814'),
      transaction(120, '5411'),
    ];
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.trend).toEqual([60, 30]);
    expect(sparkline()?.getAttribute('points')).toBe('0,0 100,15');
  });

  it('draws the sparkline with the brand stroke', () => {
    component.transactions = [transaction(-30, '5411')];
    component.ngOnChanges();
    fixture.detectChanges();

    expect(sparkline()?.getAttribute('stroke')).toBe('#003366');
  });

  it('still renders a chart when there is no spending to plot', () => {
    component.transactions = [];
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.trend).toEqual([]);
    expect(sparkline()?.getAttribute('points')).toBe('0,30');
  });

  it('splits spending into shares per category', () => {
    component.transactions = [transaction(-75, '5411'), transaction(-25, '5814')];
    component.ngOnChanges();

    expect(component.slices).toEqual([
      { category: 'Groceries', amount: 75, share: 75 },
      { category: 'Eating out', amount: 25, share: 25 },
    ]);
  });
});
