import { ProductsPage } from '../../../pages/automation-exercise/ProductsPage';
import { CartPage } from '../../../pages/automation-exercise/CartPage';

const products = new ProductsPage();
const cart = new CartPage();
const BASE = 'https://automationexercise.com';

describe('AutomationExercise — Add to Cart', () => {
  beforeEach(() => {
    cy.visit(`${BASE}/products`);
  });

  it('adds the first product to the cart', () => {
    products.addFirstProductToCart();
    products.continueShopping();
    products.goToCart();
    cart.assertCartHasItems();
  });

  it('shows the product in the cart after adding', () => {
    cy.get('.product-image-wrapper')
      .first()
      .within(() => {
        cy.get('.productinfo h2')
          .invoke('text')
          .then((productName) => {
            cy.wrap(productName).as('addedProduct');
          });
      });
    products.addFirstProductToCart();
    products.goToCart();
    cart.assertCartHasItems();
  });

  it('removes an item from the cart', () => {
    products.addFirstProductToCart();
    products.goToCart();
    cart.assertCartHasItems();
    cart.removeFirstItem();
    cy.get(cart.elements.cartRows).should('not.exist');
  });

  it('adds multiple products to the cart', () => {
    // Add first product (scoped to first product wrapper)
    cy.get('.product-image-wrapper')
      .first()
      .within(() => {
        cy.get('.add-to-cart').first().click({ force: true });
      });
    cy.get('.modal').should('be.visible');
    cy.get('.close-modal, button[data-dismiss="modal"]').first().click();

    // Add second product (scoped to second product wrapper)
    cy.get('.product-image-wrapper')
      .eq(1)
      .within(() => {
        cy.get('.add-to-cart').first().click({ force: true });
      });
    cy.get('.modal').should('be.visible');
    cy.get('.close-modal, button[data-dismiss="modal"]').first().click();
    products.goToCart();

    cy.get(cart.elements.cartRows).should('have.length.greaterThan', 1);
  });
});
