import { Page, expect } from '@playwright/test';

export const CREDENTIALS = { username: 'dana.whitfield', password: 'correct-horse' };
export const MFA_CODE = '123456';

export async function signIn(page: Page, options: { mfa?: boolean } = {}): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Username').fill(CREDENTIALS.username);
  await page.getByLabel('Password').fill(CREDENTIALS.password);
  await page.getByRole('button', { name: /sign in/i }).click();

  if (options.mfa !== false) {
    await expect(page).toHaveURL(/step-up/);
    await page.getByRole('button', { name: /send code/i }).click();
    await page.getByLabel('6-digit code').fill(MFA_CODE);
    await page.getByRole('button', { name: /verify/i }).click();
  }

  await expect(page).toHaveURL(/dashboard/);
}

export async function readSession(page: Page): Promise<Record<string, unknown> | null> {
  const raw = await page.evaluate(() => window.localStorage.getItem('nw.session'));
  return raw ? JSON.parse(raw) : null;
}

export async function capturedTelemetry(
  page: Page,
  correlationId?: string
): Promise<Array<{ events: Array<{ name: string; correlationId?: string }> }>> {
  const response = await page.request.get('http://localhost:4300/api/telemetry/_captured');
  const batches = (await response.json()) as Array<{
    events: Array<{ name: string; correlationId?: string }>;
  }>;
  if (!correlationId) {
    return batches;
  }
  // The collector is shared by every worker, so scope to this session.
  return batches
    .map((batch) => ({
      ...batch,
      events: (batch.events || []).filter((event) => event.correlationId === correlationId),
    }))
    .filter((batch) => batch.events.length > 0);
}
