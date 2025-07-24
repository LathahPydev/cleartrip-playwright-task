import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import inputData from '../test-data/inputData.json' assert { type: 'json' };

class SearchFlightsTest {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
  }
}

  test.describe('Cleartrip Roundtrip Booking', () => {
    test('should search for roundtrip flights', async ({ page }) => {
      test.setTimeout(600000);
      const searchFlightsTest = new SearchFlightsTest(page);
      const today = new Date();
      const returnDateObj = new Date();
      returnDateObj.setDate(today.getDate() + 2);

      const departDate = today.toDateString();         // e.g. "Wed Jul 23 2025"
      const returnDate = returnDateObj.toDateString(); // e.g. "Fri Jul 25 2025"

      await test.step('Navigate to Cleartrip home page', async () => {
        await searchFlightsTest.homePage.navigateHomepage();
      });

      await test.step('Select Trip Type:', async () => {
      await page.getByText('One way', { exact: true }).first().click();
      await page.waitForSelector('text=Round trip', { state: 'visible' });
      await page.getByText('Round trip', { exact: true }).first().click();
      });

      await test.step("Enter 'From' City: ${inputData.from}", async () => {
        await searchFlightsTest.homePage.enterFrom(inputData.from);
      });

      await test.step("Enter 'To' City: ${inputData.to}", async () => {
        await searchFlightsTest.homePage.enterTo(inputData.to);
      });

      await test.step("Pick Departure Date and Return Date: ${departDate} abd ${returnDate}", async () => {
        await page.waitForTimeout(5);
        await searchFlightsTest.homePage.pickDates(departDate, returnDate);      
      });

      await test.step('Search Flights', async () => {
        await searchFlightsTest.homePage.searchFlights();
      });

      await test.step('Validate search results', async () => {
        await page.waitForTimeout(600);
        await expect(page.getByText("Flight Details")).toBeVisible({ timeout: 60000 });
      });
    });
});
