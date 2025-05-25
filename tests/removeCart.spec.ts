import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

const itemToRemove = 'Sauce Labs Bolt T-Shirt';

test.describe('Remove From Cart Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {

    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
    cartPage      = new CartPage(page);
    await inventoryPage.expectInventoryPageLoaded();

    await inventoryPage.addItemToCart(itemToRemove);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  test('should remove item from cart via Inventory Page', async () => {
    await inventoryPage.removeItemFromCart(itemToRemove);

    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    await expect(inventoryPage.addToCartButton(itemToRemove)).toBeVisible();
    await expect(inventoryPage.removeFromCartButton(itemToRemove)).not.toBeVisible();

    await inventoryPage.goToCart();
    await cartPage.expectCartPageLoaded();
    expect(await cartPage.getCartItemCount()).toBe(0);
  });

  test('should remove item from cart via Cart Page', async () => {
    await inventoryPage.goToCart();
    await cartPage.expectCartPageLoaded();

    await cartPage.expectItemToBeInCart(itemToRemove);
    expect(await cartPage.getCartItemCount()).toBe(1);

    await cartPage.removeItem(itemToRemove);
    await cartPage.expectItemToBeRemovedFromCart(itemToRemove);
    expect(await cartPage.getCartItemCount()).toBe(0);

    // Back home, badge is 0
    await cartPage.continueShopping();
    await inventoryPage.expectInventoryPageLoaded();
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    await expect(inventoryPage.addToCartButton(itemToRemove)).toBeVisible();
  });
});
