import { BasePage } from './BasePage';

export const loginSelectors = {
  emailInput: '#ap_email_login, #ap_email',
  continueButton: '#continue, input[type="submit"]',
  passwordInput: '#ap_password',
  signInButton: '#signInSubmit',
  errorMessage: '.a-alert-content, #auth-error-message-box',
  legalText: 'a[href*="gp/help"]',
  pageTitle: 'h1',
  logoLink: 'a[href*="ref=ap_frn_logo"]',
} as const;

export class LoginPage extends BasePage {
  readonly url = '/gp/sign-in.html';
  readonly elements = loginSelectors;

  assertPageTitleVisible(): void {
    cy.get(this.elements.pageTitle).should('be.visible');
  }

  assertEmailFieldVisible(): void {
    cy.get(this.elements.emailInput).first().should('be.visible');
  }

  fillEmail(email: string): void {
    cy.get(this.elements.emailInput).first().clear().type(email);
  }

  clickContinue(): void {
    cy.get(this.elements.continueButton).first().click();
  }

  fillPassword(password: string): void {
    cy.get(this.elements.passwordInput).first().clear().type(password);
  }

  clickSignIn(): void {
    cy.get(this.elements.signInButton).first().click();
  }

  assertErrorMessageVisible(): void {
    cy.get(this.elements.errorMessage).should('be.visible');
  }

  assertLegalTextExists(): void {
    cy.get(this.elements.legalText).first().should('exist');
  }

  submitEmptyForm(): void {
    cy.get(this.elements.continueButton).first().click();
  }

  assertLogoLinkExists(): void {
    cy.get(this.elements.logoLink).should('exist');
  }
}
