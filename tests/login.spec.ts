import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

const validUsername = process.env.STANDARD_USER ?? 'standard_user';
const validPassword = process.env.STANDARD_PASSWORD ?? 'secret_sauce';
const invalidPassword = 'wrong_password';
const lockedOutUser = 'locked_out_user';

test.describe('Login Feature', () => {

  test.use({ storageState: undefined });

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto('/'); 
  });

  test('should login successfully with valid credentials', async () => {
    await loginPage.login(validUsername, validPassword);
    await inventoryPage.expectInventoryPageLoaded();
  });

  test('should show error message with invalid password', async ({ page }) => {
    await loginPage.login(validUsername, invalidPassword);
    const msg = await loginPage.getErrorMessage();
    expect(msg).toContain('Username and password do not match any user in this service');
    await expect(page).toHaveURL('/');
  });

  test('should show error message for locked out user', async ({ page }) => {
    await loginPage.login(lockedOutUser, validPassword);
    const msg = await loginPage.getErrorMessage();
    expect(msg).toContain('Sorry, this user has been locked out.');
    await expect(page).toHaveURL('/');
  });

  test('should show error message for missing password', async ({ page }) => {
    await loginPage.usernameInput.fill(validUsername);
    await loginPage.loginButton.click();
    const msg = await loginPage.getErrorMessage();
    expect(msg).toContain('Password is required');
    await expect(page).toHaveURL('/');
  });

  test('should show error message for missing username', async ({ page }) => {
    await loginPage.passwordInput.fill(validPassword);
    await loginPage.loginButton.click();
    const msg = await loginPage.getErrorMessage();
    expect(msg).toContain('Username is required');
    await expect(page).toHaveURL('/');
  });
});
