# Exercício — Atividade 3: Suíte Maestro E2E

App-alvo: **TestesQAMobile** (`appId: com.apptestesmobile`), instalado no simulador iOS ou emulador Android.

## Setup

```bash
# Maestro CLI (uma vez)
curl -Ls "https://get.maestro.mobile.dev" | bash
maestro --version    # 1.38.x ou superior
```

## Como rodar

```bash
maestro test flows/01-launch.yaml   # flow individual
maestro test flows/                 # todos
```

## O que fazer

`flows/01-launch.yaml` já vem **resolvido** — use de modelo. Os outros 4 têm `# TODO` marcando o que falta:

| Flow | Arquivo | testIDs úteis |
|---|---|---|
| 1 — Launch (✅ modelo) | `flows/01-launch.yaml` | `home-category-functional` |
| 2 — Formulário de usuário | `flows/02-userform.yaml` | `userform-name-input`, `userform-email-input`, `userform-submit-button` |
| 3 — Calculadora `7 + 3 = 10` | `flows/03-calculator.yaml` | `calculator-digit-7`, `calculator-operator-plus`, `calculator-digit-3`, `calculator-equals`, `calculator-display` |
| 4 — Todo list | `flows/04-todolist.yaml` | `todolist-add-button`, `todolist-item-${id}` |
| 5 — Onboarding | `flows/05-onboarding.yaml` | `onboarding-next-button`, `onboarding-finish-button` |

**Bônus:** extraia um fragmento reutilizável em `flows/_fragments/` e chame com `runFlow:`.

> Regra: use `tapOn: { id: ... }` (não `tapOn: "texto"`) nos elementos que têm testID, e pelo menos 1 `assertVisible` por flow.
