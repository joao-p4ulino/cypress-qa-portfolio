import { LoginPage } from '../../../pages/automation-exercise/LoginPage';

const loginPage = new LoginPage();
const BASE = 'https://automationexercise.com';

describe('AutomationExercise — Login', () => {
  beforeEach(() => {
    cy.visit(`${BASE}/login`);
  });

  describe('Page elements', () => {
    it('displays the login form', () => {
      cy.get(loginPage.elements.loginForm).should('be.visible');
    });

    it('displays email and password inputs', () => {
      cy.get(loginPage.elements.emailInput).should('be.visible');
      cy.get(loginPage.elements.passwordInput).should('be.visible');
    });

    it('displays the Login button', () => {
      cy.get(loginPage.elements.submitButton).should('be.visible');
    });
  });

  describe('Invalid credentials', () => {
    it('shows an error message with wrong credentials', () => {
      cy.fixture('automation-exercise/users').then(({ invalidUser }) => {
        loginPage.login(invalidUser.email, invalidUser.password);
        loginPage.assertLoginError();
      });
    });

    it('shows an error message with empty email', () => {
      cy.get(loginPage.elements.passwordInput).type('somepassword');
      cy.get(loginPage.elements.submitButton).click();
      cy.get(loginPage.elements.emailInput).then(($el) => {
        expect(($el[0] as HTMLInputElement).validity.valid).to.be.false;
      });
    });
  });

  describe('Login page URL', () => {
    it('serves the login page on /login', () => {
      cy.url().should('include', '/login');
    });
  });
});
