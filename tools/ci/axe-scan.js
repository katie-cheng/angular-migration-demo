'use strict';

/**
 * Accessibility sweep over the routes that matter most. Advisory today:
 * the baseline has known violations that the upgrade work is expected to
 * reduce rather than fix outright.
 */
const { chromium } = require('@playwright/test');
const { createApp } = require('../mock-backend/server');

const ROUTES = ['/login', '/dashboard', '/accounts', '/transfers', '/statements'];
const BASE_URL = process.env.AXE_BASE_URL || 'http://localhost:4200';

async function main() {
  const server = createApp().listen(4300);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];

  try {
    for (const route of ROUTES) {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle' });
      await page.addScriptTag({ path: require.resolve('axe-core') });
      const report = await page.evaluate(async () => await window.axe.run());
      results.push({ route, violations: report.violations.length });
      console.log(route + ': ' + report.violations.length + ' violations');
    }
  } finally {
    await browser.close();
    server.close();
  }

  const total = results.reduce((sum, entry) => sum + entry.violations, 0);
  console.log('\nTotal violations: ' + total);
  process.exit(process.env.STRICT === '1' && total > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
