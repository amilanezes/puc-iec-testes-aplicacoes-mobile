# Grader — Testes de Aplicações Mobile (autograder CI)

Sistema de auto-correção das atividades práticas via GitHub Actions. Aluno faz fork → commit em `exercicios/<NN>-<atividade>/aluno-<github-username>/` → abre PR → CI roda validator → posta score no PR + sobe artifact com breakdown completo (acesso prof).

## Atividades cobertas

> ⚠️ Numeração atualizada (jun/2026): **Detox/Espresso saíram**, Maestro é o único E2E. A Atividade 2 passou a incluir **Integração** (Parte B).

| # | Atividade | Pts | Avaliador | Status |
|---|-----------|-----|-----------|--------|
| A1 | Análise de Cobertura | 15 | manual (textual) | — |
| A2 | Suíte Unitária (Parte A) + Integração (Parte B) | 15 | **CI `exercicio/.github/workflows/test.yml`** (ativo) · `unit-coverage.ts` (estrutural, Fase 2) | **gate de CI ativo** |
| A3 | Suíte Maestro Cross-Platform | 10 | `maestro-suite.ts` | **MVP ativo** |
| A4 | Performance + Security | 10 | manual (relatório) | — |
| PF | Projeto Final | 50 | manual | — |

> **A2 — como é avaliada:** a entrega é fork editando `exercicios/02-setup-suite-unitaria/exercicio/__tests__/` **in-place** (não `aluno-<user>/`). O gate real é o **CI `test.yml`** do próprio exercício, que roda os testes e exige **Parte A** (≥14 unit verdes + cobertura store/utils) **e Parte B** (os 3 testes de `movieFlow.integration.test.tsx` verdes). O `unit-coverage.ts` é um validator **estrutural** (confere sinais sem rodar testes) — útil pra pontuar a rubrica, mas ainda não plugado num workflow.

## Como funciona

1. Aluno cria fork do repo público
2. Implementa em path: `exercicios/<NN>-<atividade>/aluno-<github-username>/`
3. Push e abre PR para `main` do upstream
4. Workflow `.github/workflows/grade-atividade-NN.yml` dispara em PR (filtro `paths`)
5. Validator roda em runner ubuntu-latest:
   - Setup ambiente (Node 22, emulator Android, Maestro CLI)
   - Executa validator TS via `tsx`
   - Gera `grade.json` com score + breakdown
6. Bot posta comment no PR com:
   - Score numérico (X/Y)
   - Status (PASS / REVIEW NEEDED)
   - Breakdown público (critério → status emoji)
7. `grade.json` completo sobe como artifact (privado, só prof acessa)
8. Status check do job pass/fail. Pra merge: prof revisa + aprova manualmente.

## Estrutura

```
grader/
├── package.json
├── tsconfig.json
├── lib/
│   ├── compute-score.ts           # tipos + helpers (rubrica → score)
│   └── validators/
│       ├── unit-coverage.ts       # A2 Unit (Parte A) + Integração (Parte B) — estrutural, 15pts
│       └── maestro-suite.ts       # A3 Maestro — MVP ativo
└── README.md
```

> `native-ui-suite.ts` foi removido (atividade Espresso/Native UI não existe mais no curso).

## Rodar localmente (smoke test do prof)

```bash
cd grader
npm install

# Validar entrega real com execução em emulator
npx tsx lib/validators/maestro-suite.ts \
  --entrega ../exercicios/03-maestro-e2e/exercicio \
  --output /tmp/grade.json \
  --student-login jacksonsmith \
  --commit-sha local

# Modo dry-run (sem executar flows; só valida estrutura + parse)
npx tsx lib/validators/maestro-suite.ts \
  --entrega ../exercicios/03-maestro-e2e/exercicio \
  --output /tmp/grade.json \
  --no-run \
  --student-login jacksonsmith \
  --commit-sha local
```

## Critérios — A2 Unit + Integração (15pts) · `unit-coverage.ts`

Parte A — Unitária (10):
1. **Jest + RNTL configurados** — 2pts
2. **Mín 4 arquivos de teste** — 3pts
3. **Config de cobertura** — 2pts
4. **Teste de tela RNTL** (render + interação) — 2pts
5. **README com comandos** — 1pt

Parte B — Integração (5):
6. **Entrega `movieFlow.integration` presente** — 1pt
7. **QueryClientProvider + API mockada** — 2pts
8. **Fluxo do contador** (`favorites-count` / `toHaveTextContent`) — 1pt
9. **renderHook OU NavigationContainer/AppNavigator** — 1pt

Validator **estrutural** (não roda os testes) — pareia com o CI `test.yml` do exercício, que executa e gateia verde/vermelho. Pass threshold: 60% (9/15).

## Critérios — A3 Maestro · `maestro-suite.ts`

1. **Mín 5 flows YAML** em `flows/` — 4pts
2. **appId em cada flow** — 2pts
3. **Parse válido** (`maestro check`) — 4pts
4. **Execução real em emulator** (mín 5 passam) — 4pts
5. **README descrevendo flows** — 1pt

> ⚠️ **Follow-up:** o enunciado da A3 foi reescalado **15→10 pts** (Flows 6 · Firebase 2 · Matriz 2). O validator `maestro-suite.ts` ainda soma ~15 e cobre **só os flows** (Firebase/matriz são manuais). Rescale dos pesos + decisão sobre as partes manuais pendente.

## Adicionar novo validator (Fase 2+)

1. Criar `lib/validators/<tipo>.ts` exportando função `main()` que escreve `grade.json`
2. Adicionar workflow `.github/workflows/grade-atividade-<NN>.yml`
3. Path filter no `paths:` do workflow apontando pro path da atividade
4. Update README com novo validator

## Ambiente esperado em CI

Workflow `.github/workflows/grade-atividade-03.yml` provê:
- Node 22
- Java 17 (Android SDK)
- Android SDK + emulator (via `reactivecircus/android-emulator-runner`)
- Maestro CLI (instalado via `curl -Ls https://get.maestro.mobile.dev | bash`)

## Privacidade

- **Comment público**: score + status + breakdown público (sem detalhes sensíveis)
- **Artifact privado** (`grade.json`): breakdown completo + private notes; só prof baixa via UI Actions
- **Logs do workflow**: visíveis em PR público (atenção a logs verbose)

## Autoria

Material didático autoral. © 2026 Jackson Smith Moisés Matias.
