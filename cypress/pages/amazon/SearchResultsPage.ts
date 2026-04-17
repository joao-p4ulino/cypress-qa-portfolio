import { BasePage } from './BasePage';

export const searchSelectors = {
  searchInput: '#twotabsearchtextbox',
  searchButton: '#nav-search-submit-button',
  searchDropdown: '#searchDropdownBox',
  autoSuggestList: '.autocomplete-results-container, .s-suggestion, #suggestions',
  resultItems: '[data-component-type="s-search-result"]',
  resultTitles: '[data-component-type="s-search-result"] h2',
  resultPrices: '[data-component-type="s-search-result"] .a-price .a-offscreen',
  resultImages: '[data-component-type="s-search-result"] img.s-image',
  resultItemLink: '[data-component-type="s-search-result"] a.a-link-normal.s-no-outline',
  noResultsMessage: '.s-no-outline, .s-message-error, [data-component-type="s-no-results"]',
  filterSidebar: '#s-refinements',
  filterPriceRange: '#priceRefinements',
  filterBrand: '#brandsRefinements',
  filterRating: '#reviewsRefinements',
  sortDropdown: '#s-result-sort-select',
  paginationNext: '.s-pagination-next',
  paginationList: '.s-pagination-strip',
  sponsoredLabel: '.puis-sponsored-label-text, [data-component-type="sp-sponsored-result"]',
  searchResultsCount: '.s-result-count, [data-component-type="s-result-info-bar"]',
} as const;

export class SearchResultsPage extends BasePage {
  readonly url = '/';
  readonly elements = searchSelectors;

  searchProduct(term: string): void {
    cy.get(this.elements.searchInput).clear().type(`${term}{enter}`);
  }

  searchProductWithButton(term: string): void {
    cy.get(this.elements.searchInput).clear().type(term);
    cy.get(this.elements.searchButton).click();
  }

  typeSearchTerm(term: string): void {
    cy.get(this.elements.searchInput).clear().type(term);
  }

  clearSearchField(): void {
    cy.get(this.elements.searchInput).clear();
  }

  selectCategory(value: string): void {
    cy.get(this.elements.searchDropdown).select(value, { force: true });
  }

  assertAutoSuggestVisible(): void {
    cy.get(this.elements.autoSuggestList).should('be.visible');
  }

  assertResultsVisible(): void {
    cy.get(this.elements.resultImages).first().should('be.visible');
  }

  assertResultCountGreaterThan(min: number): void {
    cy.get(this.elements.resultItems).should('have.length.greaterThan', min);
  }

  assertImagesVisible(): void {
    cy.get(this.elements.resultImages).first().should('be.visible');
  }

  assertPricesExist(): void {
    cy.get(this.elements.resultPrices).should('have.length.greaterThan', 0);
  }

  assertNoResultsMessageVisible(): void {
    cy.get(this.elements.noResultsMessage).should('be.visible');
  }

  assertFilterSidebarVisible(): void {
    cy.get(this.elements.filterSidebar).should('be.visible');
  }

  assertPaginationVisible(): void {
    cy.get(this.elements.paginationList).should('be.visible');
  }

  assertSearchFieldEmpty(): void {
    cy.get(this.elements.searchInput).should('have.value', '');
  }

  clickNextPage(): void {
    cy.get(this.elements.paginationNext).click();
  }

  clickFirstResult(): void {
    cy.get(this.elements.resultItemLink).first().click({ force: true });
  }
}
