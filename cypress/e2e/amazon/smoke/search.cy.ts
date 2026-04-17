import { CommonPage } from '../../../pages/amazon/CommonPage';
import { SearchResultsPage } from '../../../pages/amazon/SearchResultsPage';

const common = new CommonPage();
const search = new SearchResultsPage();

describe('Amazon — Search Smoke', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
  });

  it('returns results for a valid search term', () => {
    search.searchProduct('notebook');
    search.assertResultsVisible();
    cy.assertUrlContains('k=notebook');
  });

  it('searches using the search button instead of Enter key', () => {
    search.searchProductWithButton('mouse sem fio');
    search.assertResultsVisible();
  });

  it('shows no-results message for an invalid search term', () => {
    search.searchProduct('xyzabc123naoexiste');
    search.assertNoResultsMessageVisible();
  });

  it('runs data-driven search across multiple terms from fixture', () => {
    cy.fixture('amazon/search-terms').then((data) => {
      data.validTerms.forEach(({ term }: { term: string }) => {
        cy.visit('/');
        search.searchProduct(term);
        search.assertResultsVisible();
      });
    });
  });
});
