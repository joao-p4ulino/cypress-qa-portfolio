import { BasePage } from './BasePage';

export const accessibilitySelectors = {
  mainLandmark: 'main, [role="main"]',
  navigationLandmark: 'nav, [role="navigation"]',
  searchLandmark: '[role="search"]',
  images: 'img',
  links: 'a[href]',
  headings: 'h1, h2, h3, h4, h5, h6',
  searchInput: '#twotabsearchtextbox',
  cartIcon: '#nav-cart',
} as const;

export class AccessibilityPage extends BasePage {
  readonly url = '/';
  readonly elements = accessibilitySelectors;

  assertMainLandmarkExists(): void {
    cy.get(this.elements.mainLandmark).should('exist');
  }

  assertNavigationLandmarkExists(): void {
    cy.get(this.elements.navigationLandmark).should('exist');
  }

  assertSearchLandmarkExists(): void {
    cy.get(this.elements.searchLandmark).should('exist');
  }

  assertSearchFieldAccessible(): void {
    cy.get(this.elements.searchInput).should(($el) => {
      const ariaLabel = $el.attr('aria-label');
      const id = $el.attr('id');
      const hasLabel = id ? Cypress.$(`label[for="${id}"]`).length > 0 : false;
      expect(!!ariaLabel || hasLabel).to.be.true;
    });
  }

  assertHeadingsExist(): void {
    cy.get(this.elements.headings).should('have.length.greaterThan', 0);
  }

  focusSearchField(): void {
    cy.get(this.elements.searchInput).focus().should('have.focus');
  }

  focusCartIcon(): void {
    cy.get(this.elements.cartIcon).focus().should('have.focus');
  }
}
