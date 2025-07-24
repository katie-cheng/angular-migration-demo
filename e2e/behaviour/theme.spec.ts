import { expect, test } from '@playwright/test';

import { signIn } from './fixtures';

/**
 * Visual contract for the Material MDC migration: brand colour, control
 * height and dialog chrome must survive the rewrite.
 */
test.describe('theme', () => {
  test('keeps the brand colour on the toolbar', async ({ page }) => {
    await signIn(page);
    const toolbar = page.locator('mat-toolbar').first();
    const background = await toolbar.evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(background).toBe('rgb(0, 51, 102)');
  });

  test('keeps primary buttons at the expected height', async ({ page }) => {
    await signIn(page);
    const button = page.getByRole('button', { name: /move money/i });
    const box = await button.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(32);
    expect(box!.height).toBeLessThanOrEqual(48);
  });

  test('renders the dashboard without visual regression', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'baseline captured on desktop only');

    await signIn(page);
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('dashboard.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});
