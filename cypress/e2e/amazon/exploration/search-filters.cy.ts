import { CommonPage } from '../../../pages/amazon/CommonPage';
import { SearchResultsPage } from '../../../pages/amazon/SearchResultsPage';

const common = new CommonPage();
const search = new SearchResultsPage();

describe('Amazon — Search Results & Filters Exploration', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
    search.searchProduct('notebook');
  });

  describe('Results display', () => {
    it('shows a list of products', () => {
      search.assertResultCountGreaterThan(0);
    });

    it('shows product titles', () => {
      cy.get(search.elements.resultTitles).first().should('be.visible');
    });

    it('shows product images', () => {
      search.assertImagesVisible();
    });

    it('shows product prices', () => {
      search.assertPricesExist();
    });

    it('shows a results count indicator', () => {
      cy.get(search.elements.searchResultsCount).should('exist');
    });
  });

  describe('Filter sidebar', () => {
    it('displays the filter sidebar', () => {
      search.assertFilterSidebarVisible();
    });

    it('displays price range filter', () => {
      cy.get(search.elements.filterPriceRange).should('exist');
    });

    it('displays brand filter', () => {
      cy.get(search.elements.filterBrand).should('exist');
    });

    it('displays rating filter', () => {
      cy.get(search.elements.filterRating).should('exist');
    });

    it('updates URL when applying a rating filter', () => {
      cy.get(search.elements.filterRating).within(() => {
        cy.get('a').first().click();
      });
      cy.assertUrlContains('p_72');
    });
  });

  describe('Sort order', () => {
    it('displays the sort dropdown', () => {
      cy.get(search.elements.sortDropdown).should('exist');
    });

    it('sorts by price ascending', () => {
      cy.get(search.elements.sortDropdown).select('price-asc-rank', { force: true });
      cy.get(search.elements.sortDropdown).should('have.value', 'price-asc-rank');
    });

    it('sorts by price descending', () => {
      cy.get(search.elements.sortDropdown).select('price-desc-rank', { force: true });
      cy.get(search.elements.sortDropdown).should('have.value', 'price-desc-rank');
    });

    it('sorts by customer reviews', () => {
      cy.get(search.elements.sortDropdown).select('review-rank', { force: true });
      cy.get(search.elements.sortDropdown).should('have.value', 'review-rank');
    });
  });

  describe('Pagination', () => {
    it('displays pagination bar', () => {
      search.assertPaginationVisible();
    });

    it('navigates to the next page of results', () => {
      cy.url().then((initialUrl) => {
        search.clickNextPage();
        cy.url().should('not.eq', initialUrl);
      });
    });
  });

  describe('Auto-suggest', () => {
    it('shows suggestions while typing', () => {
      cy.visit('/');
      search.typeSearchTerm('iph');
      search.assertAutoSuggestVisible();
    });

    it('shows empty field after clearing', () => {
      search.clearSearchField();
      search.assertSearchFieldEmpty();
    });
  });

  describe('Category search', () => {
    it('allows selecting a category before searching', () => {
      cy.visit('/');
      search.selectCategory('search-alias=electronics');
      cy.get(search.elements.searchDropdown).should('have.value', 'search-alias=electronics');
    });
  });
});
