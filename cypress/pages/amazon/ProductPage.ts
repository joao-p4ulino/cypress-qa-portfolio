import { BasePage } from './BasePage';

export const productSelectors = {
  productTitle: '#productTitle',
  productPrice: '#priceblock_ourprice, .a-price .a-offscreen, #corePrice_feature_div .a-offscreen',
  productImage: '#landingImage, #imgTagWrapperId img',
  productDescription: '#productDescription, #feature-bullets',
  productRating: '#acrPopover, .a-icon-star',
  addToCartButton: '#add-to-cart-button',
  productAvailability: '#availability',
  breadcrumb: '#wayfinding-breadcrumbs_container',
  productSpecs: '#productDetails_techSpec_section_1, #detailBullets_feature_div',
  customerReviews: '#customer-reviews-content, #reviews-medley-cmps-expand',
} as const;

export class ProductPage extends BasePage {
  readonly url = '/';
  readonly elements = productSelectors;

  assertTitleVisible(): void {
    cy.get(this.elements.productTitle).should('be.visible').and('not.be.empty');
  }

  assertPriceExists(): void {
    cy.get(this.elements.productPrice).first().should('exist');
  }

  assertImageVisible(): void {
    cy.get(this.elements.productImage).should('be.visible');
  }

  assertDescriptionExists(): void {
    cy.get(this.elements.productDescription).should('exist');
  }

  assertRatingExists(): void {
    cy.get(this.elements.productRating).should('exist');
  }

  assertAddToCartButtonVisible(): void {
    cy.get(this.elements.addToCartButton).should('be.visible');
  }

  assertAvailabilityExists(): void {
    cy.get(this.elements.productAvailability).should('exist');
  }

  assertBreadcrumbVisible(): void {
    cy.get(this.elements.breadcrumb).should('be.visible');
  }

  assertSpecsExist(): void {
    cy.get(this.elements.productSpecs).should('exist');
  }

  assertReviewsSectionExists(): void {
    cy.get(this.elements.customerReviews).should('exist');
  }
}
