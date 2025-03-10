import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account, BankingFacade } from 'data-providers';

interface Holding {
  label: string;
  value: number;
  currency: string;
}

@Component({
  selector: 'wa-client-book',
  templateUrl: './client-book.component.html',
  styleUrls: ['./client-book.component.scss'],
})
export class ClientBookComponent implements OnInit {
  holdings$!: Observable<Holding[]>;

  constructor(private readonly facade: BankingFacade) {}

  ngOnInit(): void {
    this.holdings$ = this.facade.accounts().pipe(
      map((accounts: Account[]) =>
        accounts.map((account) => ({
          label: account.nickname,
          value: account.currentBalance,
          currency: account.currency,
        }))
      )
    );
  }
}
