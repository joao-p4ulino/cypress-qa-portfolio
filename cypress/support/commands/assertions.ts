Cypress.Commands.add('assertUrlContains', (text: string) => {
  cy.url().should('include', text);
});

Cypress.Commands.add('assertTitleContains', (text: string) => {
  cy.title().should('include', text);
});
