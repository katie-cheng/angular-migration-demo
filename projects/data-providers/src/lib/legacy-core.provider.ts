import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Account,
  AccountKind,
  Page,
  Payee,
  Transaction,
  TransactionQuery,
  TransactionStatus,
  TransferReceipt,
  TransferRequest,
} from './banking.models';
import { BankingProvider, PROVIDER_ROUTING, ProviderRoutingConfig } from './provider.tokens';

interface LegacyAccountRecord {
  ACCT_ID: string;
  ACCT_TYPE: string;
  ACCT_NICKNAME: string;
  ACCT_NUM_MASK: string;
  SORT_CD: string;
  CCY: string;
  AVAIL_BAL_MINOR: number;
  CURR_BAL_MINOR: number;
  ACCT_STATUS: string;
}

interface LegacyTxnRecord {
  TXN_ID: string;
  ACCT_ID: string;
  POST_DT: string;
  NARRATIVE: string;
  MCC: string;
  AMT_MINOR: number;
  CCY: string;
  TXN_STATUS: string;
  RUN_BAL_MINOR: number | null;
}

const ACCOUNT_KINDS: Record<string, AccountKind> = {
  CHQ: 'checking',
  SAV: 'savings',
  CRD: 'credit-card',
  LN: 'loan',
  MTG: 'mortgage',
  BRK: 'brokerage',
};

const TXN_STATUSES: Record<string, TransactionStatus> = {
  P: 'pending',
  C: 'posted',
  D: 'declined',
  R: 'returned',
};

function minorToMajor(minor: number): number {
  return Math.round(minor) / 100;
}

/**
 * Adapts the mainframe gateway's fixed-width-derived JSON onto the domain
 * model. Amounts arrive in minor units and dates as YYYYMMDD.
 */
@Injectable({ providedIn: 'root' })
export class LegacyCoreProvider implements BankingProvider {
  readonly name = 'legacy-core';

  constructor(
    private readonly http: HttpClient,
    @Inject(PROVIDER_ROUTING) private readonly routing: ProviderRoutingConfig
  ) {}

  listAccounts(): Observable<Account[]> {
    return this.http
      .get<LegacyAccountRecord[]>(this.routing.legacyBase + '/ACCTLIST')
      .pipe(map((records) => records.map((record) => this.toAccount(record))));
  }

  getAccount(accountId: string): Observable<Account> {
    return this.http
      .get<LegacyAccountRecord>(this.routing.legacyBase + '/ACCTDTL/' + accountId)
      .pipe(map((record) => this.toAccount(record)));
  }

  listTransactions(query: TransactionQuery): Observable<Page<Transaction>> {
    const pageSize = query.pageSize ?? 25;
    const page = query.page ?? 1;
    const params = new HttpParams()
      .set('ACCT_ID', query.accountId)
      .set('START_ROW', String((page - 1) * pageSize + 1))
      .set('ROW_CNT', String(pageSize));

    return this.http
      .get<{ ROWS: LegacyTxnRecord[]; TOT_CNT: number }>(this.routing.legacyBase + '/TXNLIST', {
        params,
      })
      .pipe(
        map((response) => ({
          items: response.ROWS.map((row) => this.toTransaction(row)),
          page,
          pageSize,
          total: response.TOT_CNT,
        }))
      );
  }

  listPayees(): Observable<Payee[]> {
    return this.http
      .get<
        {
          PAYEE_ID: string;
          PAYEE_NM: string;
          ACCT_NUM_MASK: string;
          SORT_CD: string;
          PAYEE_TYPE: string;
          LAST_PAID_DT: string | null;
        }[]
      >(this.routing.legacyBase + '/PAYEELIST')
      .pipe(
        map((records) =>
          records.map((record) => ({
            id: record.PAYEE_ID,
            name: record.PAYEE_NM,
            maskedNumber: record.ACCT_NUM_MASK,
            sortCode: record.SORT_CD,
            kind:
              record.PAYEE_TYPE === 'INT'
                ? ('internal' as const)
                : record.PAYEE_TYPE === 'DOM'
                ? ('domestic' as const)
                : ('international' as const),
            lastPaidAt: record.LAST_PAID_DT ? this.toIsoDate(record.LAST_PAID_DT) : null,
          }))
        )
      );
  }

  submitTransfer(request: TransferRequest): Observable<TransferReceipt> {
    return this.http
      .post<{ TXN_REF: string; RESULT_CD: string; CLEAR_DT: string | null; RESULT_MSG: string }>(
        this.routing.legacyBase + '/XFERPOST',
        {
          FROM_ACCT: request.fromAccountId,
          TO_PAYEE: request.toPayeeId,
          AMT_MINOR: Math.round(request.amount * 100),
          CCY: request.currency,
          NARRATIVE: request.reference,
          SCHED_DT: request.scheduledFor,
        }
      )
      .pipe(
        map((response) => ({
          id: response.TXN_REF,
          status:
            response.RESULT_CD === '00'
              ? ('accepted' as const)
              : response.RESULT_CD === '02'
              ? ('scheduled' as const)
              : ('rejected' as const),
          clearedAt: response.CLEAR_DT ? this.toIsoDate(response.CLEAR_DT) : null,
          reason: response.RESULT_CD === '00' ? null : response.RESULT_MSG,
        }))
      );
  }

  private toAccount(record: LegacyAccountRecord): Account {
    return {
      id: record.ACCT_ID,
      kind: ACCOUNT_KINDS[record.ACCT_TYPE] || 'checking',
      nickname: record.ACCT_NICKNAME.trim(),
      maskedNumber: record.ACCT_NUM_MASK,
      sortCode: record.SORT_CD,
      currency: record.CCY,
      availableBalance: minorToMajor(record.AVAIL_BAL_MINOR),
      currentBalance: minorToMajor(record.CURR_BAL_MINOR),
      status:
        record.ACCT_STATUS === 'O' ? 'open' : record.ACCT_STATUS === 'F' ? 'frozen' : 'closed',
    };
  }

  private toTransaction(record: LegacyTxnRecord): Transaction {
    return {
      id: record.TXN_ID,
      accountId: record.ACCT_ID,
      postedAt: this.toIsoDate(record.POST_DT),
      description: record.NARRATIVE.trim(),
      merchantCategory: record.MCC,
      amount: minorToMajor(record.AMT_MINOR),
      currency: record.CCY,
      status: TXN_STATUSES[record.TXN_STATUS] || 'posted',
      runningBalance: record.RUN_BAL_MINOR === null ? null : minorToMajor(record.RUN_BAL_MINOR),
    };
  }

  private toIsoDate(compact: string): string {
    return (
      compact.substring(0, 4) + '-' + compact.substring(4, 6) + '-' + compact.substring(6, 8)
    );
  }
}
