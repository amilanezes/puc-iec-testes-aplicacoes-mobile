# README — Atividade 2 Suíte Unitária RN — [Seu Nome]

> Use isso como base do README do seu fork (`exercicios/02-suite-jest-rntl/pratica/README-entrega.md` ou no PR).

## Identificação

- **Aluno:** [seu nome]
- **Node:** [v22.x]
- **Repo (seu fork):** [URL]
- **Commit/PR de entrega:** [URL]

## Como rodar

```bash
cd exercicios/02-suite-jest-rntl/pratica
npm install
npm test
npm run test:coverage
```

## Resultado da suíte

```
[cole a saída do npm test — ex: Tests: 14 passed, 14 total]
```

## Cobertura

| Pasta | % Stmts | % Branch |
|---|---|---|
| `src/store` | [ex: 100] | [ex: 100] |
| `src/utils` | [ex: 100] | [ex: 100] |

![Cobertura](./coverage-screenshot.png)

## Testes escritos

| Arquivo | Casos | O que cobre |
|---|---|---|
| `favoritesStore.test.ts` | 6 | add / add-sem-duplicar / remove / toggle / isFavorite / clear |
| `MovieCard.test.tsx` | 2+ | render título/nota · toque navega (RNTL) |
| `api.test.ts` | 5 | isTokenError: 401, flag, missing, null, 500 |
| `counterStore.test.ts` | 3 | increment / decrement / reset |

## Decisões de teste

- Como resetei o estado da store entre testes? [beforeEach + setState]
- Algum caso que você quase esqueceu? [ex: toggle nos 2 caminhos]
- Usou IA? O que precisou corrigir no que ela gerou? [seja honesto]

## Referência

[1 referência — Jest docs / Khorikov Unit Testing / Meszaros / slide aula 2]

---

## 🎁 Bônus implementado (opcional)

- [ ] `popularMovies.test.ts` — mock de `@/services/api` com `jest.mock`
- [ ] CI GitHub Actions verde no fork
- [ ] Testes parametrizados (`it.each`)

[Cole prints / paths relevantes]
