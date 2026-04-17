import 'cypress-mochawesome-reporter/register';
import './commands/index';

// Dismiss any JS dialogs (ads on automationexercise.com can trigger these)
Cypress.on('window:alert', () => {});
Cypress.on('window:confirm', () => true);

// Prevent uncaught exceptions from ads crashing tests
Cypress.on('uncaught:exception', () => false);
