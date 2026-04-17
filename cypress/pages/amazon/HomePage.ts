import { BasePage } from './BasePage';

export const homeSelectors = {
  heroCarousel: '.a-carousel-viewport',
  mainContent: '#main-content',
  categoryCards: '.a-cardui, [data-testid="top-categories"]',
} as const;

export class HomePage extends BasePage {
  readonly url = '/';
  readonly elements = homeSelectors;

  assertCarouselVisible(): void {
    cy.get(this.elements.heroCarousel).first().should('be.visible');
  }

  assertMainContentExists(): void {
    cy.get(this.elements.mainContent).should('exist');
  }

  assertCategoryCardsExist(): void {
    cy.get(this.elements.categoryCards).should('have.length.greaterThan', 0);
  }
}
