# Atividade 2 — Suíte Unitária sobre App RN (10 pts)

> **TAM** | **Aula:** 2 (28/05/2026) | **Entrega:** 11/06/2026

## Objetivo

Escrever uma **suíte de testes unitários (Jest + RNTL)** sobre um app React Native que já vem implementado — o mesmo app TMDB da disciplina de Arquitetura. Foco do QA: testar código existente, **não** implementar feature.

## Por onde começar

1. **Enunciado completo:** [`enunciado.md`](./enunciado.md)
2. **Guia passo a passo:** [`guia-passo-a-passo.md`](./guia-passo-a-passo.md)
3. **App + scaffolds:** [`pratica/`](./pratica/) — leia o `README.md` do exercício
4. **Modelo de README de entrega:** [`template-relatorio.md`](./template-relatorio.md)

```bash
cd pratica
npm install
npm test     # 3 verdes (posterUrl) + alguns VERMELHOS (complete o expect) + alguns todo (desafios)
```

## Como o exercício está montado (2 níveis)

- **Fáceis** ✅ — já são `it()` com **Arrange/Act prontos**; você completa **só o `expect`**. Começam **vermelhos** → ficam verdes quando você preenche o valor esperado.
- **Desafios** 🔴 — ainda `it.todo`; você escreve o teste **inteiro** a partir da dica logo acima.

> 📌 **Modelo 100% resolvido:** [`posterUrl.test.ts`](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/posterUrl.test.ts#L8) — leia antes de começar.

## Onde escrever cada teste (links diretos por linha)

### 1. `favoritesStore.test.ts` — store Zustand

| Teste | Nível | Abrir |
|---|---|---|
| `add(id)` adiciona o id | ✅ fácil | [linha 27](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/favoritesStore.test.ts#L27) |
| `remove(id)` tira o id | ✅ fácil | [linha 34](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/favoritesStore.test.ts#L34) |
| `isFavorite(id)` reflete estado | ✅ fácil | [linha 43](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/favoritesStore.test.ts#L43) |
| `clear()` esvazia | ✅ fácil | [linha 51](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/favoritesStore.test.ts#L51) |
| `add(id)` não duplica | 🔴 desafio | [linha 63](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/favoritesStore.test.ts#L63) |
| `toggle(id)` adiciona/remove | 🔴 desafio | [linha 67](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/favoritesStore.test.ts#L67) |

### 2. `counterStore.test.ts` — store Zustand (todos ✅ fáceis)

| Teste | Abrir |
|---|---|
| `increment` soma 1 | [linha 21](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/counterStore.test.ts#L21) |
| `decrement` subtrai 1 | [linha 28](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/counterStore.test.ts#L28) |
| `reset` volta pra 0 | [linha 35](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/counterStore.test.ts#L35) |

### 3. `api.test.ts` — `isTokenError` (todos ✅ fáceis)

| Teste | Abrir |
|---|---|
| `true` pra `status 401` | [linha 19](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/api.test.ts#L19) |
| `true` pra flag `isTokenError` | [linha 23](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/api.test.ts#L23) |
| `true` pra `TMDB_TOKEN_MISSING` | [linha 27](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/api.test.ts#L27) |
| `false` pra `null` | [linha 31](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/api.test.ts#L31) |
| `false` pra erro genérico (500) | [linha 35](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/api.test.ts#L35) |

### 4. `MovieCard.test.tsx` — teste de tela (RNTL) 🔴 **parte mais difícil**

Escreva o corpo inteiro (render + query + assert). Mock de navegação já vem pronto.

| Teste | Abrir |
|---|---|
| renderiza o título | [linha 36](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/MovieCard.test.tsx#L36) |
| renderiza a nota (`⭐ 8.7`) | [linha 39](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/MovieCard.test.tsx#L39) |
| toque no card navega | [linha 43](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/MovieCard.test.tsx#L43) |

### 🎁 Bônus — `popularMovies.test.ts` (mock de dependência)

| Teste | Abrir |
|---|---|
| chama `/movie/popular` com a page | [linha 22](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/popularMovies.test.ts#L22) |
| devolve o `data` da resposta | [linha 23](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/02-suite-jest-rntl/pratica/__tests__/popularMovies.test.ts#L23) |

## O que entregar

| # | Critério | Peso |
|---|----------|------|
| 1 | `npm install && npm test` roda em < 15min (eliminatório) | 2 |
| 2 | Testes `favoritesStore` (6 verdes) | 2 |
| 3 | Teste de tela `MovieCard` (RNTL) — render + press navega | 2 |
| 4 | Testes `isTokenError` (5 verdes) | 2 |
| 5 | Testes `counterStore` (3 verdes) | 1 |
| 6 | Cobertura ≥ 70% em `src/store` e `src/utils` | 1 |

**Total: 10 pts.** Bônus (arredondamento): mock de query (`jest.mock`), CI verde no fork, testes parametrizados (`it.each`).

> Você trabalha em `starter/__tests__/`. **Não comite `node_modules/` nem `coverage/`** — o `.gitignore` já cuida.
