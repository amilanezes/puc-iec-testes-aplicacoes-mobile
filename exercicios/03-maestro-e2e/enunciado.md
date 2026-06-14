# Atividade 3 — Suíte Maestro Cross-Platform (10 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** até **28/06/2026** (1 semana após a Aula 4)
**Modalidade:** individual
**Tempo estimado:** ~2-3 horas
**Dificuldade:** ⭐⭐ Médio — Maestro CLI (simples), requer simulador iOS ou Android + conta Google

---

## Por que essa atividade

Aula 4 mostrou que Maestro é o framework E2E com menor curva de aprendizado e alta adoção em 2026. Aqui você vai escrever flows YAML reais, rodar em device físico via cloud e comparar com Appium com dados reais — não com opinião.

---

## Pré-requisito (setup ~15min)

```bash
# 1. Instalar Maestro CLI
curl -Ls "https://get.maestro.mobile.dev" | bash
# Windows: iwr get.maestro.mobile.dev/windows | iex

# 2. Verificar
maestro --version   # deve exibir 1.38.x ou superior

# 3. Clonar o starter
git clone https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/exercicios/03-maestro-e2e/pratica

# 4. App-alvo já instalado nos devices da disciplina:
#    iOS:     com.apptestesmobile  (App Store BR)
#    Android: com.apptestesmobile  (Play Store)
```

> Não precisa de Xcode nem Android Studio pra escrever flows YAML. Só precisa do app instalado no simulador/emulador e do Maestro CLI.

---

## O app-alvo: TestesQAMobile

App da disciplina com bugs propositais. Disponível em:
- 🍎 App Store BR: buscar "Testes QA Mobile" ou usar `appId: com.apptestesmobile`
- 🤖 Play Store: mesma busca

**testIDs disponíveis no app** (convenção `screen-elemento[-acao]`):

| Tela | testID exemplo |
|---|---|
| Home | `home-category-functional`, `home-category-performance` |
| Formulário de Usuário | `userform-name-input`, `userform-email-input`, `userform-submit-button` |
| Calculadora | `calculator-digit-7`, `calculator-operator-plus`, `calculator-equals`, `calculator-display` |
| Todo list | `todolist-add-button`, `todolist-item-${id}`, `todolist-item-delete-${id}` |
| Onboarding | `onboarding-next-button`, `onboarding-skip-button`, `onboarding-finish-button` |

---

## Parte 1 — 5 Flows Maestro (6 pts)

Escreva **5 flows YAML** cobrindo features diferentes do app. Cada flow deve:
- Usar `tapOn: id:` (não `tapOn: text:`) nos elementos que têm testID
- Ter pelo menos 1 `assertVisible` que verifique resultado esperado
- Rodar verde em **ao menos uma plataforma** (iOS sim OU Android emu)

**Pontuação:** **1 pt por flow** que rodar verde (até 5) **+ 1 pt** se os **5** rodarem verde = 6 pts.

**Flows obrigatórios:**

| # | Flow | Arquivo |
|---|---|---|
| 1 | Launch + home aparece com categorias | `flows/01-launch.yaml` |
| 2 | Preencher formulário de usuário e submeter | `flows/02-userform.yaml` |
| 3 | Calcular `7 + 3 =` e verificar resultado `10` | `flows/03-calculator.yaml` |
| 4 | Adicionar item na todo list + verificar que aparece | `flows/04-todolist.yaml` |
| 5 | Completar onboarding até a tela final | `flows/05-onboarding.yaml` |

**Bônus +1pt:** flow que usa `runFlow:` com fragmento reutilizável (ex: `_fragments/launch.yaml` chamado por múltiplos flows)

### Rodando os flows

```bash
# Flow individual (iOS Simulator)
maestro test flows/01-launch.yaml

# Todos os flows
maestro test flows/

# Com screenshots
maestro test flows/ --format junit --output results/
```

---

## Parte 2 — Firebase Test Lab (2 pts)

Execute **ao menos 1 flow** em device real via Firebase Test Lab:

```bash
# 1. Login Google Cloud
gcloud auth login
gcloud config set project SEU-PROJETO-FIREBASE

# 2. Verificar devices disponíveis
gcloud firebase test android models list | grep -E "shiba|redfin|oriole"

# 3. Submeter flow (Maestro Cloud ou gcloud diretamente)
maestro cloud --apiKey=$MAESTRO_API_KEY \
  --app-file=path/to/app.apk \
  flows/03-calculator.yaml
```

Entregável: **screenshot do relatório Firebase Test Lab** mostrando ao menos 1 flow verde em device real.

---

## Parte 3 — Matriz Comparativa Maestro vs Appium (2 pts)

Escreva uma **tabela comparativa** (pode ser em Markdown no PR ou PDF) com:

| Aspecto | Maestro | Appium 2 | Fonte / Referência |
|---|---|---|---|
| Linhas de código (flow de login) | X linhas | Y linhas | seu próprio teste |
| Tempo de execução do flow | Xs | Ys | medição real |
| Tempo de setup do zero | Xmin | Ymin | sua experiência |
| Flake em 3 runs consecutivos | X% | Y% | ou estimativa fundamentada |
| Suporte a cross-platform (mesmo arquivo) | sim/não | sim/não | docs |
| Curva de aprendizado (escala 1–5) | X | Y | sua avaliação |

Adicione 2–3 linhas de análise: em que cenário cada um ganha.

---

## Entrega

PR no **seu fork** com:

```
exercicios/03-maestro-e2e/
  flows/
    01-launch.yaml
    02-userform.yaml
    03-calculator.yaml
    04-todolist.yaml
    05-onboarding.yaml
    _fragments/          ← bônus
  results/               ← saída do junit reporter (opcional)
  firebase-screenshot.png
  comparativo-maestro-appium.md   (ou .pdf)
```

Link do PR colado no Canvas (campo de entrega da Atividade 3).

> **Eliminatório:** `maestro test flows/` deve rodar pelo menos 3 dos 5 flows verde. Se menos de 3 passarem, a Parte 1 não é pontuada.
