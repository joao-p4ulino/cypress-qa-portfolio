export const AE_BASE_URL = 'https://automationexercise.com';

export abstract class BasePage {
  abstract readonly url: string;

  visit(): void {
    cy.visit(this.url);
  }
}
