import { BasePage } from './BasePage';

export const loginSelectors = {
  loginForm: 'form:has([data-qa="login-button"])',
  emailInput: '[data-qa="login-email"]',
  passwordInput: '[data-qa="login-password"]',
  submitButton: '[data-qa="login-button"]',
  errorMessage: 'p:contains("Your email or password is incorrect")',
  signupForm: 'form:has([data-qa="signup-button"])',
  signupName: '[data-qa="signup-name"]',
  signupEmail: '[data-qa="signup-email"]',
  signupButton: '[data-qa="signup-button"]',
  loggedInText: 'a:contains("Logged in as")',
  logoutLink: 'a[href="/logout"]',
} as const;

export class LoginPage extends BasePage {
  readonly url = '/login';
  readonly elements = loginSelectors;

  fillLoginEmail(email: string): void {
    cy.get(this.elements.emailInput).clear().type(email);
  }

  fillLoginPassword(password: string): void {
    cy.get(this.elements.passwordInput).clear().type(password);
  }

  clickLogin(): void {
    cy.get(this.elements.submitButton).click();
  }

  login(email: string, password: string): void {
    this.fillLoginEmail(email);
    this.fillLoginPassword(password);
    this.clickLogin();
  }

  assertLoggedIn(): void {
    cy.get(this.elements.loggedInText).should('be.visible');
  }

  assertLoginError(): void {
    cy.contains('Your email or password is incorrect!').should('be.visible');
  }

  logout(): void {
    cy.get(this.elements.logoutLink).click();
  }

  fillSignupName(name: string): void {
    cy.get(this.elements.signupName).clear().type(name);
  }

  fillSignupEmail(email: string): void {
    cy.get(this.elements.signupEmail).clear().type(email);
  }

  clickSignup(): void {
    cy.get(this.elements.signupButton).click();
  }
}
