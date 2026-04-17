import { CommonPage } from '../../../pages/amazon/CommonPage';
import { HomePage } from '../../../pages/amazon/HomePage';
import { HeaderPage } from '../../../pages/amazon/HeaderPage';
import { SearchResultsPage } from '../../../pages/amazon/SearchResultsPage';

const common = new CommonPage();
const home = new HomePage();
const header = new HeaderPage();
const search = new SearchResultsPage();

describe('Amazon — Homepage Smoke', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
  });

  it('loads the homepage successfully', () => {
    cy.assertUrlContains('amazon.com.br');
    cy.assertTitleContains('Amazon');
  });

  it('displays the main header elements', () => {
    header.assertHeaderVisible();
    header.assertLogoVisible();
    header.assertSearchBarVisible();
    header.assertCartIconVisible();
    header.assertAccountLinkVisible();
  });

  it('displays the main content area', () => {
    home.assertMainContentExists();
  });

  it('displays the footer', () => {
    cy.scrollTo('bottom');
    cy.get(common.elements.footer).should('exist');
  });

  it('navigates back to homepage when clicking the logo from search results', () => {
    search.searchProduct('notebook');
    cy.assertUrlContains('k=notebook');
    header.clickLogo();
    cy.assertUrlContains('amazon.com.br');
    cy.url().should('not.include', 'k=notebook');
  });
});
