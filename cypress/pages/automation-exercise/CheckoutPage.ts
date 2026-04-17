import { BasePage } from './BasePage';

export const checkoutSelectors = {
  addressDetails: '#address_delivery',
  orderReview: '#cart_info',
  commentTextarea: 'textarea[name="message"]',
  placeOrderButton: '.check_out',
  nameOnCard: '[data-qa="name-on-card"]',
  cardNumber: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  expiryMonth: '[data-qa="expiry-month"]',
  expiryYear: '[data-qa="expiry-year"]',
  payButton: '[data-qa="pay-button"]',
  orderConfirmation: '[data-qa="order-placed"]',
  continueButton: '[data-qa="continue-button"]',
} as const;

export class CheckoutPage extends BasePage {
  readonly url = '/checkout';
  readonly elements = checkoutSelectors;

  assertAddressVisible(): void {
    cy.get(this.elements.addressDetails).should('be.visible');
  }

  assertOrderReviewVisible(): void {
    cy.get(this.elements.orderReview).should('be.visible');
  }

  addOrderComment(comment: string): void {
    cy.get(this.elements.commentTextarea).clear().type(comment);
  }

  clickPlaceOrder(): void {
    cy.get(this.elements.placeOrderButton).click();
  }

  fillPaymentDetails(data: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): void {
    cy.get(this.elements.nameOnCard).clear().type(data.nameOnCard);
    cy.get(this.elements.cardNumber).clear().type(data.cardNumber);
    cy.get(this.elements.cvc).clear().type(data.cvc);
    cy.get(this.elements.expiryMonth).clear().type(data.expiryMonth);
    cy.get(this.elements.expiryYear).clear().type(data.expiryYear);
  }

  clickPayButton(): void {
    cy.get(this.elements.payButton).click();
  }

  assertOrderPlaced(): void {
    cy.get(this.elements.orderConfirmation).should('be.visible');
  }
}
