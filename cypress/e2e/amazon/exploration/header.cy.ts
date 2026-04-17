import { CommonPage } from '../../../pages/amazon/CommonPage';
import { HeaderPage } from '../../../pages/amazon/HeaderPage';

const common = new CommonPage();
const header = new HeaderPage();

describe('Amazon — Header Exploration', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
  });

  describe('Visible elements', () => {
    it('displays the full header', () => {
      header.assertHeaderVisible();
    });

    it('displays the Amazon logo', () => {
      header.assertLogoVisible();
    });

    it('displays the search bar', () => {
      header.assertSearchBarVisible();
    });

    it('displays the cart icon', () => {
      header.assertCartIconVisible();
    });

    it('displays the account link', () => {
      header.assertAccountLinkVisible();
    });

    it('displays the category dropdown in the search bar', () => {
      header.assertCategoryDropdownExists();
    });

    it('displays the location icon', () => {
      cy.get(header.elements.locationIcon).should('exist');
    });

    it('displays the promotional departments bar', () => {
      header.assertPromoBarVisible();
    });
  });

  describe('Location modal', () => {
    it('opens the location modal when clicking the location icon', () => {
      header.clickLocation();
      header.assertLocationModalOpen();
    });
  });

  describe('Account menu (unauthenticated)', () => {
    it('redirects to login when clicking account link', () => {
      header.clickAccountMenu();
      cy.assertUrlContains('signin');
    });
  });
});
