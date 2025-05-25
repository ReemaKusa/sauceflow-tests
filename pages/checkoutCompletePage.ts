import { type Locator, type Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('.pony_express');
  }

  async expectCheckoutCompletePageLoaded() {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.ponyExpressImage).toBeVisible();
  }

  async getCompleteHeaderText(): Promise<string | null> {
    return this.completeHeader.textContent();
  }

  async getCompleteText(): Promise<string | null> {
    return this.completeText.textContent();
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }

  async expectThankYouMessage() {
  await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
}

}

