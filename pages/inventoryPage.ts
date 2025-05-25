import { type Locator, type Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly sortDropdown: Locator;
  readonly addToCartButton: (itemName: string) => Locator;
  readonly removeFromCartButton: (itemName: string) => Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');

    this.addToCartButton = (itemName: string) => 
        page.locator(`.inventory_item:has-text("${itemName}") button[data-test^="add-to-cart-"]`);


    this.removeFromCartButton = (itemName: string) => 
        page.locator(`.inventory_item:has-text("${itemName}") button[data-test^="remove-"]`);
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.inventoryItemPrice = page.locator('.inventory_item_price');
  }

  async addItemToCart(itemName: string) {
    await this.addToCartButton(itemName).click();
  }

  async removeItemFromCart(itemName: string) {
    await this.removeFromCartButton(itemName).click();
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async sortItems(optionValue: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryItemName.allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrice.allTextContents();

    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async expectInventoryPageLoaded() {

    await expect(this.inventoryList).toBeVisible();

    await expect(this.page).toHaveURL(/.*inventory.html/);
  }
}

