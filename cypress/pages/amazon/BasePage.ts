export abstract class BasePage {
  abstract readonly url: string;

  visit(): void {
    cy.visit(this.url);
  }
}
