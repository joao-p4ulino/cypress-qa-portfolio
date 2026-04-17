/**
 * Full end-to-end checkout flow:
 * register → add to cart → checkout → pay → confirm → delete account
 *
 * Single-test design avoids session/isolation issues with before/after hooks.
 */
import { LoginPage } from '../../../pages/automation-exercise/LoginPage';
import { RegisterPage } from '../../../pages/automation-exercise/RegisterPage';
import { ProductsPage } from '../../../pages/automation-exercise/ProductsPage';
import { CartPage } from '../../../pages/automation-exercise/CartPage';
import { CheckoutPage } from '../../../pages/automation-exercise/CheckoutPage';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const products = new ProductsPage();
const cart = new CartPage();
const checkout = new CheckoutPage();
const BASE = 'https://automationexercise.com';

describe('AutomationExercise — End-to-End Checkout Flow', () => {
  it('registers, adds a product, completes checkout, and deletes the account', () => {
    const timestamp = Date.now();
    const email = `e2e.checkout.${timestamp}@test.com`;

    cy.fixture('automation-exercise/users').then(({ validUser }) => {
      // Step 1: Register a fresh account
      cy.visit(`${BASE}/login`);
      loginPage.fillSignupName(validUser.name);
      loginPage.fillSignupEmail(email);
      loginPage.clickSignup();

      registerPage.fillAccountInfo(validUser.password);
      registerPage.fillAddressInfo({
        firstName: validUser.firstName,
        lastName: validUser.lastName,
        address: validUser.address,
        country: validUser.country,
        state: validUser.state,
        city: validUser.city,
        zipcode: validUser.zipcode,
        mobile: validUser.mobile,
      });
      registerPage.clickCreateAccount();
      registerPage.assertAccountCreated();
      registerPage.clickContinue();
      loginPage.assertLoggedIn();

      // Step 2: Add a product to cart
      cy.visit(`${BASE}/products`);
      products.addFirstProductToCart();
      products.continueShopping();

      // Step 3: View cart
      cy.visit(`${BASE}/view_cart`);
      cart.assertCartHasItems();

      // Step 4: Proceed to checkout
      cart.clickProceedToCheckout();
      checkout.assertAddressVisible();
      checkout.assertOrderReviewVisible();

      // Step 5: Place the order
      checkout.addOrderComment('E2E test order — portfolio demonstration');
      checkout.clickPlaceOrder();

      cy.fixture('automation-exercise/checkout-data').then(({ paymentDetails }) => {
        checkout.fillPaymentDetails(paymentDetails);
        checkout.clickPayButton();
        checkout.assertOrderPlaced();
      });

      // Step 6: Clean up — delete the test account
      registerPage.deleteAccount();
    });
  });
});
