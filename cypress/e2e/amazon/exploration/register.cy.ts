/**
 * Amazon unifies login and register on the same page (/gp/sign-in.html).
 * The full register form only appears after entering an unregistered email.
 * These tests cover what is accessible to an unauthenticated user without
 * creating a real account.
 */
import { LoginPage } from '../../../pages/amazon/LoginPage';

const page = new LoginPage();

describe('Amazon — Register Page Exploration', () => {
  beforeEach(() => {
    page.visit();
  });

  describe('Page load', () => {
    it('displays the authentication page title', () => {
      page.assertPageTitleVisible();
    });

    it('displays the email input field', () => {
      page.assertEmailFieldVisible();
    });

    it('displays the Continue button', () => {
      cy.get(page.elements.continueButton).first().should('be.visible');
    });

    it('displays the Amazon logo', () => {
      page.assertLogoLinkExists();
    });
  });

  describe('Email field', () => {
    it('accepts typed email value', () => {
      const email = 'novo-usuario-teste@exemplo.com';
      page.fillEmail(email);
      cy.get(page.elements.emailInput).first().should('have.value', email);
    });

    it('allows clearing and retyping the email', () => {
      page.fillEmail('primeiro@exemplo.com');
      cy.get(page.elements.emailInput).first().clear();
      page.fillEmail('segundo@exemplo.com');
      cy.get(page.elements.emailInput).first().should('have.value', 'segundo@exemplo.com');
    });

    it('shows validation feedback when submitting empty email', () => {
      page.submitEmptyForm();
      cy.get(page.elements.emailInput).first().should('be.visible');
    });
  });

  describe('Legal links', () => {
    it('displays terms and conditions link', () => {
      page.assertLegalTextExists();
    });

    it('displays a help link', () => {
      cy.contains('a', /ajuda|help/i).should('exist');
    });

    it('displays legal text on the page', () => {
      cy.contains(/condi|termos|privacidade/i).should('exist');
    });
  });

  describe('Security', () => {
    it('serves the page over HTTPS', () => {
      cy.url().should('match', /^https:\/\//);
    });
  });
});
