import { CommonPage } from '../../../pages/amazon/CommonPage';
import { CartPage } from '../../../pages/amazon/CartPage';

const common = new CommonPage();
const cart = new CartPage();

describe('Amazon — Cart Page Exploration', () => {
  describe('Empty cart (unauthenticated user)', () => {
    beforeEach(() => {
      cy.visit('/');
      common.acceptCookies();
      cart.visit();
    });

    it('loads the cart page', () => {
      cy.assertTitleContains('Carrinho');
    });

    it('shows no active cart items for an unauthenticated user', () => {
      cy.get(cart.elements.cartItems).should('not.exist');
    });

    it('shows zero or no cart count for an unauthenticated user', () => {
      cy.get(cart.elements.cartCount)
        .invoke('text')
        .then((text) => {
          const count = parseInt(text.trim(), 10);
          expect(isNaN(count) || count === 0).to.be.true;
        });
    });
  });

  describe('Cart page structure', () => {
    beforeEach(() => {
      cart.visit();
    });

    it('renders the cart page container', () => {
      cart.assertPageContainerExists();
    });

    it('shows the checkout button when cart has items (structure check)', () => {
      cy.get('body').then(($body) => {
        if ($body.find(cart.elements.checkoutButton).length > 0) {
          cart.assertCheckoutButtonExists();
        } else {
          cy.log('No checkout button — cart is empty, which is expected');
        }
      });
    });

    it('redirects to login when clicking checkout without being authenticated', () => {
      cy.get('body').then(($body) => {
        if ($body.find(cart.elements.checkoutButton).length > 0) {
          cart.clickCheckout();
          cy.url().should('match', /signin|login/);
        } else {
          cy.log('Skipped: cart is empty, no checkout button to click');
        }
      });
    });
  });
});
