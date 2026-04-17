# Cypress QA Portfolio

[![CI — AutomationExercise](https://github.com/joao-p4ulino/cypress-qa-portfolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/joao-p4ulino/cypress-qa-portfolio/actions/workflows/cypress.yml)
[![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E?logo=cypress)](https://www.cypress.io/)
[![Node](https://img.shields.io/badge/node-20-brightgreen?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

> **Portfólio de QA Engineer** — demonstração prática de automação de testes E2E com Cypress, TypeScript, Page Object Model, CI/CD e boas práticas da indústria.

---

## 📋 Sumário / Table of Contents

- [Sobre / About](#sobre--about)
- [Stack técnico / Tech Stack](#stack-técnico--tech-stack)
- [Estrutura do projeto / Project Structure](#estrutura-do-projeto--project-structure)
- [Pré-requisitos / Prerequisites](#pré-requisitos--prerequisites)
- [Instalação / Installation](#instalação--installation)
- [Executando os testes / Running Tests](#executando-os-testes--running-tests)
- [Arquitetura de testes / Test Architecture](#arquitetura-de-testes--test-architecture)
- [Reports](#reports)
- [CI/CD](#cicd)
- [⚠️ Disclaimer & Escopo / Scope](#️-disclaimer--escopo--scope)
- [Roadmap](#roadmap)
- [Referências / References](#referências--references)

---

## Sobre / About

**PT-BR:** Projeto de automação de testes E2E criado como portfólio para demonstrar domínio em:
- Arquitetura de testes com **Page Object Model (POM)**
- **TypeScript** com tipagem forte e paths configurados
- **Custom Commands** tipados em Cypress
- **Fixtures** para testes data-driven
- Teste de API pura com `cy.request`
- Zero `cy.wait(ms)` — esperas determinísticas via assertions
- **CI/CD** com GitHub Actions e relatórios Mochawesome
- Tomada de decisão consciente: saber *quando* não automatizar contra produção de terceiros

**EN:** End-to-end test automation portfolio project demonstrating: Page Object Model, TypeScript, custom commands, fixtures, cy.request API testing, CI/CD, and Mochawesome reports.

---

## Stack técnico / Tech Stack

| Ferramenta / Tool | Versão / Version | Uso / Purpose |
|---|---|---|
| [Cypress](https://www.cypress.io/) | 15.x | E2E test framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.4 | Type safety |
| [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) | 3.x | HTML reports |
| [ESLint](https://eslint.org/) + [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress) | 8.x | Code quality |
| [Prettier](https://prettier.io/) | 3.x | Code formatting |
| [Husky](https://typicode.github.io/husky/) + lint-staged | 9.x / 15.x | Pre-commit hooks |
| [GitHub Actions](https://docs.github.com/en/actions) | — | CI/CD pipeline |
| Node.js | 20 LTS | Runtime |

---

## Estrutura do projeto / Project Structure

```
cypress-qa-portfolio/
├── .github/
│   └── workflows/
│       └── cypress.yml           # CI: deterministic + smoke (non-blocking)
├── .husky/
│   └── pre-commit                # lint-staged + typecheck on commit
├── cypress/
│   ├── e2e/
│   │   ├── amazon/               # SUT 1 — 3rd-party exploration suite
│   │   │   ├── smoke/            # Happy-path, resilient, run in CI
│   │   │   │   ├── homepage.cy.ts
│   │   │   │   ├── search.cy.ts
│   │   │   │   └── navigation.cy.ts
│   │   │   └── exploration/      # Deeper coverage, expected flake
│   │   │       ├── login.cy.ts
│   │   │       ├── register.cy.ts
│   │   │       ├── header.cy.ts
│   │   │       ├── footer.cy.ts
│   │   │       ├── search-filters.cy.ts
│   │   │       ├── product-detail.cy.ts
│   │   │       ├── cart.cy.ts
│   │   │       ├── navigation.cy.ts
│   │   │       ├── responsive.cy.ts
│   │   │       └── accessibility.cy.ts
│   │   └── automation-exercise/  # SUT 2 — deterministic showcase
│   │       ├── auth/
│   │       │   ├── login.cy.ts
│   │       │   └── register.cy.ts
│   │       ├── products/
│   │       │   ├── search.cy.ts
│   │       │   └── product-detail.cy.ts
│   │       ├── cart/
│   │       │   ├── add-to-cart.cy.ts
│   │       │   └── checkout.cy.ts  # Full E2E flow
│   │       └── api/
│   │           └── products-api.cy.ts  # Pure cy.request API tests
│   ├── fixtures/
│   │   ├── amazon/               # search-terms, departments, forms
│   │   └── automation-exercise/  # users, products, checkout-data
│   ├── pages/
│   │   ├── amazon/               # POM: BasePage, Header, Search, Product, Cart…
│   │   └── automation-exercise/  # POM: Login, Register, Products, Cart, Checkout
│   ├── support/
│   │   ├── commands/
│   │   │   └── assertions.ts     # cy.assertUrlContains, cy.assertTitleContains
│   │   ├── utils/
│   │   │   └── viewports.ts      # Viewport constants (no magic numbers)
│   │   ├── e2e.ts                # Global setup
│   │   └── index.d.ts            # Custom command typings
│   └── tsconfig.json
├── docs/
│   ├── screenshots/              # Reference screenshots
│   ├── ARCHITECTURE.md           # POM + commands diagram
│   ├── TEST_PLAN.md              # Feature coverage matrix
│   └── KNOWN_FLAKES.md           # Documented flaky tests + root cause
├── .editorconfig
├── .eslintrc.cjs
├── .gitignore
├── .nvmrc                        # Node 20
├── .prettierrc
├── cypress.config.ts
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json
```

---

## Pré-requisitos / Prerequisites

- Node.js 20+ (`nvm use` if you have nvm)
- npm 10+
- Chrome browser (or Electron — default)

---

## Instalação / Installation

```bash
git clone https://github.com/joao-p4ulino/cypress-qa-portfolio.git
cd cypress-qa-portfolio
npm install
```

---

## Executando os testes / Running Tests

```bash
# Open Cypress Test Runner (interactive)
npm run cy:open

# Run all tests headlessly
npm run cy:run

# Run only AutomationExercise deterministic suite
npm run cy:run:automation-exercise

# Run only Amazon smoke tests (resilient subset)
npm run cy:smoke

# Run full Amazon suite (expect some flake — see KNOWN_FLAKES.md)
npm run cy:run:amazon

# Lint + typecheck
npm run lint
npm run typecheck

# Generate HTML report (after a run)
npm run report:generate
```

---

## Arquitetura de testes / Test Architecture

### Page Object Model (POM)

Each page has its own TypeScript class in `cypress/pages/`:

```typescript
// cypress/pages/amazon/SearchResultsPage.ts
export class SearchResultsPage extends BasePage {
  readonly url = '/';
  readonly elements = searchSelectors;   // centralized selectors

  searchProduct(term: string): void {
    cy.get(this.elements.searchInput).clear().type(`${term}{enter}`);
  }

  assertResultsVisible(): void {
    cy.get(this.elements.resultImages).first().should('be.visible');
  }
}
```

### Custom Commands (typed)

```typescript
// cypress/support/commands/assertions.ts
Cypress.Commands.add('assertUrlContains', (text: string) => {
  cy.url().should('include', text);
});

// Usage in spec (fully typed):
cy.assertUrlContains('k=notebook');
```

### Fixtures — data-driven tests

```typescript
it('runs data-driven search across multiple terms', () => {
  cy.fixture('amazon/search-terms').then((data) => {
    data.validTerms.forEach(({ term }: { term: string }) => {
      cy.visit('/');
      search.searchProduct(term);
      search.assertResultsVisible();
    });
  });
});
```

### API testing — pure cy.request

```typescript
it('returns products matching the search term', () => {
  cy.request({
    method: 'POST',
    url: `${BASE_API}/searchProduct`,
    form: true,
    body: { search_product: 'top' },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.products.length).to.be.greaterThan(0);
  });
});
```

---

## Reports

After a test run, HTML reports are generated automatically in `reports/`:

```bash
npm run cy:run:automation-exercise
# Report at: reports/index.html
```

Reports include embedded screenshots on failure, test duration, and pass/fail breakdown.

---

## CI/CD

Two GitHub Actions jobs run on every push to `main` / PR:

| Job | Target | Blocks merge? |
|---|---|---|
| `automation-exercise` | automationexercise.com | ✅ Yes |
| `amazon-smoke` | amazon.com.br (smoke only) | ❌ No (`continue-on-error`) |

The deterministic job runs typecheck + lint + Cypress. Artifacts (videos, screenshots, HTML report) are uploaded for 14 days.

See [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml).

---

## ⚠️ Disclaimer & Escopo / Scope

**This project tests two different targets:**

### SUT 1 — Amazon.com.br (Exploration Suite)

Testing a third-party production site is **officially discouraged** by Cypress ([docs](https://docs.cypress.io/app/core-concepts/best-practices#Visiting-external-sites)) for several reasons:
- No control over DOM changes or A/B tests
- Potential ToS violations for large-scale automation
- Inherently flaky (CAPTCHA, bot-detection, localization)

This suite exists deliberately to demonstrate:
1. **Real-world QA decision-making** — when you inherit test suites against external dependencies
2. **Resilient test patterns** — smoke vs. exploration tiers, `continue-on-error` in CI
3. **Flake documentation** — see `docs/KNOWN_FLAKES.md` for root-cause analysis

Tests are shallow (navigation, UI element existence) — no purchases, no credentials, no scraping at scale.

### SUT 2 — AutomationExercise.com (Deterministic Suite)

This is the recommended approach: a **controllable test target** with stable selectors (`data-qa`), a public REST API, and deterministic flows. This suite showcases:
- Full E2E checkout flow
- Pure API testing with cy.request
- Data-driven tests with fixtures
- Account lifecycle (register → test → delete)

---

## Roadmap

- [ ] Add visual regression testing (Percy or Applitools)
- [ ] Add `cypress-axe` for automated accessibility audits
- [ ] Publish Mochawesome reports to GitHub Pages
- [ ] Add Cypress Cloud integration for flake detection
- [ ] Add Firefox + Edge matrix in CI
- [ ] Add contract testing (cy.intercept with fixtures on Amazon)

---

## Referências / References

- [Cypress Best Practices](https://docs.cypress.io/app/core-concepts/best-practices)
- [Test Isolation](https://docs.cypress.io/app/core-concepts/test-isolation)
- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app)
- [App Actions vs Page Objects](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions)
- [Structuring a big Cypress project — Filip Hric](https://filiphric.com/how-to-structure-a-big-project-in-cypress)
- [cypress-io/github-action](https://github.com/cypress-io/github-action)
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)

---

*Built as a QA portfolio project — demonstrating test architecture, best practices, and engineering maturity.*
