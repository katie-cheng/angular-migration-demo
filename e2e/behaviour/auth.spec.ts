import { expect, test } from '@playwright/test';

import { CREDENTIALS, MFA_CODE, readSession, signIn } from './fixtures';

test.describe('authentication', () => {
  test('signs in through the step-up challenge and lands on the dashboard', async ({ page }) => {
    await signIn(page);
    await expect(page.getByRole('heading', { name: /good (morning|afternoon|evening)/i })).toBeVisible();
  });

  test('rejects bad credentials without creating a session', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username').fill(CREDENTIALS.username);
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/invalid credentials|could not sign you in/i)).toBeVisible();
    expect(await readSession(page)).toBeNull();
  });

  test('sends an anonymous visitor to login and back to the page they wanted', async ({ page }) => {
    await page.goto('/statements');
    await expect(page).toHaveURL(/login\?returnUrl=%2Fstatements/);

    await page.getByLabel('Username').fill(CREDENTIALS.username);
    await page.getByLabel('Password').fill(CREDENTIALS.password);
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.getByRole('button', { name: /send code/i }).click();
    await page.getByLabel(/code/i).fill(MFA_CODE);
    await page.getByRole('button', { name: /verify/i }).click();

    await expect(page).toHaveURL(/statements/);
  });

  test('a guarded route stays guarded until MFA is satisfied', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username').fill(CREDENTIALS.username);
    await page.getByLabel('Password').fill(CREDENTIALS.password);
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/step-up/);

    await page.goto('/transfers');
    await expect(page).toHaveURL(/step-up/);
  });
});
