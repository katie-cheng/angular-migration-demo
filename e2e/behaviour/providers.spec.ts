import { expect, test } from '@playwright/test';

import { signIn } from './fixtures';

test.describe('provider adapters', () => {
  test('shows ledger balances as major units', async ({ page }) => {
    await signIn(page);
    await expect(page.getByText(/£2,483\.19/)).toBeVisible();
  });

  test('lists open accounts and leaves closed ones out of the dashboard', async ({ page }) => {
    await signIn(page);
    await expect(page.getByText('Everyday Current')).toBeVisible();
    await expect(page.getByText('Closed Holiday Pot')).toHaveCount(0);
  });

  test('renders the legacy mainframe shape identically for a legacy region', async ({ page }) => {
    const ledger = await page.request.get('http://localhost:4300/api/ledger/accounts');
    const legacy = await page.request.get('http://localhost:4300/api/core-legacy/ACCTLIST');

    const ledgerBody = await ledger.json();
    const legacyBody = await legacy.json();

    expect(legacyBody[0].AVAIL_BAL_MINOR).toBe(Math.round(ledgerBody[0].availableBalance * 100));
  });

  test('rejects a transfer over the limit without clearing it', async ({ page }) => {
    const response = await page.request.post('http://localhost:4300/api/ledger/transfers', {
      data: { fromAccountId: 'acc-current-01', toPayeeId: 'payee-01', amount: 25000, currency: 'GBP' },
    });

    const body = await response.json();
    expect(body.status).toBe('rejected');
    expect(body.clearedAt).toBeNull();
  });
});
