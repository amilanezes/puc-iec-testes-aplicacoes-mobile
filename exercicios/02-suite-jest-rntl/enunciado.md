# Atividade 2 — Suíte Unitária + Integração sobre App RN (15 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** até **21/06/2026**
**Modalidade:** individual
**Tempo estimado:** **~2-3 horas**
**Dificuldade:** ⭐⭐ Médio — Jest/Node (sem simulador); escrever testes sobre código existente

> **Duas partes:** **Parte A — Suíte Unitária (10 pts)** + **Parte B — Integração (5 pts)** = **15 pts**.
> A Parte A cobre o Bloco 1 (funções puras, stores, RNTL com mock). A Parte B cobre o Bloco 2 (fluxo entre componentes: query + store + navegação).

---

## Por que essa atividade

Na Aula 3 a gente **começa junto** os dois hands-on (Bloco 1 — unit; Bloco 2 — integração), montando os padrões no telão. **Esta atividade é o término deles, que você faz sozinho em casa** — o core do QA: escrever uma suíte de testes verde sobre código que já existe, sem implementar features.

O app-alvo é o **mesmo app TMDB da disciplina de Arquitetura** (já implementado). Na **Parte A** você testa as camadas `store`, `utils` e `data`; na **Parte B**, o fluxo de integração em `src/integration/` (lista + favoritos + navegação).

---

## Pré-requisito (setup ~10min)

```bash
# 1. Fork do repo público no GitHub
# 2. Clone o SEU fork
git clone https://github.com/SEU-USUARIO/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/exercicios/02-suite-jest-rntl/pratica
npm install
npm test     # posterUrl já passa verde (3 testes). O resto é seu.
```

> **Não precisa simulador, token TMDB nem rede.** Unit test roda só com Node.

**Dica de editor:** abra a pasta `pratica/` no VS Code (`code .`, não o repo inteiro) e instale a extensão **`Orta.vscode-jest`** ("Jest") — ✓ verde / ✗ vermelho ao lado de cada `it()` + Test Explorer (🧪). Aí você vê o resultado sem ficar lendo o terminal.

> ⚠️ **1º passo pra escrever qualquer teste: tire o `.todo`.** `it.todo('...')` é só um marcador — **não roda** (aparece "todo"). Troque por `it('...', () => { /* seu teste */ })` pra virar um teste de verdade (✓ ou ✗).

---

## Parte A — Suíte Unitária (10 pts) · escrever testes em `__tests__/`

O exercício já tem **1 exemplo resolvido** (`unit/01-posterUrl.test.ts`) — use de modelo. Os outros arquivos têm `it.todo` marcando o que falta.

### 1. `unit/03-favoritesStore.test.ts` — Zustand (6 testes)

Store em `src/store/favoritesStore.ts`. Cubra:
- `add(id)` adiciona o id
- `add(id)` **não duplica** id já existente
- `remove(id)` tira o id
- `toggle(id)` adiciona se ausente, remove se presente (2 caminhos)
- `isFavorite(id)` reflete o estado
- `clear()` esvazia

> Store é singleton — resete entre testes com `useFavoritesStore.setState({ ids: [] })` no `beforeEach` (já está no scaffold). Acesse com `useFavoritesStore.getState()`.

### 2. `unit/04-MovieCard.test.tsx` — teste de tela (RNTL) ⭐

Componente em `src/components/MovieCard.tsx`. É o teste mais "cara de QA" — valida o que o usuário **vê** e **faz**:
- renderiza o **título** do filme (`screen.getByText`)
- renderiza a **nota** (`⭐ 8.7`)
- **toque no card navega** pro detalhe (`fireEvent.press` → `navigate` chamado)

> MovieCard usa `useNavigation()` — mocke o hook (não há `NavigationContainer` no teste). O scaffold já traz o mock pronto.

### 3. `unit/05-counterStore.test.ts` — Zustand (3 testes)

`increment` soma 1 · `decrement` subtrai 1 · `reset` zera.

### 4. `unit/02-isTokenError.test.ts` — função pura da camada data (5 testes)

`isTokenError(err)` em `src/services/api.ts`:
- `true` pra `response.status === 401`
- `true` pra `{ isTokenError: true }`
- `true` pra erro `TMDB_TOKEN_MISSING`
- `false` pra `null`
- `false` pra erro genérico (status 500)

### 5. Cobertura ≥ 70% em `src/store` e `src/utils`

```bash
npm run test:coverage
# abre coverage/lcov-report/index.html
```

---

## Parte B — Integração (5 pts) · escrever testes em `__tests__/integration/`

