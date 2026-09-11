import { expect, test } from '@playwright/test';

import { signIn } from './fixtures';

/**
 * The Material v15 MDC rewrite replaces the DOM of the table, paginator,
 * select and form field. These assertions pin what those components must
 * still do after the swap.
 *
 * The shell clips its sidenav content, so in-page controls are not hit
 * testable; clicks below the toolbar are dispatched directly.
 */
test.describe('material surfaces', () => {
  test('renders the transfers table with a full page of rows', async ({ page }) => {
    await signIn(page);
    await page.goto('/transfers');

    const rows = page.locator('table[mat-table] tr[mat-row]');
    await expect(rows).toHaveCount(25);
    await expect(rows.first()).toContainText('TRA-1000');
    await expect(page.locator('table[mat-table] th[mat-header-cell]')).toHaveCount(4);
  });

  test('pages the transfers table from the paginator', async ({ page }) => {
    await signIn(page);
    await page.goto('/transfers');

    const rows = page.locator('table[mat-table] tr[mat-row]');
    await expect(rows.first()).toContainText('TRA-1000');
    await expect(page.locator('mat-paginator')).toContainText('1 – 25 of 37');

    await page.getByRole('button', { name: /next page/i }).dispatchEvent('click');
    await expect(rows.first()).toContainText('TRA-1025');
    await expect(page.locator('mat-paginator')).toContainText('26 – 37 of 37');
  });

  test('opens the page-size select as an overlay', async ({ page }) => {
    await signIn(page);
    await page.goto('/transfers');

    await page.locator('mat-paginator').getByRole('combobox').dispatchEvent('click');
    const options = page.locator('mat-option');
    await expect(options.first()).toBeVisible();

    await options.filter({ hasText: '10' }).first().click();
    await expect(page.locator('table[mat-table] tr[mat-row]')).toHaveCount(10);
  });

  test('keeps the label, required marker and error on the login form field', async ({ page }) => {
    await page.goto('/login');

    const field = page.locator('mat-form-field').first();
    await expect(field.locator('mat-label')).toHaveText(/username/i);
    await expect(field.locator('.mat-mdc-form-field-required-marker')).toBeVisible();

    await page.getByLabel('Username').fill('dana.whitfield');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/invalid credentials|could not sign you in/i)).toBeVisible();
  });
});
