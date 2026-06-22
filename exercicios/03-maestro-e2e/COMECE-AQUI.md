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
**Emulador:** Android Studio → Device Manager → ▶. Em PC fraco, use AVD com pouca RAM e cold boot.

---

## 1. adb (Android Platform Tools)

| SO | Comando |
|---|---|
| 🍎 macOS | `brew install android-platform-tools` |
| 🪟 Windows | `choco install android-platform-tools` |
| 🐧 Linux | `sudo apt install android-tools-adb` |

Confira: `adb devices` → deve listar seu device/emulator.

## 2. App TestesQAMobile

```bash
# Baixar APK pré-compilado (sem build!)
# https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/releases

adb install app-debug.apk
```

Alternativa: Play Store / App Store → buscar **"Testes QA Mobile"**.

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
cd exercicios/03-maestro-e2e/pratica
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
| App não instala (`INSTALL_FAILED`) | Device é x86_64 ou arm64? O APK cobre os dois. Desinstale versão antiga: `adb uninstall com.apptestesmobile` |
| Sem celular nem emulator roda | Fale com o professor — alternativa Maestro Cloud (free tier) |

Dúvida? **Teams da turma** ou jackson.96@gmail.com.
