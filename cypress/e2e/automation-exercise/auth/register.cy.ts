/**
 * Full register → delete account flow.
 * Uses a unique timestamp-based email to avoid conflicts on repeated runs.
 * Account is deleted at the end to keep the test environment clean.
 */
import { LoginPage } from '../../../pages/automation-exercise/LoginPage';
import { RegisterPage } from '../../../pages/automation-exercise/RegisterPage';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const BASE = 'https://automationexercise.com';

describe('AutomationExercise — Register', () => {
  it('creates a new account and then deletes it', () => {
    const timestamp = Date.now();
    const email = `qa.portfolio.${timestamp}@test.com`;

    cy.visit(`${BASE}/login`);

    cy.fixture('automation-exercise/users').then(({ validUser }) => {
      // Step 1: enter name and unique email on signup form
      loginPage.fillSignupName(validUser.name);
      loginPage.fillSignupEmail(email);
      loginPage.clickSignup();

      // Step 2: fill account details
      registerPage.fillAccountInfo(validUser.password);

      // Step 3: fill address information
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

      // Step 4: create the account
      registerPage.clickCreateAccount();
      registerPage.assertAccountCreated();

      // Step 5: continue and assert logged in
      registerPage.clickContinue();
      loginPage.assertLoggedIn();

      // Step 6: clean up — delete the account
      registerPage.deleteAccount();
    });
  });

  describe('Signup form validation', () => {
    it('shows the signup form on the login page', () => {
      cy.visit(`${BASE}/login`);
      cy.get(loginPage.elements.signupForm).should('be.visible');
    });

    it('shows email field in signup form', () => {
      cy.visit(`${BASE}/login`);
      cy.get(loginPage.elements.signupEmail).should('be.visible');
    });
  });
});
