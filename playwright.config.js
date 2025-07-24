// This file sets up global test settings and behaviors for Playwright.
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://www.cleartrip.com/',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    timeout: 900000,
    launchOptions: {
        args: ['--start-maximized']
    },
    viewport: null,
  },
  reporter: [['list'], ['html', { open: 'never', outputFolder: './reports' }]],
});


