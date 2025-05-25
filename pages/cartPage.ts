import { type Locator, type Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemList: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: (itemName: string) => Locator;
  readonly cartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemList = page.locator('.cart_list');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');

    this.removeButton = (itemName: string) => 
        page.locator(`.cart_item:has-text("${itemName}") button[data-test^="remove-"]`);
    this.cartItem = page.locator('.cart_item');
  }

  async removeItem(itemName: string) {
    await this.removeButton(itemName).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async expectCartPageLoaded() {
    await expect(this.page).toHaveURL(/.*cart.html/);
    await expect(this.cartItemList).toBeVisible();
  }

  async expectItemToBeInCart(itemName: string) {
    await expect(this.cartItem.filter({ hasText: itemName })).toBeVisible();
  }

  async expectItemToBeRemovedFromCart(itemName: string) {
    await expect(this.cartItem.filter({ hasText: itemName })).not.toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItem.count();
  }
  
}

