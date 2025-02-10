import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Account, BankingFacade } from 'data-providers';

@Component({
  selector: 'sbp-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss'],
})
export class ApprovalsComponent implements OnInit {
  readonly displayedColumns = ['nickname', 'maskedNumber', 'availableBalance'];

  accounts$!: Observable<Account[]>;

  constructor(private readonly facade: BankingFacade) {}

  ngOnInit(): void {
    this.accounts$ = this.facade.openAccounts();
  }
}
