# Atividade 4 — Suíte Maestro Cross-Platform (15 pts)

> **Disciplina:** Testes de Aplicações Mobile (TAM) — PUC IEC 2026
> **Aula correspondente:** Aula 4 (15/06/2026)
> **Prazo:** 21/06/2026 — 23:59 (horário Brasília)
> **Auto-grading:** este exercício é avaliado automaticamente via CI

## Objetivo

Implementar suíte Maestro com **5 flows YAML cobrindo user journeys críticos** de um app mobile, executável em emulator Android sem flake.

## Stack obrigatória

- **Maestro CLI** ≥ 1.x (instalar via `curl -Ls "https://get.maestro.mobile.dev" | bash`)
- App de referência: **fornecido em `starter/app-referencia/`** (ou app à sua escolha — desde que documente como instalar)
- Emulator Android (Pixel 8 API 34 recomendado, mas qualquer Android API 30+)

## Como entregar

### 1. Fork

```bash
# No GitHub: clique em Fork no canto superior direito
# Clone o seu fork:
git clone https://github.com/<seu-username>/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile
```

### 2. Branch (opcional mas recomendado)

```bash
git checkout -b atividade-04
```

### 3. Estrutura de entrega

Crie sua pasta seguindo a convenção exata:

```
exercicios/04-suite-maestro-cross-platform/aluno-<seu-github-username>/
├── README.md                    # descrição dos flows + comando run
├── flows/
│   ├── 01-login.yaml
│   ├── 02-navegacao-principal.yaml
│   ├── 03-busca.yaml
│   ├── 04-detalhe-item.yaml
│   └── 05-checkout-ou-acao-critica.yaml
└── (opcional) maestro-config.yaml
```

⚠️ **Atenção:** o nome `aluno-<seu-github-username>` deve ser **exatamente** seu username do GitHub em minúsculas. O CI usa esse path para localizar sua entrega.

### 4. Implementação

- **5 flows YAML** distintos cobrindo user journeys do app
- **Cada flow** declara `appId` no header
- **Sintaxe Maestro válida** (testar com `maestro check <arquivo>`)
- **Execução em emulator** sem falha de runtime
- **README.md** descrevendo cada flow + comando para executar

### 5. Push + PR

```bash
git add exercicios/04-suite-maestro-cross-platform/aluno-<seu-username>/
git commit -m "feat(atividade-04): suíte Maestro com 5 flows"
git push origin atividade-04
```

Abra Pull Request para `main` do upstream `jacksonsmith/puc-iec-testes-aplicacoes-mobile`.

### 6. CI dispara automaticamente

- Workflow `Grade — Atividade 4 (Maestro Suite)` roda em ~10 minutos
- Bot posta comment no PR com score e breakdown
- Status check verde (pass) ou vermelho (review needed)

## Critérios de avaliação (15 pts)

| # | Critério | Peso |
|---|----------|------|
| 1 | Mínimo 5 flows YAML em `flows/` | 4 |
| 2 | Cada flow declara `appId` no header | 2 |
| 3 | Maestro valida sintaxe de todos os flows (`maestro check`) | 4 |
| 4 | Mínimo 5 flows passam em emulator Android (execução real) | 4 |
| 5 | README descreve cada flow + comando para executar | 1 |

**Pass threshold:** 60% (9/15) para status check verde.

> Score detalhado por critério é compartilhado no comment público; **breakdown completo** com diagnóstico de cada falha fica em artifact privado (acesso do prof).

## Exemplo de flow YAML

```yaml
appId: com.exemplo.app
---
- launchApp
- tapOn:
    id: "email-input"
- inputText: "user@email.com"
- tapOn:
    id: "password-input"
- inputText: "senha-segura"
- tapOn: "Entrar"
- assertVisible: "Bem-vindo"
```

## Rodar localmente antes de fazer PR

```bash
# Suba emulator Android (Android Studio → Pixel 8)
# Instale o app de referência:
cd exercicios/04-suite-maestro-cross-platform/aluno-<seu-username>/starter/app-referencia
./scripts/install-app.sh   # ou siga README do starter

# Validar sintaxe sem rodar:
cd exercicios/04-suite-maestro-cross-platform/aluno-<seu-username>
maestro check flows/01-login.yaml

# Executar todos os flows:
maestro test flows/
```

## Pitfalls comuns

❌ **Path incorreto** — use exatamente `aluno-<seu-username-em-minusculas>/`
❌ **`tapOn:` por texto que muda** — prefira `id:` quando disponível
❌ **Flow sem `appId`** — falha automaticamente no critério 2
❌ **Sleeps fixos** — Maestro tem retry built-in; não precisa de `wait`
❌ **Flake intermitente** — rode 3x localmente antes do PR

## FAQ

**Posso usar app próprio em vez do starter?**
Sim. Documente no seu README como instalar/buildar.

**Posso entregar em iOS Simulator?**
O CI roda só Android (Ubuntu runner). Você pode testar local em iOS, mas a avaliação CI será em Android.

**Quantas tentativas posso fazer?**
Ilimitadas até o prazo. Cada push novo no PR re-dispara o CI.

**Reabrir PR pra fazer correções?**
Não precisa. Push novos commits no mesmo branch — o CI re-roda.

## Recursos

- [Maestro Docs (oficial)](https://maestro.mobile.dev)
- [Mobile.dev Blog — Why YAML for E2E Tests](https://blog.mobile.dev)
- Aula 4 da disciplina (slides em [`slides-source/aula-04-maestro-appium-cloud.md`](../../slides-source/) — versão pública via repo privado do prof)
- Bibliografia: ver [`BIBLIOGRAFIA.md`](../../BIBLIOGRAFIA.md)
