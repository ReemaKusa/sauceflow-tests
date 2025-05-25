import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Add to Cart Feature', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {

    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
    await inventoryPage.expectInventoryPageLoaded();
  });

  test('should add a single item to the cart', async () => {
    const itemName = 'Sauce Labs Backpack';

    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

    await inventoryPage.addItemToCart(itemName);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    await expect(inventoryPage.removeFromCartButton(itemName)).toBeVisible();
    await expect(inventoryPage.addToCartButton(itemName)).not.toBeVisible();
  });

  test('should add multiple items to the cart', async () => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    for (const item of items) {
      await inventoryPage.addItemToCart(item);
    }
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    for (const item of items) {
      await expect(inventoryPage.removeFromCartButton(item)).toBeVisible();
    }
  });

  test('should persist cart contents after navigating away and back', async ({ page }) => {
    const itemName = 'Sauce Labs Fleece Jacket';

    await inventoryPage.addItemToCart(itemName);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    await inventoryPage.goToCart();
    await page.goto('/inventory.html');

    await inventoryPage.expectInventoryPageLoaded();

    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await expect(inventoryPage.removeFromCartButton(itemName)).toBeVisible();
  });
});
