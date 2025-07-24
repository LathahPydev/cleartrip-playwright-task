// utils/helpers.js

class Helpers {
  static async waitAndType(page, selector, text) {
    await page.waitForSelector(selector, { state: 'visible' });
    await page.fill(selector, text);
    await page.waitForTimeout(2000);
    await page.waitForSelector(`text=${text}`);
    await page.getByText(text, { exact: false }).first().click();
  }

  static async waitAndClick(page, selector) {
    await page.waitForSelector(selector, { state: 'attached' });
    await page.click(selector);

  }

  static async selectDate(page, datePickerSelector, departDate, returnDate) {
    await page.click(datePickerSelector);
    await page.waitForSelector(`div[aria-label="${departDate}"]`, { state: 'visible'});    
    await page.locator(`div[aria-label="${departDate}"]`).click();
    // await page.waitForTimeout(100);
    await page.waitForSelector(`div[aria-label="${returnDate}"]`, { state: 'visible'});    
    await page.locator(`div[aria-label="${returnDate}"]`).click();
  }
}

export default Helpers;
