import { CommonPage } from '../../../pages/amazon/CommonPage';
import { HeaderPage } from '../../../pages/amazon/HeaderPage';
import { SearchResultsPage } from '../../../pages/amazon/SearchResultsPage';
import { VIEWPORTS } from '../../../support/utils/viewports';

const common = new CommonPage();
const header = new HeaderPage();
const search = new SearchResultsPage();

describe('Amazon — Responsive Layout Exploration', () => {
  describe(`Mobile portrait — ${VIEWPORTS.MOBILE_PORTRAIT.width}×${VIEWPORTS.MOBILE_PORTRAIT.height}`, () => {
    beforeEach(() => {
      const { width, height } = VIEWPORTS.MOBILE_PORTRAIT;
      cy.viewport(width, height);
      cy.visit('/');
      common.acceptCookies();
    });

    it('displays the header adapted to mobile', () => {
      header.assertHeaderVisible();
    });

    it('shows the search input in mobile', () => {
      cy.get(header.elements.searchInput).should('exist');
    });

    it('shows the hamburger menu in mobile', () => {
      cy.get(header.elements.hamburgerMenu).should('be.visible');
    });

    it('allows searching in mobile', () => {
      search.searchProduct('notebook');
      cy.assertUrlContains('k=notebook');
    });

    it('shows the footer in mobile', () => {
      cy.scrollTo('bottom');
      cy.get(common.elements.footer).should('exist');
    });
  });

  describe(`Tablet portrait — ${VIEWPORTS.TABLET_PORTRAIT.width}×${VIEWPORTS.TABLET_PORTRAIT.height}`, () => {
    beforeEach(() => {
      const { width, height } = VIEWPORTS.TABLET_PORTRAIT;
      cy.viewport(width, height);
      cy.visit('/');
      common.acceptCookies();
    });

    it('displays the header in tablet', () => {
      header.assertHeaderVisible();
    });

    it('shows the search bar in tablet', () => {
      header.assertSearchBarVisible();
    });

    it('shows the hamburger menu in tablet', () => {
      cy.get(header.elements.hamburgerMenu).should('exist');
    });

    it('shows the footer in tablet', () => {
      cy.scrollTo('bottom');
      cy.get(common.elements.footer).should('exist');
    });
  });

  describe(`Desktop HD — ${VIEWPORTS.DESKTOP_HD.width}×${VIEWPORTS.DESKTOP_HD.height}`, () => {
    beforeEach(() => {
      const { width, height } = VIEWPORTS.DESKTOP_HD;
      cy.viewport(width, height);
      cy.visit('/');
      common.acceptCookies();
    });

    it('displays all main header elements in desktop', () => {
      header.assertHeaderVisible();
      header.assertLogoVisible();
      header.assertSearchBarVisible();
      header.assertCartIconVisible();
    });

    it('shows the footer in desktop', () => {
      cy.scrollTo('bottom');
      cy.get(common.elements.footer).should('exist');
    });
  });

  describe(`Full HD — ${VIEWPORTS.DESKTOP_FULLHD.width}×${VIEWPORTS.DESKTOP_FULLHD.height}`, () => {
    beforeEach(() => {
      const { width, height } = VIEWPORTS.DESKTOP_FULLHD;
      cy.viewport(width, height);
      cy.visit('/');
      common.acceptCookies();
    });

    it('shows no layout overflow in Full HD', () => {
      header.assertHeaderVisible();
      cy.get('body').should('not.have.css', 'overflow', 'hidden');
    });

    it('logo and search input are visible in Full HD', () => {
      cy.get(common.elements.logo).should('be.visible');
      cy.get(common.elements.searchInput).should('be.visible');
    });
  });

  describe('Data-driven — all viewport devices', () => {
    it('loads homepage header on every viewport', () => {
      Object.values(VIEWPORTS).forEach(({ name, width, height }) => {
        cy.viewport(width, height);
        cy.visit('/');
        common.acceptCookies();
        header.assertHeaderVisible();
        cy.log(`✓ ${name} (${width}×${height})`);
      });
    });
  });
});
