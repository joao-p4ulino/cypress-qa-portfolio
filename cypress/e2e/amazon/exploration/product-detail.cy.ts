/**
 * NOTE — Flake risk (documented in KNOWN_FLAKES.md):
 * Amazon may redirect to a CAPTCHA or different product depending on A/B tests.
 * These tests navigate to a real product page and assert UI elements exist.
 * Assertions use 'exist' / 'be.visible' with sufficient timeouts via config.
 */
import { CommonPage } from '../../../pages/amazon/CommonPage';
import { SearchResultsPage } from '../../../pages/amazon/SearchResultsPage';
import { ProductPage } from '../../../pages/amazon/ProductPage';

const common = new CommonPage();
const search = new SearchResultsPage();
const product = new ProductPage();

describe('Amazon — Product Detail Page Exploration', () => {
  before(() => {
    cy.visit('/');
    common.acceptCookies();
    search.searchProduct('fone de ouvido bluetooth');
    search.clickFirstResult();
  });

  describe('Product information', () => {
    it('displays the product title', () => {
      product.assertTitleVisible();
    });

    it('displays the product price', () => {
      product.assertPriceExists();
    });

    it('displays the main product image', () => {
      product.assertImageVisible();
    });

    it('displays product description or feature bullets', () => {
      product.assertDescriptionExists();
    });

    it('displays product availability information', () => {
      product.assertAvailabilityExists();
    });
  });

  describe('Product ratings', () => {
    it('displays the product rating', () => {
      product.assertRatingExists();
    });

    it('displays the reviews section', () => {
      product.assertReviewsSectionExists();
    });
  });

  describe('Product actions', () => {
    it('displays the Add to Cart button', () => {
      product.assertAddToCartButtonVisible();
    });
  });

  describe('Page navigation', () => {
    it('displays the breadcrumb navigation', () => {
      product.assertBreadcrumbVisible();
    });

    it('displays product specifications section', () => {
      product.assertSpecsExist();
    });
  });
});
