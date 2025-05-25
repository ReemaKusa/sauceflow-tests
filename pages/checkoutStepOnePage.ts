import { type Locator, type Page, expect } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async expectCheckoutStepOnePageLoaded() {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    await expect(this.firstNameInput).toBeVisible(); 
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }

  
}

