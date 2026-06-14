# Exercício — Testes de Aplicações Mobile · Aula 3

App Expo + TypeScript **já implementado e funcionando**. Mesmo app que a turma de Arquitetura constrói — aqui o foco é o oposto: **escrever a suíte de testes** sobre código que já existe.

> Os 2 hands-on da Aula 3 (Bloco 1 unit · Bloco 2 integração) começam **juntos em aula**. A **Atividade 2 (entrega 21/06, 15 pts)** é o término deles, que você faz em casa:
> **Parte A — Suíte Unitária (10 pts)** + **Parte B — Integração (5 pts)**.

**Você NÃO implementa features.** Stores, services, utils e as telas de integração já estão prontos. Sua entrega são os testes em `__tests__/`.

---

## O que está pronto pra você testar

**Parte A (unit):**

| Arquivo | O que tem | Tipo de teste |
|---|---|---|
| `src/components/MovieCard.tsx` | card de filme (título, nota, toque) | **teste de tela (RNTL)** ⭐ |
| `src/store/favoritesStore.ts` | Zustand: `add/remove/toggle/clear/isFavorite` | store (Jest) |
| `src/services/api.ts` | `isTokenError(err)` — classifica erro de auth | função pura (Jest) |
| `src/store/counterStore.ts` | Zustand: `increment/decrement/reset` | store (Jest) |
| `src/utils/poster-url.ts` | `posterUrl(path, size)` — monta URL do poster | função pura (Jest) — modelo |
| `src/queries/movies/get-popular-movies.ts` | `fetchPopularMovies(page)` | mock de dependência — **bônus** |

**Parte B (integração)** — versão já conectada das telas:

| Arquivo | O que tem | Tipo de teste |
|---|---|---|
| `src/hooks/useFavorites.ts` | hook sobre o store de favoritos | **renderHook** |
| `src/integration/MovieListScreen.tsx` | lista (TanStack Query) + contador no header | **integração (RNTL)** ⭐ |
| `src/integration/MovieCardFav.tsx` | card com favoritar (`testID`s) + navegação | integração (RNTL) |
| `src/integration/AppNavigator.tsx` | NavigationContainer (Home + Detail) | integração (RNTL) |

```
src/
├── components/MovieCard.tsx  ← Parte A: teste de tela (RNTL) ⭐
├── store/                    ← Zustand (favorites, counter)
├── services/api.ts           ← isTokenError
├── queries/movies/           ← TanStack Query (bônus)
├── utils/poster-url.ts       ← função pura — modelo resolvido
├── hooks/useFavorites.ts     ← Parte B: alvo do renderHook
└── integration/              ← Parte B: telas conectadas (lista, card, navegação)

__tests__/                    ← SUA ENTREGA — numerados na ordem de fazer
├── unit/                     ← Parte A
│   ├── 01-posterUrl.test.ts            ← EXEMPLO RESOLVIDO (comece aqui)
│   ├── 02-isTokenError.test.ts         ← it.todo
│   ├── 03-favoritesStore.test.ts       ← it.todo
│   ├── 04-MovieCard.test.tsx           ← it.todo — teste de tela ⭐
│   ├── 05-counterStore.test.ts         ← it.todo
│   └── 06-popularMovies.test.ts        ← it.todo — bônus (mock da api)
└── integration/              ← Parte B
    ├── 01-useFavorites.test.ts            ← it.todo — prática (renderHook)
    ├── 02-navigation.test.tsx             ← it.todo — prática (tap → Detail)
    └── 03-movieFlow.integration.test.tsx  ← it.todo — ENTREGA Parte B ⭐
```

---

## Setup

```bash
git clone https://github.com/SEU-USUARIO/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/exercicios/02-suite-jest-rntl/pratica
npm install
npm test          # 3 verdes (posterUrl) + alguns vermelhos (complete o expect) + desafios (todo)
```

> **Os testes (incl. RNTL de tela) não precisam de simulador, token nem rede.** Rodam só com Node.
> O app só roda de verdade (`npx expo start`) se você gerar um token TMDB — opcional pra esta atividade.
> **Stack:** Expo SDK 52 (RN 0.76 + React 18.3). O `.npmrc` do projeto já aponta pro **npm público** — não precisa de registry de empresa.

```bash
npm test               # roda a suíte
npm run test:watch     # watch mode (re-roda ao salvar)
npm run test:coverage  # relatório de cobertura (abre coverage/lcov-report/index.html)
npm run test:mutation  # mutation testing (Stryker) — RODE depois de resolver store+utils
```

> **`test:mutation` (Stryker):** mede a *qualidade* dos testes (mutation score), não só a cobertura. Escopado a `src/store` + `src/utils` (config em `stryker.conf.json`). Precisa dos testes dessas pastas **passando** — rode após completar `favoritesStore`, `counterStore` e `posterUrl`. Relatório em `reports/mutation/mutation.html`.

---

## Suas tasks

**Parte A — Suíte Unitária (10 pts):**

| # | Onde | O que fazer |
|---|---|---|
| TASK 1 | `__tests__/unit/01-posterUrl.test.ts` | Leia — é o **modelo resolvido** |
| TASK 2 | `__tests__/unit/03-favoritesStore.test.ts` | Escreva 6 testes (add/remove/toggle/isFavorite/clear) |
| TASK 3 ⭐ | `__tests__/unit/04-MovieCard.test.tsx` | **Teste de tela (RNTL):** render título/nota + `press` navega |
| TASK 4 | `__tests__/unit/02-isTokenError.test.ts` | Escreva 5 testes de `isTokenError` |
| TASK 5 | `__tests__/unit/05-counterStore.test.ts` | Escreva 3 testes (increment/decrement/reset) |
| TASK 6 | — | Atinja **cobertura ≥ 70%** em `src/store` e `src/utils` |
| TASK 7 (bônus) | `__tests__/unit/06-popularMovies.test.ts` | `fetchPopularMovies` com `jest.mock('@/services/api')` |

**Parte B — Integração (5 pts):** o setup (mock + wrapper) já vem pronto — você só escreve os `it()`.

| # | Onde | O que fazer |
|---|---|---|
| TASK 8 (prática) | `__tests__/integration/01-useFavorites.test.ts` | `renderHook` — toggle isolado |
| TASK 9 (prática) | `__tests__/integration/02-navigation.test.tsx` | `AppNavigator` — tap no card → Detail |
| **TASK 10 ⭐ (entrega)** | `__tests__/integration/03-movieFlow.integration.test.tsx` | **lista aparece + favoritar `♥ 1` + desfavoritar `♥ 0`** |

```bash
grep -rn "it.todo\|TODO \[TASK" __tests__/   # ver o que falta
```

---

## Dicas

- **Store Zustand é singleton.** Resete o estado entre testes com `useFavoritesStore.setState({ ids: [] })` no `beforeEach` (já está nos scaffolds).
- **Acesse fora de componente** com `useStore.getState()`: `useCounterStore.getState().increment()`.
- **Cobertura útil** = código *executado E verificado*. Renderizar sem `expect` infla a métrica e não testa nada.
- **IA pode ajudar** a gerar testes — mas **valide**: rode, confira asserts, cuidado com seletor/mock alucinado.

---

## Referências

- [Jest](https://jestjs.io/docs/getting-started) · [jest-expo](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Zustand — testing](https://github.com/pmndrs/zustand/blob/main/docs/guides/testing.md)
- [xUnit Test Patterns (Meszaros)](http://xunitpatterns.com/)
