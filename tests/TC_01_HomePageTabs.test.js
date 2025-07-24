// tests/roundtripBooking.test.js

import { test as base, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';

class HomepageTabsTest {
  constructor(page) {
    this.page = page;
    this.hotelSearch = "//h3[contains(text(),'Search hotels')]";
    this.busesSearch = "//p[contains(text(),'Search buses')]";
    this.homePage = new HomePage(page);
  }
}

const test = base.extend({
  homepageTabsTest: async ({ page }, use, testInfo) => {
    testInfo.setTimeout(60000)
    const homepageTabsTest = new HomepageTabsTest(page);
    await homepageTabsTest.homePage.navigateHomepage();
    await use(homepageTabsTest);
  },
});


test.describe('Hotels Homepage Verification', () => {
  test('Verify hotels homepage launched successfully', async ({ page, homepageTabsTest }) => {

    await homepageTabsTest.homePage.clickOnHotels();

    await test.step('Validate hotels search results', async () => {
        await expect(page).toHaveURL("/hotels");
    await expect(page.locator(homepageTabsTest.hotelSearch)).toBeVisible({timeout: 10000});
    });
  });
});


test.describe('Buses Homepage Verification', () => {
  test('Verify buses homepage launched successfully', async ({ page, homepageTabsTest }) => {

    await homepageTabsTest.homePage.clickOnBuses();

    await test.step('Validate bus search results', async () => {
        await expect(page).toHaveURL("/bus");
    await expect(page.locator(homepageTabsTest.busesSearch)).toBeVisible({timeout: 10000});
    });
  });
});
