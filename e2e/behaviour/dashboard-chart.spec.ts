import { expect, test } from '@playwright/test';

import { signIn } from './fixtures';

/**
 * The spend-breakdown trend chart moved off the View Engine
 * `@northwind/legacy-charts` package onto `bk-sparkline` in `ui-kit`. These
 * assertions pin the rendered output so the swap stays behaviour preserving.
 */
test.describe('spend breakdown chart', () => {
  test('renders the trend sparkline on the dashboard', async ({ page }) => {
    await signIn(page);

    const sparkline = page.locator('bk-spend-breakdown bk-sparkline');
    await expect(sparkline).toHaveCount(1);

    const polyline = sparkline.locator('polyline');
    await expect(polyline).toHaveAttribute('stroke', '#003366');

    const points = await polyline.getAttribute('points');
    expect(points).toBeTruthy();
    const parsed = points!.split(' ').map((point) => point.split(',').map(Number));
    expect(parsed.length).toBeGreaterThan(1);
    for (const [x, y] of parsed) {
      expect(Number.isFinite(x)).toBe(true);
      expect(Number.isFinite(y)).toBe(true);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(30);
    }
    expect(parsed.map(([x]) => x)).toEqual([...parsed.map(([x]) => x)].sort((a, b) => a - b));
  });

  test('labels the trend chart for assistive technology', async ({ page }) => {
    await signIn(page);

    await expect(page.locator('bk-spend-breakdown bk-sparkline svg')).toHaveAttribute(
      'aria-label',
      'Spending trend'
    );
  });
});
