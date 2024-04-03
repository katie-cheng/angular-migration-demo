import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Account,
  Page,
  Payee,
  Transaction,
  TransactionQuery,
  TransferReceipt,
  TransferRequest,
} from './banking.models';
import { BankingProvider, PROVIDER_ROUTING, ProviderRoutingConfig } from './provider.tokens';

/** Talks to the modern ledger service, which already speaks our domain model. */
@Injectable({ providedIn: 'root' })
export class LedgerProvider implements BankingProvider {
  readonly name = 'ledger';

  constructor(
    private readonly http: HttpClient,
    @Inject(PROVIDER_ROUTING) private readonly routing: ProviderRoutingConfig
  ) {}

  listAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.routing.ledgerBase + '/accounts');
  }

  getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.routing.ledgerBase + '/accounts/' + accountId);
  }

  listTransactions(query: TransactionQuery): Observable<Page<Transaction>> {
    let params = new HttpParams()
      .set('page', String(query.page ?? 1))
      .set('pageSize', String(query.pageSize ?? 25));
    if (query.from) {
      params = params.set('from', query.from);
    }
    if (query.to) {
      params = params.set('to', query.to);
    }
    if (query.search) {
      params = params.set('search', query.search);
    }
    if (query.status) {
      params = params.set('status', query.status);
    }

    return this.http.get<Page<Transaction>>(
      this.routing.ledgerBase + '/accounts/' + query.accountId + '/transactions',
      { params }
    );
  }

  listPayees(): Observable<Payee[]> {
    return this.http.get<Payee[]>(this.routing.ledgerBase + '/payees');
  }

  submitTransfer(request: TransferRequest): Observable<TransferReceipt> {
    return this.http.post<TransferReceipt>(this.routing.ledgerBase + '/transfers', request);
  }
}
