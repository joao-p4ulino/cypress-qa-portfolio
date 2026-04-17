import { BasePage } from './BasePage';

export const footerSelectors = {
  footer: '#navFooter',
  backToTop: '#navBackToTop',
  footerColumns: '.navFooterVerticalColumn',
  footerLinks: '.navFooterVerticalColumn a, #navFooter .navFooterLinkCol a',
  copyrightText: '.navFooterCopyright, #navFooter .a-color-secondary',
} as const;

export class FooterPage extends BasePage {
  readonly url = '/';
  readonly elements = footerSelectors;

  assertFooterExists(): void {
    cy.get(this.elements.footer).should('exist');
  }

  assertBackToTopVisible(): void {
    cy.get(this.elements.backToTop).should('be.visible');
  }

  clickBackToTop(): void {
    cy.get(this.elements.backToTop).click();
  }

  assertColumnsExist(): void {
    cy.get(this.elements.footerColumns).should('have.length.greaterThan', 0);
  }

  assertLinksExist(): void {
    cy.get(this.elements.footerLinks).should('have.length.greaterThan', 0);
  }

  assertCopyrightExists(): void {
    cy.get(this.elements.copyrightText).should('exist');
  }
}
