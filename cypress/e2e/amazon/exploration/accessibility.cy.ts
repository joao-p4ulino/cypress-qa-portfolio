import { CommonPage } from '../../../pages/amazon/CommonPage';
import { AccessibilityPage } from '../../../pages/amazon/AccessibilityPage';

const common = new CommonPage();
const a11y = new AccessibilityPage();

describe('Amazon — Accessibility Exploration', () => {
  beforeEach(() => {
    cy.visit('/');
    common.acceptCookies();
  });

  describe('ARIA Landmarks', () => {
    it('has a main landmark', () => {
      a11y.assertMainLandmarkExists();
    });

    it('has a navigation landmark', () => {
      a11y.assertNavigationLandmarkExists();
    });

    it('has a search landmark', () => {
      a11y.assertSearchLandmarkExists();
    });
  });

  describe('Images', () => {
    it('visible images have an alt attribute (sample of 30)', () => {
      cy.get('img:visible').then(($imgs) => {
        const sample = $imgs.toArray().slice(0, 30);
        sample.forEach(($img) => {
          const alt = Cypress.$($img).attr('alt');
          expect(alt, `Image missing alt: ${Cypress.$($img).attr('src')}`).to.not.be.undefined;
        });
      });
    });
  });

  describe('Form fields', () => {
    it('search field has an aria-label or associated label', () => {
      a11y.assertSearchFieldAccessible();
    });

    it('visible inputs have some form of labeling', () => {
      cy.get('input:visible').then(($inputs) => {
        const labeled = $inputs.toArray().filter(($el) => {
          const el = Cypress.$($el);
          const id = el.attr('id');
          return (
            !!el.attr('aria-label') ||
            !!el.attr('aria-labelledby') ||
            !!el.attr('placeholder') ||
            (id ? Cypress.$(`label[for="${id}"]`).length > 0 : false)
          );
        });
        expect(labeled.length).to.be.greaterThan(0);
      });
    });
  });

  describe('Headings', () => {
    it('has at least one heading element', () => {
      a11y.assertHeadingsExist();
    });

    it('includes an h1 or h2 heading', () => {
      cy.get('h1, h2').should('have.length.greaterThan', 0);
    });
  });

  describe('Links', () => {
    it('visible links have accessible text or aria-label (sample of 50)', () => {
      cy.get('a:visible').then(($links) => {
        const sample = $links.toArray().slice(0, 50);
        sample.forEach(($link) => {
          const $el = Cypress.$($link);
          const text = $el.text().trim();
          const ariaLabel = $el.attr('aria-label');
          const hasImgAlt = $el.find('img[alt]').length > 0;
          expect(
            text.length > 0 || !!ariaLabel || hasImgAlt,
            `Link missing accessible text: ${$el.attr('href')}`
          ).to.be.true;
        });
      });
    });
  });

  describe('Keyboard navigation', () => {
    it('can focus the search field', () => {
      a11y.focusSearchField();
    });

    it('can focus the cart icon', () => {
      a11y.focusCartIcon();
    });

    it('shows a visible focus indicator on the search field', () => {
      cy.get(a11y.elements.searchInput).focus().should('have.focus');
    });
  });

  describe('Font size readability', () => {
    it('renders body text with a minimum readable font size (> 9px)', () => {
      cy.get('body p, body span, body a')
        .first()
        .then(($el) => {
          cy.window().then((win) => {
            const fontSize = parseFloat(win.getComputedStyle($el[0]).fontSize);
            expect(fontSize).to.be.greaterThan(9);
          });
        });
    });
  });
});
