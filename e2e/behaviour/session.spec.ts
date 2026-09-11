import { expect, test } from '@playwright/test';

import { readSession, signIn } from './fixtures';

test.describe('session lifecycle', () => {
  test('replays a request after refreshing an expired access token', async ({ page }) => {
    await signIn(page);

    await page.evaluate(() => {
      const raw = window.localStorage.getItem('nw.session');
      if (!raw) {
        return;
      }
      const session = JSON.parse(raw);
      session.tokens.expiresAt = Date.now() - 1000;
      session.tokens.accessToken = 'expired-token';
      window.localStorage.setItem('nw.session', JSON.stringify(session));
    });

    await page.goto('/accounts');
    await expect(page.getByRole('heading', { level: 1, name: /accounts/i })).toBeVisible();

    const session = await readSession(page);
    expect(String((session as any)?.tokens?.accessToken)).toContain('mock-access');
  });

  test('propagates sign-out to a second tab', async ({ page, context }) => {
    await signIn(page);

    const second = await context.newPage();
    await second.goto('/dashboard');
    await expect(second).toHaveURL(/dashboard/);

    await page.getByRole('button', { name: /account menu|profile/i }).click();
    await page.getByRole('menuitem', { name: /sign out/i }).click();

    await expect(second).toHaveURL(/login/, { timeout: 15_000 });
  });

  test('keeps a correlation cookie stable for the whole session', async ({ page, context }) => {
    await signIn(page);
    const before = (await context.cookies()).find((cookie) => cookie.name === 'nw_corr');
    expect(before?.value).toBeTruthy();

    await page.goto('/cards');
    await page.goto('/rewards');

    const after = (await context.cookies()).find((cookie) => cookie.name === 'nw_corr');
    expect(after?.value).toBe(before?.value);
  });

  test('restores the session after a reload without asking for MFA again', async ({ page }) => {
    await signIn(page);
    await page.reload();

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: /good (morning|afternoon|evening)/i })).toBeVisible();
  });
});
