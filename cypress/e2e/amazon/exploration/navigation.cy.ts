import { CommonPage } from '../../../pages/amazon/CommonPage';
import { NavigationPage } from '../../../pages/amazon/NavigationPage';

const common = new CommonPage();
const nav = new NavigationPage();

describe('Amazon — Departments Navigation Exploration', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
  });

  describe('Hamburger menu', () => {
    it('opens the side menu when clicking the hamburger button', () => {
      nav.openHamburgerMenu();
    });

    it('displays menu items after opening hamburger', () => {
      nav.openHamburgerMenu();
      nav.assertMenuItemsExist();
    });

    it('closes the menu when clicking outside', () => {
      nav.openHamburgerMenu();
      cy.get('body').then(($body) => {
        if ($body.find(nav.elements.menuCloseBackground).length > 0) {
          nav.closeHamburgerMenu();
        } else {
          cy.get('body').type('{esc}');
        }
      });
      cy.get(nav.elements.hamburgerMenuContent).should('not.be.visible');
    });

    it('navigates to a different page when clicking a menu item', () => {
      nav.openHamburgerMenu();
      cy.url().then((initialUrl) => {
        cy.get('a.hmenu-item[href]:not([href=""])').first().click({ force: true });
        cy.url().should('not.eq', initialUrl);
      });
    });

    it('navigates into Livros submenu', () => {
      nav.openHamburgerMenu();
      nav.clickMenuItem('Livros');
      nav.assertMenuItemsExist();
    });
  });

  describe('Top navigation bar', () => {
    it('displays the main nav bar', () => {
      nav.assertNavBarVisible();
    });

    it('displays department links in the top bar', () => {
      nav.assertTopNavLinksExist();
    });
  });

  describe('Data-driven departments (fixture)', () => {
    it('loads every department page listed in the fixture', () => {
      cy.fixture('amazon/departments').then(({ departments }) => {
        departments.forEach(({ name }: { name: string }) => {
          cy.visit('/');
          nav.openHamburgerMenu();
          cy.get(nav.elements.menuItems)
            .contains(name, { matchCase: false })
            .click({ force: true });
          cy.assertUrlContains('amazon.com.br');
        });
      });
    });
  });
});
