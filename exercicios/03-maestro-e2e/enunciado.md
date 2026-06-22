# Atividade 3 — Suíte Maestro E2E (10 pts)

**Disciplina:** Testes de Aplicações Mobile
**Entrega:** até **28/06/2026**
**Modalidade:** individual
**Tempo estimado:** ~2h (flows 01–02 feitos em aula; 03–05 em casa)

---

## Contexto — a pirâmide fecha no mesmo app

Você já testou o app de filmes em dois níveis:

- **Atividade 1 (unit):** funções puras, store de favoritos
- **Atividade 2 (integração):** componentes + navegação + TanStack Query

Agora, **Atividade 3 (E2E):** o **mesmo app**, testado de ponta a ponta com **Maestro** — abrindo o app de verdade no emulador/device e dirigindo a UI como um usuário.

O app desta atividade — **CineFav** — é uma versão do app de filmes com **login**, **busca** e **favoritos**. Por padrão usa **dados mockados** (sem token TMDB, sem rede): os flows são **determinísticos**, sempre os mesmos filmes.

> **Opcional:** quer ver filmes **reais** da TMDB (como na A2)? Copie `.env.example` → `.env`, cole seu token e rode `npx expo start`. Sem token, o app roda mock (e o APK pronto já é mock). Os flows abaixo assumem o **mock** — com token real os filmes mudam, então use a **busca** (`Matrix` sempre acha) pra manter o flow estável.

---

## Pré-requisitos (setup)

👉 **Guia completo:** [COMECE-AQUI.md](https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/blob/main/exercicios/03-maestro-e2e/COMECE-AQUI.md) — passo a passo por SO + troubleshooting.

**Resumo (3 passos):**

1. **App CineFav** — baixar APK pronto e instalar (sem build, sem token):
   ```bash
   # https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/releases
   adb install CineFav.apk
   ```
2. **Maestro CLI** — `curl -Ls https://get.maestro.mobile.dev | bash` (Windows: `iwr get.maestro.mobile.dev/windows | iex`)
3. **Verificar** — na raiz do repo:
   ```bash
   bash setup-maestro-check.sh        # macOS/Linux
   # powershell -ExecutionPolicy Bypass -File setup-maestro-check.ps1   # Windows
   ```

Tudo verde ✅ → pronto.

---

## O app-alvo: CineFav (`com.puciec.cinefav`)

O app **abre na tela de Login** — todo flow precisa logar antes de chegar na lista.
Login mock: **qualquer email com `@` + senha de 4+ caracteres** entra (ex.: `aluno@puc.br` / `1234`).

| Tela | testIDs disponíveis |
|---|---|
| **Login** | `login-screen`, `login-email-input`, `login-password-input`, `login-submit-button`, `login-error-message` |
| **Lista** | `movielist-screen`, `movielist-list`, `movielist-search-button`, `movielist-favorites-button` |
| **Card do filme** | `movie-card-{id}`, `movie-card-title-{id}`, `movie-card-heart-{id}` |
| **Detalhe** | `detail-screen`, `detail-title`, `detail-favorite-button`, `detail-back-button` |
| **Busca** | `search-screen`, `search-input`, `search-clear-button`, `search-result-{id}`, `search-empty` |
| **Favoritos** | `favorites-screen`, `favorites-count`, `favorites-item-{id}`, `favorites-item-{id}-remove`, `favorites-empty` |

> `{id}` = id do filme. Ex.: **Matrix** = `603` → `movie-card-603`, `movie-card-heart-603`.
> São os **mesmos testIDs** (`movie-card-{id}`, `movie-card-heart-{id}`, `favorites-count`) que você viu nos testes de integração da A2.

Use `tapOn: id: "testID"` — mais estável que `tapOn: "texto"`.

### Caminho de navegação

```
launchApp → Login → (logar) → Lista de filmes
                                  ├─ 🔍 busca   (movielist-search-button)
                                  ├─ ❤️ favoritos (movielist-favorites-button)
                                  └─ tap no card → Detalhe
```

---

## Os 5 flows

| Flow | O que testa | Conceito Maestro |
|---|---|---|
| `flows/01-launch.yaml` | login + lista aparece (`assertVisible "Matrix"`) | **modelo resolvido** ✅ |
| `flows/02-search.yaml` | buscar um filme | **env** (`SEARCH_TERM`) |
| `flows/03-favorite.yaml` | favoritar na lista → conferir em Favoritos | asserção **cross-tela** |
| `flows/04-detail.yaml` | abrir detalhe, favoritar lá, voltar | navegação entre telas |
| `flows/05-js-dynamic.yaml` | termo de busca gerado por JS | **evalScript** (JS inline) |

`01-launch.yaml` já vem **resolvido** no starter — use como modelo. Os outros têm comentários `# TODO` guiando.

---

## Critérios de avaliação

| Item | Pts |
|---|---|
| `01-launch.yaml` (modelo — já resolvido) | 2 |
| `02-search.yaml` completo | 2 |
| `03-favorite.yaml` completo | 2 |
| `04-detail.yaml` completo | 2 |
| `05-js-dynamic.yaml` completo | 2 |
| **Bônus** — extrair um fragmento em `flows/_fragments/` (ex.: login) e usar via `runFlow:` | +1 |

**Total: 10 pts** (+ 1 bônus)

Cada flow vale **2 pts**: 1pt por existir com `appId:` correto + 1pt por estar completo (sem `# TODO` + tem `assertVisible`).

> **Dica do bônus:** todo flow precisa logar. Em vez de repetir os passos de login, crie `flows/_fragments/login.yaml` (com `appId: com.puciec.cinefav` + `---` + os passos do login) e chame com `runFlow`:
> ```yaml
> - runFlow:
>     when:
>       visible:
>         id: "login-screen"
>     file: _fragments/login.yaml
> ```

---

## Rodando local

**Emulator automático:**
```bash
cd exercicios/03-maestro-e2e
bash ../../maestro-local.sh           # macOS/Linux  (Windows: maestro-local.ps1)
```

**Manual (emulator já rodando):**
```bash
cd exercicios/03-maestro-e2e/pratica
maestro test flows/02-search.yaml     # um flow
maestro test flows/                    # todos
maestro studio                         # editor visual (localhost:9999)
```

**Troubleshooting:**
- Device não conecta? `adb kill-server && adb start-server`
- Emulator lento? `emulator -avd XXX -no-snapshot-load -no-audio`

---

## Entrega

PR no **seu fork** com os 5 flows em `exercicios/03-maestro-e2e/pratica/flows/`.

O bot (J.A.R.V.I.S.) comenta a nota no PR a cada commit — você sabe a nota antes do prazo.
Após aprovação do bot, cole o link do PR no Canvas (campo de entrega da Atividade 3).
