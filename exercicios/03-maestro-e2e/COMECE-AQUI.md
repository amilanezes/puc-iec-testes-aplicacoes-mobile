# 🚀 Comece aqui — Setup Maestro (15 min)

Guia único de setup pra Atividade 3. Siga na ordem. Travou? Pula pro [Troubleshooting](#troubleshooting).

> **Atalho:** já tem emulator + adb? Vai direto pro [Passo 3](#3-maestro-cli).

---

## Pré-requisito: um device Android

Você precisa de **um** dos dois:

| Opção | Quando usar | Peso |
|---|---|---|
| 📱 **Celular físico** (USB) | Tem Android à mão | Leve — recomendado em PC fraco |
| 💻 **Emulador** (Android Studio) | Sem celular | Pesado — precisa de RAM |

**Celular físico:** ative *Opções do desenvolvedor* → *Depuração USB*, conecte o cabo.
**Emulador:** precisa do Android Studio (passo 1).

---

## 1. Android Studio + adb + variáveis de ambiente

> **É a parte que mais trava.** Faça com calma, em casa.

**a) Instale o Android Studio** — `developer.android.com/studio`. Ele traz o **SDK**, o **`adb`** (platform-tools) e o **emulador**.
(Alternativa só-`adb`, sem Studio: macOS `brew install android-platform-tools` · Windows `choco install android-platform-tools` · Linux `sudo apt install android-tools-adb`.)

**b) Variáveis de ambiente** — pra `adb`/`emulator` funcionarem no terminal:

```bash
# macOS / Linux — adicione no ~/.zshrc (ou ~/.bashrc) e reabra o terminal:
export ANDROID_HOME=$HOME/Library/Android/sdk      # Linux: $HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
```
- **Windows:** Painel de Controle → *Editar variáveis de ambiente* → criar **`ANDROID_HOME`** (ex: `C:\Users\voce\AppData\Local\Android\Sdk`) e adicionar `%ANDROID_HOME%\platform-tools` e `%ANDROID_HOME%\emulator` no **Path**. Reabra o terminal.

**c) Criar um emulador** (se não usar celular): Android Studio → **Device Manager** → *Create device* → escolha um Pixel + imagem (API 34) → ▶.

Confira tudo: **`adb devices`** deve listar seu device/emulator.

## 2. App CineFav

App próprio da disciplina — **não está em nenhuma loja**. O APK pronto roda com **dados mockados** (filmes fixos, **sem token, sem rede**) — é tudo que a atividade precisa:

```bash
# https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/releases
adb install CineFav.apk
```

> **Opcional:** quer filmes **reais** da TMDB (como na A2)? Rode do código-fonte: `cd pratica && cp .env.example .env`, cole seu token TMDB, `npx expo start`. Sem token = mock.

## 3. Maestro CLI

```bash
# macOS / Linux
curl -Ls https://get.maestro.mobile.dev | bash

# Windows (PowerShell)
iwr get.maestro.mobile.dev/windows | iex
```

Reabra o terminal e confira: `maestro --version`

## 4. Verificar tudo de uma vez

Na raiz do repo:

```bash
# macOS / Linux
bash setup-maestro-check.sh

# Windows
powershell -ExecutionPolicy Bypass -File setup-maestro-check.ps1
```

✅ Tudo verde → pronto pra rodar os flows.

## 5. Rodar os flows

```bash
# entre na pasta do app (rode o Maestro SEMPRE daqui, não da raiz):
cd exercicios/03-maestro-e2e/pratica

ls flows                             # confirme: deve listar 01-launch.yaml, ...  (Windows: dir flows)

maestro test flows/01-launch.yaml   # modelo resolvido — deve passar
maestro studio                       # editor visual (localhost:9999)
```

**Atalho com emulator automático:**
```bash
# macOS / Linux
bash maestro-local.sh
# Windows
powershell -ExecutionPolicy Bypass -File maestro-local.ps1
```

---

## Troubleshooting

| Problema | Solução |
|---|---|
| `adb devices` vazio | Emulator não bootou / cabo USB / *Depuração USB* desligada |
| Maestro instalou mas comando não acha | Reabra o terminal (PATH). macOS/Linux: `export PATH="$PATH:$HOME/.maestro/bin"` |
| `maestro hierarchy` vazio ou trava | `adb kill-server && adb start-server`, reinicie o emulator |
| Emulator muito lento | AVD com menos RAM, `-no-snapshot-load -no-audio`, ou use celular físico |
| App não instala (`INSTALL_FAILED`) | Desinstale versão antiga: `adb uninstall com.puciec.cinefav` |
| App abre em branco / pede login | Normal — faça login: email com `@` + senha 4+ chars (ex: `aluno@puc.br` / `1234`) |
| Sem celular nem emulator roda | Fale com o professor — alternativa Maestro Cloud (free tier) |

Dúvida? **Teams da turma** ou jackson.96@gmail.com.
