# Plano de Testes — Cypress QA Portfolio

## SUT 1: Amazon.com.br (Exploration Suite)

| Funcionalidade | Smoke ✅ | Exploration 🔍 | Tipo |
|---|---|---|---|
| Carregamento da homepage | ✅ | ✅ | UI |
| Elementos do header | ✅ | ✅ | UI |
| Pesquisa básica por texto | ✅ | ✅ | UI |
| Pesquisa sem resultados | ✅ | ✅ | UI |
| Pesquisa data-driven (fixture) | ✅ | ✅ | UI |
| Auto-complete de pesquisa | — | ✅ | UI |
| Filtros laterais de resultados | — | ✅ | UI |
| Ordenação de resultados | — | ✅ | UI |
| Paginação de resultados | — | ✅ | UI |
| Navegação por categorias (dropdown) | — | ✅ | UI |
| Menu hamburguer — abertura/fechamento | ✅ | ✅ | UI |
| Navegação por departamentos | ✅ | ✅ | UI |
| Barra de navegação superior | — | ✅ | UI |
| Página de login — formulário | — | ✅ | UI |
| Página de login — links legais | — | ✅ | UI |
| Página de cadastro — formulário | — | ✅ | UI |
| Página de produto — informações | — | ✅ | UI |
| Página de produto — galeria | — | ✅ | UI |
| Página de produto — avaliações | — | ✅ | UI |
| Carrinho vazio (não-autenticado) | — | ✅ | UI |
| Footer — elementos | — | ✅ | UI |
| Footer — links legais | — | ✅ | UI |
| Footer — voltar ao topo | — | ✅ | UI |
| Responsividade mobile (375x667) | — | ✅ | UI |
| Responsividade tablet (768x1024) | — | ✅ | UI |
| Responsividade desktop (1280x720) | — | ✅ | UI |
| Responsividade Full HD (1920x1080) | — | ✅ | UI |
| Responsividade data-driven (fixture) | — | ✅ | UI |
| Acessibilidade — landmarks ARIA | — | ✅ | A11Y |
| Acessibilidade — imagens com alt | — | ✅ | A11Y |
| Acessibilidade — inputs com label | — | ✅ | A11Y |
| Acessibilidade — hierarquia headings | — | ✅ | A11Y |
| Acessibilidade — links com texto | — | ✅ | A11Y |
| Acessibilidade — navegação por teclado | — | ✅ | A11Y |
| Performance — tempo de carregamento | — | ✅ | Perf |

**Cobertura estimada:** 5 smoke / 34 exploration = 39 testes

---

## SUT 2: AutomationExercise.com (Deterministic Suite)

| Funcionalidade | Teste | Tipo |
|---|---|---|
| Login — exibição do formulário | ✅ | UI |
| Login — credenciais inválidas | ✅ | UI |
| Login — campo de email vazio | ✅ | UI |
| Cadastro — fluxo completo (register → delete) | ✅ | E2E |
| Cadastro — formulário de signup visível | ✅ | UI |
| Produtos — listagem de produtos | ✅ | UI |
| Produtos — pesquisa por termo válido | ✅ | UI |
| Produtos — pesquisa data-driven (fixture) | ✅ | UI |
| Detalhe do produto — título, preço, categoria | ✅ | UI |
| Detalhe do produto — disponibilidade | ✅ | UI |
| Detalhe do produto — seletor de quantidade | ✅ | UI |
| Detalhe do produto — botão Add to Cart | ✅ | UI |
| Carrinho — adicionar produto | ✅ | UI |
| Carrinho — remover produto | ✅ | UI |
| Carrinho — adicionar múltiplos produtos | ✅ | UI |
| Checkout — fluxo E2E completo (register → pay → confirm) | ✅ | E2E |
| Checkout — endereço exibido | ✅ | UI |
| Checkout — revisão do pedido | ✅ | UI |
| Checkout — pedido confirmado | ✅ | E2E |
| API GET /productsList — status 200 | ✅ | API |
| API GET /productsList — schema do produto | ✅ | API |
| API GET /brandsList — status 200 | ✅ | API |
| API POST /searchProduct — resultados retornados | ✅ | API |
| API POST /searchProduct — erro sem parâmetro | ✅ | API |
| API POST /verifyLogin — erro sem credenciais | ✅ | API |
| API POST /verifyLogin — erro com usuário inexistente | ✅ | API |
| API GET /deleteAccount — método não permitido | ✅ | API |

**Cobertura estimada:** 27 testes (UI + E2E + API)

---

## Resumo geral

| Suite | Testes | Tipo | Bloqueia CI? |
|---|---|---|---|
| Amazon Smoke | ~5 | UI | Não (continue-on-error) |
| Amazon Exploration | ~34 | UI + A11Y + Perf | Não |
| AutomationExercise | ~27 | UI + E2E + API | **Sim** |
| **Total** | **~66** | | |

---

## Cobertura por tipo

| Tipo | Quantidade |
|---|---|
| UI (elemento / visibilidade) | ~48 |
| E2E (fluxo ponta-a-ponta) | ~3 |
| API (cy.request) | ~7 |
| Acessibilidade | ~6 |
| Responsividade | ~7 |
| Performance | ~1 |
