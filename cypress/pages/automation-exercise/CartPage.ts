import { BasePage } from './BasePage';

export const cartSelectors = {
  cartTable: '#cart_info_table',
  cartRows: '#cart_info_table tbody tr',
  productName: '.cart_description h4 a',
  productPrice: '.cart_price p',
  productQuantity: '.cart_quantity button',
  productTotal: '.cart_total p',
  deleteButton: '.cart_quantity_delete',
  proceedToCheckoutButton: '.check_out',
  emptyCartMessage: '#empty_cart',
} as const;

export class CartPage extends BasePage {
  readonly url = '/view_cart';
  readonly elements = cartSelectors;

  assertCartHasItems(): void {
    cy.get(this.elements.cartRows).should('have.length.greaterThan', 0);
  }

  assertProductInCart(name: string): void {
    cy.get(this.elements.productName).should('contain.text', name);
  }

  assertCartIsEmpty(): void {
    cy.get(this.elements.cartRows).should('not.exist');
  }

  removeFirstItem(): void {
    cy.get(this.elements.deleteButton).first().click();
  }

  clickProceedToCheckout(): void {
    cy.get(this.elements.proceedToCheckoutButton).click();
  }
}
