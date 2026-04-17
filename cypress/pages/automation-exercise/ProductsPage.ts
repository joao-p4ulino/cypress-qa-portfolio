import { BasePage, AE_BASE_URL } from './BasePage';

export const productsSelectors = {
  searchInput: '#search_product',
  searchButton: '#submit_search',
  productsList: '.features_items',
  productItem: '.product-image-wrapper',
  productName: '.productinfo h2',
  productPrice: '.productinfo h2',
  addToCartButton: '.add-to-cart',
  continueShoppingButton: '.close-modal, button[data-dismiss="modal"]',
  viewCartLink: 'a[href="/view_cart"]',
  viewProductButton: '.choose a',
  noResultsMessage: '.features_items p',
  allProductsTitle: 'h2.title',
  detailSection: '.product-information',
  detailName: '.product-information h2',
  detailPrice: '.product-information span span',
  detailAddToCartButton: 'button.cart',
  quantityInput: '#quantity',
} as const;

export class ProductsPage extends BasePage {
  readonly url = '/products';
  readonly elements = productsSelectors;

  searchProduct(term: string): void {
    cy.get(this.elements.searchInput).clear().type(term);
    cy.get(this.elements.searchButton).click();
  }

  assertProductsVisible(): void {
    cy.get(this.elements.productItem).should('have.length.greaterThan', 0);
  }

  assertProductCountGreaterThan(min: number): void {
    cy.get(this.elements.productItem).should('have.length.greaterThan', min);
  }

  addFirstProductToCart(): void {
    cy.get(this.elements.addToCartButton).first().click({ force: true });
    cy.get('.modal').should('be.visible');
  }

  continueShopping(): void {
    cy.get(this.elements.continueShoppingButton).first().click();
  }

  goToCart(): void {
    cy.visit(`${AE_BASE_URL}/view_cart`);
  }

  viewFirstProduct(): void {
    cy.get(this.elements.viewProductButton).first().click({ force: true });
  }

  assertDetailNameVisible(): void {
    cy.get(this.elements.detailName).should('be.visible').and('not.be.empty');
  }

  assertDetailInfoContains(text: string): void {
    cy.get(this.elements.detailSection).within(() => {
      cy.contains(text).should('exist');
    });
  }

  assertDetailPriceVisible(): void {
    cy.get(this.elements.detailPrice).should('be.visible');
  }

  assertDetailAddToCartVisible(): void {
    cy.get(this.elements.detailAddToCartButton).should('be.visible');
  }

  assertQuantityInputVisible(): void {
    cy.get(this.elements.quantityInput).should('be.visible');
  }

  setQuantity(qty: number): void {
    cy.get(this.elements.quantityInput).clear().type(String(qty));
  }

  assertQuantityValue(qty: number): void {
    cy.get(this.elements.quantityInput).should('have.value', String(qty));
  }
}
