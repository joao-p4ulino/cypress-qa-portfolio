import { BasePage } from './BasePage';

export const navigationSelectors = {
  hamburgerMenu: '#nav-hamburger-menu',
  hamburgerMenuContent: '#hmenu-content',
  menuItems: '.hmenu-item',
  menuCloseBackground: '#hmenu-canvas-background',
  navBar: '#nav-main',
  topNavLinks: '#nav-xshop .nav-a, #nav-xshop a',
} as const;

export class NavigationPage extends BasePage {
  readonly url = '/';
  readonly elements = navigationSelectors;

  openHamburgerMenu(): void {
    cy.get(this.elements.hamburgerMenu).click();
    cy.get(this.elements.hamburgerMenuContent).should('be.visible');
  }

  closeHamburgerMenu(): void {
    cy.get(this.elements.menuCloseBackground).click({ force: true });
  }

  assertMenuItemsExist(): void {
    cy.get(this.elements.menuItems).should('have.length.greaterThan', 0);
  }

  clickMenuItem(text: string): void {
    cy.get(this.elements.menuItems).contains(text).click({ force: true });
  }

  assertNavBarVisible(): void {
    cy.get(this.elements.navBar).should('be.visible');
  }

  assertTopNavLinksExist(): void {
    cy.get(this.elements.topNavLinks).should('have.length.greaterThan', 0);
  }
}
