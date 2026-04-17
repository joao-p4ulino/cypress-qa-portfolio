# Testes Flaky Conhecidos — Root Cause Analysis

> Este documento demonstra maturidade em QA: documentar flakiness é parte do trabalho, não um sinal de fraqueza. Cada entrada inclui causa raiz, impacto e estratégia de mitigação.

---

## SUT: Amazon.com.br

### FLAKE-001 — `product-detail.cy.ts` — Redirecionamento para CAPTCHA

| Campo | Detalhe |
|---|---|
| **Arquivo** | `cypress/e2e/amazon/exploration/product-detail.cy.ts` |
| **Frequência** | ~30% das execuções em CI |
| **Causa raiz** | Amazon detecta User-Agent do Cypress/Chrome headless e exibe página de verificação CAPTCHA em vez do produto pesquisado. |
| **Impacto** | Testes de título, preço e imagem do produto falham com `element not found`. |
| **Mitigação atual** | Suite marcada como `continue-on-error` no CI. Testes usam `before()` (não `beforeEach()`) para minimizar requests. |
| **Mitigação ideal** | Usar `cy.intercept()` para interceptar a resposta do produto e servir um fixture determinístico, desacoplando o teste do estado real da Amazon. |
| **Status** | Documentado — baixa prioridade de correção (site de terceiros) |

---

### FLAKE-002 — `cart.cy.ts` — Botão de checkout ausente

| Campo | Detalhe |
|---|---|
| **Arquivo** | `cypress/e2e/amazon/exploration/cart.cy.ts` |
| **Frequência** | ~100% (estrutural — usuário deslogado nunca tem itens no carrinho) |
| **Causa raiz** | Carrinho sempre vazio para usuário não-autenticado. O botão "Finalizar compra" só aparece com itens. |
| **Impacto** | Testes de checkout redirect tratam ausência do botão como cenário esperado via `cy.get('body').then()`. |
| **Nota** | O padrão `cy.get('body').then()` aqui é **intencional** — não é conditional testing anti-pattern, mas tratamento explícito de estado externo documentado. |
| **Mitigação** | Testes isolam claramente os dois caminhos: carrinho vazio (estrutura da página) vs. carrinho com itens (requer auth). |
| **Status** | Aceito como limitação de design — documentado |

---

### FLAKE-003 — `navigation.cy.ts` — Menu hamburguer não fecha com overlay

| Campo | Detalhe |
|---|---|
| **Arquivo** | `cypress/e2e/amazon/exploration/navigation.cy.ts` |
| **Frequência** | ~15% das execuções |
| **Causa raiz** | O overlay `#hmenu-canvas-background` nem sempre aparece dependendo do viewport e versão do layout da Amazon. |
| **Impacto** | Asserção `should('not.be.visible')` no menu após fechar falha. |
| **Mitigação atual** | Fallback para `cy.get('body').type('{esc}')` quando o overlay não existe. |
| **Mitigação ideal** | Interceptar animações CSS com `cy.intercept` ou aguardar transição com `.should('have.css', 'display', 'none')`. |
| **Status** | Mitigado com fallback |

---

### FLAKE-004 — `search.cy.ts` — Auto-complete não exibido

| Campo | Detalhe |
|---|---|
| **Arquivo** | `cypress/e2e/amazon/exploration/search-filters.cy.ts` |
| **Frequência** | ~20% das execuções |
| **Causa raiz** | A API de sugestões da Amazon pode não responder a tempo (timeout de rede), ou o componente de auto-complete é carregado via lazy loading com race condition. |
| **Impacto** | `should('be.visible')` no container de sugestões falha quando a requisição demora mais que `defaultCommandTimeout`. |
| **Mitigação atual** | `defaultCommandTimeout: 10000` no `cypress.config.ts` + `retries: { runMode: 2 }`. |
| **Mitigação ideal** | `cy.intercept('GET', '**/completion*').as('autocomplete'); cy.wait('@autocomplete');` |
| **Status** | Parcialmente mitigado por timeout e retries |

---

### FLAKE-005 — `responsive.cy.ts` — Layout diferente em A/B test

| Campo | Detalhe |
|---|---|
| **Arquivo** | `cypress/e2e/amazon/exploration/responsive.cy.ts` |
| **Frequência** | ~10% das execuções |
| **Causa raiz** | Amazon realiza A/B tests de layout que alteram seletores do header no viewport mobile. O elemento `#navbar` pode ser substituído por variantes. |
| **Impacto** | `assertHeaderVisible()` falha quando `#navbar` não está presente no A/B variant. |
| **Mitigação atual** | Selector alternativo documentado — uso de `[data-navbar-ref], #navbar` como fallback considerado. |
| **Mitigação ideal** | Usar seletores semânticos (role-based) que independem de IDs: `cy.get('[role="banner"]')`. |
| **Status** | Documentado — melhoria planejada no roadmap |

---

## SUT: AutomationExercise.com

### FLAKE-006 — `register.cy.ts` — Conflito de email entre execuções paralelas

| Campo | Detalhe |
|---|---|
| **Arquivo** | `cypress/e2e/automation-exercise/auth/register.cy.ts` |
| **Frequência** | 0% em execuções sequenciais; potencial em paralelo |
| **Causa raiz** | Se dois jobs de CI rodarem em paralelo com o mesmo email, o segundo falhará com "Email Address already exist". |
| **Mitigação atual** | Email gerado com `Date.now()` timestamp: `qa.portfolio.${Date.now()}@test.com`. |
| **Mitigação ideal** | Usar UUID ou combinar `Date.now()` + `Math.random()`. Considerar `cy.task` para geração de dados únicos. |
| **Status** | Mitigado para execuções sequenciais |

---

## Legenda

| Status | Significado |
|---|---|
| Documentado | Identificado, não corrigido |
| Aceito | Limitação de design, não será corrigido |
| Mitigado | Workaround aplicado, não ideal |
| Resolvido | Correção permanente aplicada |
