import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Sort Feature', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    
    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
    await inventoryPage.expectInventoryPageLoaded();
  });

  
  test('should sort items by Name (A to Z)', async () => {
    await inventoryPage.sortItems('az');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort());

  });

  test('should sort items by Name (Z to A)', async () => {
    await inventoryPage.sortItems('za');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('should sort items by Price (low to high)', async () => {
    await inventoryPage.sortItems('lohi');
    const prices = await inventoryPage.getItemPrices();

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('should sort items by Price (high to low)', async () => {

    await inventoryPage.sortItems('hilo');
    const prices = await inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
