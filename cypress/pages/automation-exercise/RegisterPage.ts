import { BasePage } from './BasePage';

export const registerSelectors = {
  nameInput: '[data-qa="name"]',
  emailInput: '[data-qa="email"]',
  passwordInput: '[data-qa="password"]',
  firstNameInput: '[data-qa="first_name"]',
  lastNameInput: '[data-qa="last_name"]',
  addressInput: '[data-qa="address"]',
  countrySelect: '[data-qa="country"]',
  stateInput: '[data-qa="state"]',
  cityInput: '[data-qa="city"]',
  zipcodeInput: '[data-qa="zipcode"]',
  mobileInput: '[data-qa="mobile_number"]',
  createAccountButton: '[data-qa="create-account"]',
  continueButton: '[data-qa="continue-button"]',
  accountCreatedTitle: '[data-qa="account-created"]',
  deleteAccountButton: '[data-qa="delete-account"]',
  accountDeletedTitle: '[data-qa="account-deleted"]',
} as const;

export class RegisterPage extends BasePage {
  readonly url = '/login';
  readonly elements = registerSelectors;

  fillAccountInfo(password: string): void {
    cy.get(this.elements.passwordInput).clear().type(password);
  }

  fillAddressInfo(data: {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }): void {
    cy.get(this.elements.firstNameInput).clear().type(data.firstName);
    cy.get(this.elements.lastNameInput).clear().type(data.lastName);
    cy.get(this.elements.addressInput).clear().type(data.address);
    cy.get(this.elements.countrySelect).select(data.country);
    cy.get(this.elements.stateInput).clear().type(data.state);
    cy.get(this.elements.cityInput).clear().type(data.city);
    cy.get(this.elements.zipcodeInput).clear().type(data.zipcode);
    cy.get(this.elements.mobileInput).clear().type(data.mobile);
  }

  clickCreateAccount(): void {
    cy.get(this.elements.createAccountButton).click();
  }

  assertAccountCreated(): void {
    cy.get(this.elements.accountCreatedTitle).should('be.visible');
  }

  clickContinue(): void {
    cy.get(this.elements.continueButton).click();
  }

  deleteAccount(): void {
    cy.visit('https://automationexercise.com/delete_account');
    cy.get(this.elements.accountDeletedTitle).should('be.visible');
  }
}
