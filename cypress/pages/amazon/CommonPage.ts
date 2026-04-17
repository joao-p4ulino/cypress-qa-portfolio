// Shared Amazon chrome helpers. Intentionally does NOT extend BasePage — utility mixin, not a navigable page.
export const commonSelectors = {
  cookieBannerAccept: '#sp-cc-accept',
  logo: '#nav-logo-sprites',
  searchInput: '#twotabsearchtextbox',
  footer: '#navFooter',
} as const;

export class CommonPage {
  readonly elements = commonSelectors;

  acceptCookies(): void {
    cy.get('body').then(($body) => {
      if ($body.find(this.elements.cookieBannerAccept).length > 0) {
        cy.get(this.elements.cookieBannerAccept).click();
      }
    });
  }
}
