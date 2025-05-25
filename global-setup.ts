// global-setup.ts
import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[data-test="username"]', process.env.STANDARD_USER!);
  await page.fill('input[data-test="password"]', process.env.STANDARD_PASSWORD!);
  await page.click('input[data-test="login-button"]');

  // Ensure we're logged in
  await page.waitForURL('**/inventory.html');

  await context.storageState({ path: 'state.json' });
  await browser.close();
}

export default globalSetup;
