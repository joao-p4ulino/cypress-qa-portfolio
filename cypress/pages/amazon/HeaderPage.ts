import { BasePage } from './BasePage';

export const headerSelectors = {
  header: '#navbar',
  logo: '#nav-logo-sprites',
  logoLink: 'a[aria-label*="Amazon"]',
  searchBar: '#nav-search-bar-form',
  searchInput: '#twotabsearchtextbox',
  searchButton: '#nav-search-submit-button',
  searchCategoryDropdown: '#searchDropdownBox',
  cartIcon: '#nav-cart',
  cartCount: '#nav-cart-count',
  accountLink: '#nav-link-accountList',
  ordersLink: '#nav-orders',
  locationIcon: '#nav-global-location-popover-link',
  hamburgerMenu: '#nav-hamburger-menu',
  promoBar: '#nav-xshop',
  locationModal: '#GLUXZipUpdateInput, .a-popover-inner, #nav-global-location-slot .a-popover',
} as const;

export class HeaderPage extends BasePage {
  readonly url = '/';
  readonly elements = headerSelectors;

  assertHeaderVisible(): void {
    cy.get(this.elements.header).should('be.visible');
  }

  assertLogoVisible(): void {
    cy.get(this.elements.logo).should('be.visible');
  }

  clickLogo(): void {
    cy.get(this.elements.logoLink).first().click({ force: true });
  }

  assertSearchBarVisible(): void {
    cy.get(this.elements.searchBar).should('be.visible');
  }

  assertCartIconVisible(): void {
    cy.get(this.elements.cartIcon).should('be.visible');
  }

  assertAccountLinkVisible(): void {
    cy.get(this.elements.accountLink).should('be.visible');
  }

  clickAccountMenu(): void {
    cy.get(this.elements.accountLink).click();
  }

  clickLocation(): void {
    cy.get(this.elements.locationIcon).click();
  }

  assertCategoryDropdownExists(): void {
    cy.get(this.elements.searchCategoryDropdown).should('exist');
  }

  assertPromoBarVisible(): void {
    cy.get(this.elements.promoBar).should('be.visible');
  }

  clickCart(): void {
    cy.get(this.elements.cartIcon).click();
  }

  assertLocationModalOpen(): void {
    cy.get(this.elements.locationModal, { timeout: 10000 }).should('exist');
  }
}
