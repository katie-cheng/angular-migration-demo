import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LegacyCoreProvider } from './legacy-core.provider';
import { DEFAULT_PROVIDER_ROUTING, PROVIDER_ROUTING } from './provider.tokens';

describe('LegacyCoreProvider', () => {
  let provider: LegacyCoreProvider;
  let http: HttpTestingController;
  const base = DEFAULT_PROVIDER_ROUTING.legacyBase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PROVIDER_ROUTING, useValue: DEFAULT_PROVIDER_ROUTING }],
    });
    provider = TestBed.inject(LegacyCoreProvider);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('converts minor units and account type codes', (done) => {
    provider.listAccounts().subscribe((accounts) => {
      expect(accounts[0].kind).toBe('savings');
      expect(accounts[0].availableBalance).toBe(1234.56);
      expect(accounts[0].nickname).toBe('Rainy day');
      expect(accounts[0].status).toBe('open');
      done();
    });

    http.expectOne(base + '/ACCTLIST').flush([
      {
        ACCT_ID: 'A-1',
        ACCT_TYPE: 'SAV',
        ACCT_NICKNAME: 'Rainy day   ',
        ACCT_NUM_MASK: '****4321',
        SORT_CD: '04-00-04',
        CCY: 'GBP',
        AVAIL_BAL_MINOR: 123456,
        CURR_BAL_MINOR: 123456,
        ACCT_STATUS: 'O',
      },
    ]);
  });

  it('translates compact dates and status codes on transactions', (done) => {
    provider.listTransactions({ accountId: 'A-1', page: 2, pageSize: 10 }).subscribe((page) => {
      expect(page.total).toBe(42);
      expect(page.items[0].postedAt).toBe('2023-04-17');
      expect(page.items[0].status).toBe('pending');
      expect(page.items[0].amount).toBe(-19.99);
      done();
    });

    const request = http.expectOne((req) => req.url === base + '/TXNLIST');
    expect(request.request.params.get('START_ROW')).toBe('11');
    request.flush({
      TOT_CNT: 42,
      ROWS: [
        {
          TXN_ID: 'T-1',
          ACCT_ID: 'A-1',
          POST_DT: '20230417',
          NARRATIVE: 'COFFEE HOUSE  ',
          MCC: '5814',
          AMT_MINOR: -1999,
          CCY: 'GBP',
          TXN_STATUS: 'P',
          RUN_BAL_MINOR: null,
        },
      ],
    });
  });

  it('maps a rejected transfer result code onto a reason', (done) => {
    provider
      .submitTransfer({
        fromAccountId: 'A-1',
        toPayeeId: 'P-1',
        amount: 10,
        currency: 'GBP',
        reference: 'rent',
        scheduledFor: null,
      })
      .subscribe((receipt) => {
        expect(receipt.status).toBe('rejected');
        expect(receipt.reason).toBe('INSUFFICIENT FUNDS');
        done();
      });

    http.expectOne(base + '/XFERPOST').flush({
      TXN_REF: 'X-9',
      RESULT_CD: '51',
      CLEAR_DT: null,
      RESULT_MSG: 'INSUFFICIENT FUNDS',
    });
  });
});
