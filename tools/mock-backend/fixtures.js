'use strict';

/**
 * Deterministic fixtures for the mock backend.
 *
 * Everything here is invented: names, sort codes and card numbers are not
 * valid and do not correspond to any real customer or institution.
 */

const MERCHANTS = [
  ['Greenhill Grocers', '5411'],
  ['Ridgeway Coffee', '5814'],
  ['Metro Transit', '4111'],
  ['Harbour Pharmacy', '5912'],
  ['Ashcroft Books', '5941'],
  ['Northgate Fuel', '5541'],
  ['Silverpine Gym', '7997'],
  ['Lumen Energy', '4900'],
];

function seededRandom(seed) {
  let s = seed >>> 0;
  return function next() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const accounts = [
  {
    id: 'acc-current-01',
    kind: 'checking',
    nickname: 'Everyday Current',
    maskedNumber: '••••4417',
    sortCode: '04-00-12',
    currency: 'GBP',
    availableBalance: 2483.19,
    currentBalance: 2483.19,
    status: 'open',
  },
  {
    id: 'acc-savings-01',
    kind: 'savings',
    nickname: 'Rainy Day',
    maskedNumber: '••••9082',
    sortCode: '04-00-12',
    currency: 'GBP',
    availableBalance: 11250.0,
    currentBalance: 11250.0,
    status: 'open',
  },
  {
    id: 'acc-card-01',
    kind: 'credit-card',
    nickname: 'Everyday Rewards Card',
    maskedNumber: '••••7731',
    sortCode: '00-00-00',
    currency: 'GBP',
    availableBalance: 3120.45,
    currentBalance: -879.55,
    status: 'open',
  },
  {
    id: 'acc-mortgage-01',
    kind: 'mortgage',
    nickname: '14 Alder Grove',
    maskedNumber: '••••2210',
    sortCode: '04-00-77',
    currency: 'GBP',
    availableBalance: 0,
    currentBalance: -184320.4,
    status: 'open',
  },
  {
    id: 'acc-savings-02',
    kind: 'savings',
    nickname: 'Closed Holiday Pot',
    maskedNumber: '••••3344',
    sortCode: '04-00-12',
    currency: 'GBP',
    availableBalance: 0,
    currentBalance: 0,
    status: 'closed',
  },
];

function buildTransactions(accountId, count) {
  const random = seededRandom(accountId.length * 7919);
  const items = [];
  const start = Date.UTC(2024, 0, 15);

  for (let i = 0; i < count; i++) {
    const [description, mcc] = MERCHANTS[Math.floor(random() * MERCHANTS.length)];
    const credit = random() > 0.85;
    const amount = credit
      ? Math.round(random() * 180000) / 100
      : -Math.round(random() * 12000) / 100;

    items.push({
      id: accountId + '-txn-' + String(i + 1).padStart(4, '0'),
      accountId,
      postedAt: new Date(start - i * 86400000 * (1 + Math.floor(random() * 2))).toISOString(),
      description: credit ? 'Salary — Ardent Labs' : description,
      merchantCategory: credit ? '0000' : mcc,
      amount,
      currency: 'GBP',
      status: i < 2 ? 'pending' : 'posted',
      runningBalance: null,
    });
  }

  return items;
}

const transactions = accounts.reduce((acc, account) => {
  acc[account.id] = buildTransactions(account.id, 120);
  return acc;
}, {});

const payees = [
  {
    id: 'payee-01',
    name: 'Alder Grove Lettings',
    maskedNumber: '••••1188',
    sortCode: '20-14-09',
    kind: 'domestic',
    lastPaidAt: '2024-01-02',
  },
  {
    id: 'payee-02',
    name: 'Lumen Energy',
    maskedNumber: '••••7742',
    sortCode: '30-91-02',
    kind: 'domestic',
    lastPaidAt: '2023-12-28',
  },
  {
    id: 'payee-03',
    name: 'Rainy Day',
    maskedNumber: '••••9082',
    sortCode: '04-00-12',
    kind: 'internal',
    lastPaidAt: null,
  },
];

const profile = {
  id: 'cust-10045',
  displayName: 'Dana Whitfield',
  email: 'dana.whitfield@example.test',
  segment: 'retail',
  entitlements: [
    'accounts:read',
    'transfers:write',
    'billpay:write',
    'p2p:write',
    'investments:read',
    'statements:read',
    'alerts:write',
    'profile:write',
    'onboarding:write',
    'disputes:write',
    'rewards:read',
    'support:read',
    'cards:read',
    'loans:read',
    'mortgage:read',
  ],
};

module.exports = { accounts, transactions, payees, profile, seededRandom };
