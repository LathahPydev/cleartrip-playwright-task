// pages/HomePage.js
import { test, expect } from '@playwright/test';
import Helpers from '../utils/helpers.js';

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.closeIcon = "[data-testid='closeIcon']";
    this.fromInput = '//input[@placeholder="Where from?"]';
    this.toInput = '//input[@placeholder="Where to?"]';
    this.departDate = 'div[data-testid="dateSelectOnward"]';
    this.returnDate = 'div[data-testid="dateSelectReturn"]';
    this.searchBtn = 'button:has-text("Search flights")';
    this.hotelsMenu ="//p[text()='Hotels']";
    this.busMenu = "//p[text()='Buses']";
  }

  async navigateHomepage() {
    await test.step('Navigate to Cleartrip home page', async () => {
      await this.page.goto('/', { waitUntil: 'networkidle' });
      await expect(this.page).toHaveURL(/cleartrip\.com/);
      await Helpers.waitAndClick(this.page, this.closeIcon);
    });
  }

  async clickOnHotels() {
    await test.step('Click on Hotels Menu:', async () => {
      await Helpers.waitAndClick(this.page, this.hotelsMenu);
    });
  }

    async clickOnBuses() {
      await test.step('Click on Buses Menu:', async () => {
      await Helpers.waitAndClick(this.page, this.busMenu);
    });
  }

  async enterFrom(city) {
    await Helpers.waitAndType(this.page, this.fromInput, city);
   
  }

  async enterTo(city) {
    await Helpers.waitAndType(this.page, this.toInput, city);
    
  }

  async pickDates(departDate, returnDate) {
    await Helpers.selectDate(this.page, this.departDate, departDate, returnDate);
  }

  async pickReturnDate(date) {
    await Helpers.selectDate(this.page, this.returnDate, date);
  }

  async searchFlights() {
    await Helpers.waitAndClick(this.page, this.searchBtn);
  }
}
