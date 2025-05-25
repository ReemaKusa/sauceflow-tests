import { type Locator, type Page, expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly summaryInfo: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly cartItemList: Locator; 
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.summaryInfo = page.locator('.summary_info');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.cartItemList = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async expectCheckoutStepTwoPageLoaded() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
    await expect(this.summaryInfo).toBeVisible(); 
  }

  async expectItemInSummary(itemName: string) {
    await expect(this.cartItemList.filter({ hasText: itemName })).toBeVisible();
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.totalLabel.textContent();

    const priceMatch = totalText?.match(/\$\d+\.\d+/);
    return priceMatch ? parseFloat(priceMatch[0].replace('$', '')) : 0;
  }
}

