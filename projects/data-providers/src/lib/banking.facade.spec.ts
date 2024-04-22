import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { Account, Page, Payee, Transaction, TransferReceipt } from './banking.models';
import { BankingFacade } from './banking.facade';
import { BANKING_PROVIDER, BankingProvider } from './provider.tokens';

function account(overrides: Partial<Account> = {}): Account {
  return {
    id: 'A-1',
    kind: 'checking',
    nickname: 'Everyday',
    maskedNumber: '****1111',
    sortCode: '04-00-04',
    currency: 'GBP',
    availableBalance: 100,
    currentBalance: 100,
    status: 'open',
    ...overrides,
  };
}

class StubProvider implements BankingProvider {
  readonly name = 'stub';
  accountCalls = 0;
  accounts: Account[] = [
    account(),
    account({ id: 'A-2', availableBalance: 250, status: 'closed' }),
    account({ id: 'A-3', currency: 'USD', availableBalance: 999 }),
  ];

  listAccounts(): Observable<Account[]> {
    this.accountCalls++;
    return of(this.accounts);
  }
  getAccount(accountId: string): Observable<Account> {
    return of(account({ id: accountId }));
  }
  listTransactions(): Observable<Page<Transaction>> {
    return of({ items: [], page: 1, pageSize: 25, total: 0 });
  }
  listPayees(): Observable<Payee[]> {
    return of([]);
  }
  submitTransfer(): Observable<TransferReceipt> {
    return of({ id: 'X-1', status: 'accepted', clearedAt: null, reason: null });
  }
}

describe('BankingFacade', () => {
  let facade: BankingFacade;
  let provider: StubProvider;

  beforeEach(() => {
    provider = new StubProvider();
    TestBed.configureTestingModule({
      providers: [{ provide: BANKING_PROVIDER, useValue: provider }],
    });
    facade = TestBed.inject(BankingFacade);
  });

  it('caches the account list across subscribers', () => {
    facade.accounts().subscribe();
    facade.accounts().subscribe();

    expect(provider.accountCalls).toBe(1);
  });

  it('reloads accounts when asked to', () => {
    facade.accounts().subscribe();
    facade.accounts(true).subscribe();

    expect(provider.accountCalls).toBe(2);
  });

  it('filters out closed accounts', (done) => {
    facade.openAccounts().subscribe((accounts) => {
      expect(accounts.map((a) => a.id)).toEqual(['A-1', 'A-3']);
      done();
    });
  });

  it('totals available balance per currency', (done) => {
    facade.totalAvailable('GBP').subscribe((total) => {
      expect(total).toBe(100);
      done();
    });
  });

  it('invalidates caches after an accepted transfer', (done) => {
    facade.accounts().subscribe();
    facade
      .transfer({
        fromAccountId: 'A-1',
        toPayeeId: 'P-1',
        amount: 5,
        currency: 'GBP',
        reference: 'test',
        scheduledFor: null,
      })
      .subscribe(() => {
        facade.accounts().subscribe(() => {
          expect(provider.accountCalls).toBe(2);
          done();
        });
      });
  });
});
