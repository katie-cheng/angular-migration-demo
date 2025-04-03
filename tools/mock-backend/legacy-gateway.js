'use strict';

/**
 * Emulates the mainframe gateway: upper-case field names, amounts in minor
 * units and YYYYMMDD dates.
 */
const express = require('express');
const { accounts, transactions, payees } = require('./fixtures');

const KIND_CODES = {
  checking: 'CHQ',
  savings: 'SAV',
  'credit-card': 'CRD',
  loan: 'LN',
  mortgage: 'MTG',
  brokerage: 'BRK',
};

const STATUS_CODES = { pending: 'P', posted: 'C', declined: 'D', returned: 'R' };

function toCompactDate(iso) {
  return iso.slice(0, 10).replace(/-/g, '');
}

function toLegacyAccount(account) {
  return {
    ACCT_ID: account.id,
    ACCT_TYPE: KIND_CODES[account.kind] || 'CHQ',
    ACCT_NICKNAME: account.nickname.padEnd(24, ' '),
    ACCT_NUM_MASK: account.maskedNumber,
    SORT_CD: account.sortCode,
    CCY: account.currency,
    AVAIL_BAL_MINOR: Math.round(account.availableBalance * 100),
    CURR_BAL_MINOR: Math.round(account.currentBalance * 100),
    ACCT_STATUS: account.status === 'open' ? 'O' : account.status === 'frozen' ? 'F' : 'C',
  };
}

function legacyRouter() {
  const router = express.Router();

  router.get('/ACCTLIST', (_req, res) => res.json(accounts.map(toLegacyAccount)));

  router.get('/ACCTDTL/:id', (req, res) => {
    const account = accounts.find((candidate) => candidate.id === req.params.id);
    if (!account) {
      res.status(404).json({ RESULT_CD: '404', RESULT_MSG: 'ACCT NOT FOUND' });
      return;
    }
    res.json(toLegacyAccount(account));
  });

  router.get('/TXNLIST', (req, res) => {
    const all = transactions[req.query.ACCT_ID] || [];
    const startRow = Number(req.query.START_ROW || 1);
    const rowCount = Number(req.query.ROW_CNT || 25);

    res.json({
      TOT_CNT: all.length,
      ROWS: all.slice(startRow - 1, startRow - 1 + rowCount).map((txn) => ({
        TXN_ID: txn.id,
        ACCT_ID: txn.accountId,
        POST_DT: toCompactDate(txn.postedAt),
        NARRATIVE: txn.description.padEnd(30, ' '),
        MCC: txn.merchantCategory,
        AMT_MINOR: Math.round(txn.amount * 100),
        CCY: txn.currency,
        TXN_STATUS: STATUS_CODES[txn.status] || 'C',
        RUN_BAL_MINOR: txn.runningBalance === null ? null : Math.round(txn.runningBalance * 100),
      })),
    });
  });

  router.get('/PAYEELIST', (_req, res) =>
    res.json(
      payees.map((payee) => ({
        PAYEE_ID: payee.id,
        PAYEE_NM: payee.name,
        ACCT_NUM_MASK: payee.maskedNumber,
        SORT_CD: payee.sortCode,
        PAYEE_TYPE: payee.kind === 'internal' ? 'INT' : payee.kind === 'domestic' ? 'DOM' : 'INTL',
        LAST_PAID_DT: payee.lastPaidAt ? payee.lastPaidAt.replace(/-/g, '') : null,
      }))
    )
  );

  router.post('/XFERPOST', (req, res) => {
    const amountMinor = Number((req.body || {}).AMT_MINOR || 0);
    if (amountMinor > 1000000) {
      res.json({ TXN_REF: 'X-LIMIT', RESULT_CD: '51', CLEAR_DT: null, RESULT_MSG: 'LIMIT EXCEEDED' });
      return;
    }
    res.json({
      TXN_REF: 'X-' + Date.now(),
      RESULT_CD: req.body.SCHED_DT ? '02' : '00',
      CLEAR_DT: req.body.SCHED_DT ? null : toCompactDate(new Date().toISOString()),
      RESULT_MSG: 'OK',
    });
  });

  return router;
}

module.exports = { legacyRouter, toLegacyAccount };
