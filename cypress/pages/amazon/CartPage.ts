import { BasePage } from './BasePage';

export const cartSelectors = {
  cartItems: '#sc-active-cart .sc-list-item, [data-name="Active Cart"] .sc-list-item',
  cartPageContainer: '#sc-retail-cart-container, #sc-all-carts',
  checkoutButton: '#sc-buy-box-ptc-button, input[name="proceedToRetailCheckout"]',
  cartCount: '#nav-cart-count',
} as const;

export class CartPage extends BasePage {
  readonly url = '/cart';
  readonly elements = cartSelectors;

  assertPageContainerExists(): void {
    cy.get(this.elements.cartPageContainer).should('exist');
  }

  assertCheckoutButtonExists(): void {
    cy.get(this.elements.checkoutButton).should('exist');
  }

  clickCheckout(): void {
    cy.get(this.elements.checkoutButton).first().click();
  }
}
