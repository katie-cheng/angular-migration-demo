import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Account, Page, Payee, Transaction, TransactionQuery, TransferReceipt, TransferRequest } from './banking.models';

/**
 * Core banking is mid-migration: some regions still answer from the legacy
 * mainframe gateway while others are on the new ledger service. Features
 * talk to this port and never to a specific backend.
 */
export interface BankingProvider {
  readonly name: string;
  listAccounts(): Observable<Account[]>;
  getAccount(accountId: string): Observable<Account>;
  listTransactions(query: TransactionQuery): Observable<Page<Transaction>>;
  listPayees(): Observable<Payee[]>;
  submitTransfer(request: TransferRequest): Observable<TransferReceipt>;
}

export const BANKING_PROVIDER = new InjectionToken<BankingProvider>('BANKING_PROVIDER');

export interface ProviderRoutingConfig {
  /** Region codes still served by the legacy gateway. */
  legacyRegions: string[];
  region: string;
  legacyBase: string;
  ledgerBase: string;
}

export const PROVIDER_ROUTING = new InjectionToken<ProviderRoutingConfig>('PROVIDER_ROUTING');

export const DEFAULT_PROVIDER_ROUTING: ProviderRoutingConfig = {
  legacyRegions: ['uk-north', 'ie'],
  region: 'uk-south',
  legacyBase: '/api/core-legacy',
  ledgerBase: '/api/ledger',
};
