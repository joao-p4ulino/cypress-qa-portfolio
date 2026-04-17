import { LoginPage } from '../../../pages/amazon/LoginPage';

const login = new LoginPage();

describe('Amazon — Login Page Exploration', () => {
  beforeEach(() => {
    login.visit();
  });

  describe('Page elements', () => {
    it('displays the login page title', () => {
      login.assertPageTitleVisible();
    });

    it('displays the email input field', () => {
      login.assertEmailFieldVisible();
    });

    it('displays the Continue button', () => {
      cy.get(login.elements.continueButton).first().should('be.visible');
    });

    it('displays legal text links', () => {
      login.assertLegalTextExists();
    });

    it('displays the Amazon logo link', () => {
      login.assertLogoLinkExists();
    });
  });

  describe('Email field validation', () => {
    it('shows an error or keeps the field when submitting empty form', () => {
      login.submitEmptyForm();
      cy.get(login.elements.emailInput).first().should('be.visible');
    });

    it('accepts a valid email format and proceeds', () => {
      cy.fixture('amazon/forms').then((_data) => {
        login.fillEmail('teste@exemplo.com');
        login.clickContinue();
        cy.get('body').should('be.visible');
        // Amazon may redirect to password step or show error for unknown email — both are valid
        cy.url().should('include', 'amazon.com.br');
      });
    });

    it('accepts typing an invalid email format', () => {
      cy.fixture('amazon/forms').then(({ invalidLogin }) => {
        login.fillEmail(invalidLogin.invalidEmail);
        cy.get(login.elements.emailInput).first().should('have.value', invalidLogin.invalidEmail);
      });
    });
  });

  describe('Page links', () => {
    it('contains a help link', () => {
      cy.contains('a', /ajuda|help/i).should('exist');
    });

    it('contains terms and privacy links', () => {
      cy.contains('a', /condi|termos|privacidade/i).should('exist');
    });
  });

  describe('Security', () => {
    it('serves the page over HTTPS', () => {
      cy.url().should('match', /^https:\/\//);
    });

    it('keeps the domain as amazon.com.br', () => {
      cy.assertUrlContains('amazon.com.br');
    });
  });
});
