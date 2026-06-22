# Grader — Atividade 3 (Maestro E2E)

Validador estrutural dos flows Maestro. Roda em CI via `grade.yml`.

## Uso local

```bash
cd exercicios/03-maestro-e2e/grader
npm install
npx ts-node validator.ts --entrega <path-para-entrega>
```

Exemplos:
```bash
# Scaffold (deve dar ~1/7)
npx ts-node validator.ts --entrega ../pratica

# Gabarito completo (deve dar 7/7 auto)
npx ts-node validator.ts --entrega ../gabarito

# PR do aluno (via gh pr checkout)
gh pr checkout 42
npx ts-node validator.ts --entrega ../../../../exercicios/03-maestro-e2e
```

## Critérios

| Critério | Pts | Auto? |
|---|---|---|
| 5 flows presentes + assertVisible + sem TODO | 5 | ✅ |
| Bônus conjunto (todos 5 válidos) | 1 | ✅ |
| Firebase screenshot existe | 1* | ✅ |
| Comparativo existe | 1* | ✅ |
| P2 qualidade (foto mostra device real verde) | 1 | 📝 manual |
| P3 qualidade (tabela completa + análise) | 1 | 📝 manual |
| Bônus `_fragments/` + `runFlow:` | 1 | ✅ |

*estrutural: pontua pela existência, qualidade avaliada manualmente no Canvas.

## Output

`grade.json` gerado em `grader/grade.json` após a execução. Lido pelo workflow para postar o comentário no PR.
