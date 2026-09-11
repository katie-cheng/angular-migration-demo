import { expect, test } from '@playwright/test';

import { capturedTelemetry, readSession, signIn } from './fixtures';

test.describe('analytics', () => {
  test('sends nothing until consent is granted', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('nw.consent', JSON.stringify({ analytics: false })));
    await signIn(page);
    await page.goto('/rewards');

    const session = await readSession(page);
    const correlationId = String((session as any)?.correlationId);
    const batches = await capturedTelemetry(page, correlationId);
    const names = batches.flatMap((batch) => (batch.events || []).map((event) => event.name));
    expect(names).not.toContain('page_view');
  });

  test('records a page view per navigation once consent is granted', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('nw.consent', JSON.stringify({ analytics: true })));
    await signIn(page);
    await page.goto('/cards');
    await page.goto('/statements');

    await expect
      .poll(async () => {
        const batches = await capturedTelemetry(page);
        return batches.flatMap((batch) => (batch.events || []).map((event) => event.name)).filter((name) => name === 'page_view').length;
      }, { timeout: 20_000 })
      .toBeGreaterThanOrEqual(2);
  });

  test('flushes the queue when the tab is hidden', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('nw.consent', JSON.stringify({ analytics: true })));
    await signIn(page);

    const before = (await capturedTelemetry(page)).length;
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await expect.poll(async () => (await capturedTelemetry(page)).length, { timeout: 20_000 }).toBeGreaterThan(before);
  });
});
