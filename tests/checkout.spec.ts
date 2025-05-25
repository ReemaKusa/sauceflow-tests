import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutStepOnePage } from '../pages/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

const itemToCheckout = 'Sauce Labs Onesie';

const checkoutInfo = [
  { firstName: 'Test', lastName: 'User', postalCode: '12345' },
];

test.describe('Checkout Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let stepOne: CheckoutStepOnePage;
  let stepTwo: CheckoutStepTwoPage;
  let completePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    
    await page.goto('/inventory.html');
    inventoryPage = new InventoryPage(page);
    cartPage      = new CartPage(page);
    stepOne       = new CheckoutStepOnePage(page);
    stepTwo       = new CheckoutStepTwoPage(page);
    completePage  = new CheckoutCompletePage(page);

    await inventoryPage.expectInventoryPageLoaded();
    await inventoryPage.addItemToCart(itemToCheckout);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    await inventoryPage.goToCart();
    await cartPage.expectCartPageLoaded();

    await cartPage.expectItemToBeInCart(itemToCheckout);
  });

  for (const info of checkoutInfo) {
    test(`completes checkout with ${info.firstName} ${info.lastName}`, async () => {


      await cartPage.goToCheckout();
      await stepOne.expectCheckoutStepOnePageLoaded();

      await stepOne.fillInformation(info.firstName, info.lastName, info.postalCode);
      await stepOne.continueCheckout();

      await stepTwo.expectCheckoutStepTwoPageLoaded();
      await stepTwo.expectItemInSummary(itemToCheckout);

      await stepTwo.finishCheckout();

      await completePage.expectCheckoutCompletePageLoaded();
      expect(await completePage.getCompleteHeaderText()).toBe('Thank you for your order!');

      await completePage.goBackHome();
      await inventoryPage.expectInventoryPageLoaded();
      expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    });
  }

  test('shows error when required info is missing', async () => {

    await cartPage.goToCheckout();
    await stepOne.expectCheckoutStepOnePageLoaded();
    await stepOne.continueCheckout();

    const error = await stepOne.getErrorMessage();
    expect(error).toContain('Error: First Name is required');
    await stepOne.expectCheckoutStepOnePageLoaded();
  });
});
