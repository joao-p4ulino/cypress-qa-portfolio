import { ProductsPage } from '../../../pages/automation-exercise/ProductsPage';

const products = new ProductsPage();
const BASE = 'https://automationexercise.com';

describe('AutomationExercise — Product Search', () => {
  beforeEach(() => {
    cy.visit(`${BASE}/products`);
  });

  describe('All products page', () => {
    it('displays the products listing page', () => {
      products.assertProductsVisible();
    });

    it('shows at least 1 product', () => {
      products.assertProductCountGreaterThan(0);
    });
  });

  describe('Search functionality', () => {
    it('returns results for a valid search term', () => {
      products.searchProduct('top');
      products.assertProductsVisible();
    });

    it('updates the URL or page when searching', () => {
      products.searchProduct('jeans');
      cy.url().should('include', '/products');
      products.assertProductsVisible();
    });

    it('runs data-driven search across multiple terms from fixture', () => {
      cy.fixture('automation-exercise/products').then((data) => {
        data.searchTerms.forEach(
          ({ term, expectedMinResults }: { term: string; expectedMinResults: number }) => {
            cy.visit(`${BASE}/products`);
            products.searchProduct(term);
            products.assertProductCountGreaterThan(expectedMinResults - 1);
          }
        );
      });
    });
  });
});
