import { CommonPage } from '../../../pages/amazon/CommonPage';
import { FooterPage } from '../../../pages/amazon/FooterPage';

const common = new CommonPage();
const footer = new FooterPage();

describe('Amazon — Footer Exploration', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
    cy.scrollTo('bottom');
  });

  describe('Visible elements', () => {
    it('displays the footer', () => {
      footer.assertFooterExists();
    });

    it('displays the Back to Top button', () => {
      footer.assertBackToTopVisible();
    });

    it('displays footer link columns', () => {
      footer.assertColumnsExist();
    });

    it('displays footer navigation links', () => {
      footer.assertLinksExist();
    });

    it('displays the copyright text', () => {
      footer.assertCopyrightExists();
    });
  });

  describe('Footer functionality', () => {
    it('scrolls to top when clicking Back to Top', () => {
      footer.clickBackToTop();
      cy.window().its('scrollY').should('eq', 0);
    });

    it('contains Terms of Use link', () => {
      cy.get(footer.elements.footer).within(() => {
        cy.contains(/termos|conditions|condi/i).should('exist');
      });
    });

    it('contains Privacy Policy link', () => {
      cy.get(footer.elements.footer).within(() => {
        cy.contains(/privacidade|privacy/i).should('exist');
      });
    });

    it('contains Help link', () => {
      cy.get(footer.elements.footer).within(() => {
        cy.contains(/ajuda|help/i).should('exist');
      });
    });
  });
});
