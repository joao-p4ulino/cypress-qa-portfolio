declare global {
  namespace Cypress {
    interface Chainable {
      assertUrlContains(text: string): Chainable<void>;
      assertTitleContains(text: string): Chainable<void>;
    }
  }
}

export {};