Aqui você testa **fluxo entre componentes** (Bloco 2): a lista busca dados (API mockada via TanStack Query) e favoritar um card reflete no contador do header. O alvo é a versão **já implementada** em `src/integration/` (`MovieListScreen`, `MovieCardFav`, `AppNavigator`) + o hook `src/hooks/useFavorites.ts`. Você só escreve os `it()` — **mock e wrapper já vêm prontos** no scaffold.

> Por que uma versão separada em `src/integration/`? O `MovieList`/`MovieCard` da Parte A são stubs que você completaria implementando features. Pra focar em **teste de integração** (não em implementar app), a Parte B traz as telas prontas e conectadas.

**Pontua só a entrega:** `__tests__/integration/03-movieFlow.integration.test.tsx` (3 cenários). Os outros dois arquivos são **prática** (não pontuam), mas faça-os primeiro — são o aquecimento.

| Arquivo | O que cobrir | Pontua? |
|---|---|---|
| `useFavorites.test.ts` | `renderHook` — toggle isolado (count, isFavorite) | prática |
| `navigation.test.tsx` | `AppNavigator` — tap no card → tela de detalhe | prática |
| **`movieFlow.integration.test.tsx`** | lista aparece (2) · favoritar → `♥ 1` (2) · desfavoritar → `♥ 0` (1) | **5 pts** |

> Pontos de teste expostos: `testID="favorites-count"` (header), `testID="movie-card-heart-1"` (botão favoritar). Use `findByText` (async) pra esperar a lista carregar e `toHaveTextContent` no contador.

---

## Critérios de avaliação

| Critério | Pontos |
|---|---|
| `npm install && npm test` roda em < 15min (eliminatório) | 2 |
| **Parte A** · Testes `favoritesStore` (6 verdes) | 2 |
| **Parte A** · Teste de tela `MovieCard` (RNTL) — render + press navega | 2 |
| **Parte A** · Testes `isTokenError` (5 verdes) | 2 |
| **Parte A** · Testes `counterStore` (3 verdes) | 1 |
| **Parte A** · Cobertura ≥ 70% em `src/store` e `src/utils` | 1 |
| **Parte B** · `movieFlow.integration.test.tsx` — lista aparece + favoritar `♥ 1` + desfavoritar `♥ 0` | 5 |

**Total: 15 pts** (Parte A: 10 · Parte B: 5)

> 🎁 **Bônus** (arredondamento):
> - `unit/06-popularMovies.test.ts` — `fetchPopularMovies` com `jest.mock('@/services/api')` (+1)
> - CI GitHub Actions verde no fork (workflow já vem pronto em `.github/workflows/test.yml`)
> - Testes parametrizados (`it.each`)

---

## Recomendado: use IA pra acelerar

> "Gere testes Jest pra `useFavoritesStore` (Zustand) cobrindo add/remove/toggle/isFavorite/clear, com `beforeEach` resetando o state via `setState`."

⚠️ **Valida cada teste antes de commitar.** IA alucina: import de path errado, `expect` sem matcher, mock que não bate com a assinatura real (`api.get(url, config)`). Teste que não tem `expect` infla cobertura e não testa nada.

---

## Entrega via GitHub (fork + PR)

1. Fork do repo público: <https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile>
2. Branch `entrega/atividade-2-<seu-nome>` no seu fork
3. Trabalhe direto em `exercicios/02-suite-jest-rntl/pratica/__tests__/` no SEU fork
4. Commit + push pro seu fork (**NÃO comite `node_modules/` nem `coverage/`** — `.gitignore` já cuida)
5. Submeter no Canvas com link do commit (ou PR)

**Detalhes do workflow:** ver página *"Como entregar atividades pelo GitHub"* no Canvas módulo Início.

## O que você NÃO precisa fazer

- **Não implementa feature** — o código de produção já está pronto
- **Não precisa rodar o app** (sem token/simulador) — testes (incl. RNTL) rodam só com Node
- **Não precisa E2E** (app rodando ponta a ponta no device) — isso é a Aula 4 (Maestro)

## Material de apoio (todos no GitHub público)

- **[exercício (app + scaffolds)](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/tree/main/exercicios/02-suite-jest-rntl/pratica)** — README com tasks
- **[guia-passo-a-passo.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/guia-passo-a-passo.md)** — comandos + troubleshooting
- **[template-relatorio.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/template-relatorio.md)** — README modelo
- **[Slide aula 3 — Jest/RNTL](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/slides/aula-03/aula-03-jest-rntl.pdf)**
