import { expect, test } from '@playwright/test';

import { signIn } from './fixtures';

/**
 * These assertions encode the layout contract that the flex-layout removal
 * must preserve: the same things are visible, stacked and reachable at each
 * breakpoint after the migration as before it.
 */
test.describe('responsive layout', () => {
  test('stacks the dashboard into one column on a phone', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'phone viewport only');

    await signIn(page);
    const tiles = page.locator('bk-account-tile');
    await expect(tiles.first()).toBeVisible();

    const first = await tiles.nth(0).boundingBox();
    const second = await tiles.nth(1).boundingBox();
    expect(second!.y).toBeGreaterThan(first!.y + first!.height - 4);
  });

  test('puts the dashboard side by side on a desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'desktop viewport only');

    await signIn(page);
    await expect(page.locator('bk-quick-actions')).toBeVisible();
    await expect(page.locator('bk-recent-activity')).toBeVisible();

    const activity = await page.locator('bk-recent-activity').boundingBox();
    const actions = await page.locator('bk-quick-actions').boundingBox();
    expect(actions!.x).toBeGreaterThan(activity!.x + activity!.width - 4);
  });

  test('hides the sidenav behind a toggle below the tablet breakpoint', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'desktop', 'narrow viewports only');

    await signIn(page);
    const toggle = page.getByRole('button', { name: /menu/i });
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(page.getByRole('link', { name: /accounts/i }).first()).toBeVisible();
  });

  test('keeps the primary call to action reachable at every width', async ({ page }) => {
    await signIn(page);
    await expect(page.getByRole('button', { name: /move money/i })).toBeVisible();
  });
});
