import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  globalSetup: './global-setup', // confirm this path and extension matches your file
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'state.json',   // default logged-in state for tests except login.spec.ts disables it
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
  ],
});
