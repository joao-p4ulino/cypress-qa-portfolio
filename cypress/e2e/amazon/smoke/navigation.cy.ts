import { CommonPage } from '../../../pages/amazon/CommonPage';
import { NavigationPage } from '../../../pages/amazon/NavigationPage';
import { HeaderPage } from '../../../pages/amazon/HeaderPage';

const common = new CommonPage();
const nav = new NavigationPage();
const header = new HeaderPage();

describe('Amazon — Navigation Smoke', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
  });

  it('displays the main navigation bar', () => {
    nav.assertNavBarVisible();
  });

  it('opens the hamburger departments menu', () => {
    nav.openHamburgerMenu();
    nav.assertMenuItemsExist();
  });

  it('navigates to cart page from header cart icon', () => {
    header.clickCart();
    cy.assertUrlContains('cart');
  });

  it('redirects to login page when clicking account link', () => {
    header.clickAccountMenu();
    cy.assertUrlContains('signin');
  });
});
