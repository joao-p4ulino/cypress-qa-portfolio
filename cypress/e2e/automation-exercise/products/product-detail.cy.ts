import { ProductsPage } from '../../../pages/automation-exercise/ProductsPage';

const products = new ProductsPage();
const BASE = 'https://automationexercise.com';

describe('AutomationExercise — Product Detail', { testIsolation: false }, () => {
  before(() => {
    cy.visit(`${BASE}/products`);
    products.viewFirstProduct();
    cy.url().should('include', '/product_details/');
  });

  it('displays the product name', () => {
    products.assertDetailNameVisible();
  });

  it('displays the product category', () => {
    products.assertDetailInfoContains('Category');
  });

  it('displays the product price', () => {
    products.assertDetailPriceVisible();
  });

  it('displays the product availability', () => {
    products.assertDetailInfoContains('Availability');
  });

  it('displays the Add to Cart button', () => {
    products.assertDetailAddToCartVisible();
  });

  it('displays the quantity input', () => {
    products.assertQuantityInputVisible();
  });

  it('allows changing the quantity', () => {
    products.setQuantity(3);
    products.assertQuantityValue(3);
  });
});
