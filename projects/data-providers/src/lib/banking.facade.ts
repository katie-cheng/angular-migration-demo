import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

import {
  Account,
  Page,
  Payee,
  Transaction,
  TransactionQuery,
  TransferReceipt,
  TransferRequest,
} from './banking.models';
import { BANKING_PROVIDER, BankingProvider } from './provider.tokens';

/**
 * Feature modules depend on this facade rather than the provider directly,
 * so caching and cross-cutting rules live in one place.
 */
@Injectable({ providedIn: 'root' })
export class BankingFacade {
  private accounts$: Observable<Account[]> | null = null;
  private payees$: Observable<Payee[]> | null = null;

  constructor(@Inject(BANKING_PROVIDER) private readonly provider: BankingProvider) {}

  get providerName(): string {
    return this.provider.name;
  }

  accounts(forceReload = false): Observable<Account[]> {
    if (forceReload || !this.accounts$) {
      this.accounts$ = this.provider.listAccounts().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.accounts$;
  }

  account(accountId: string): Observable<Account> {
    return this.provider.getAccount(accountId);
  }

  openAccounts(): Observable<Account[]> {
    return this.accounts().pipe(map((accounts) => accounts.filter((a) => a.status === 'open')));
  }

  totalAvailable(currency: string): Observable<number> {
    return this.accounts().pipe(
      map((accounts) =>
        accounts
          .filter((account) => account.currency === currency && account.status !== 'closed')
          .reduce((sum, account) => sum + account.availableBalance, 0)
      )
    );
  }

  transactions(query: TransactionQuery): Observable<Page<Transaction>> {
    return this.provider.listTransactions(query);
  }

  payees(forceReload = false): Observable<Payee[]> {
    if (forceReload || !this.payees$) {
      this.payees$ = this.provider.listPayees().pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.payees$;
  }

  transfer(request: TransferRequest): Observable<TransferReceipt> {
    return of(request).pipe(
      switchMap((payload) => this.provider.submitTransfer(payload)),
      tap((receipt) => {
        if (receipt.status === 'accepted') {
          this.invalidate();
        }
      })
    );
  }

  invalidate(): void {
    this.accounts$ = null;
    this.payees$ = null;
  }
}
