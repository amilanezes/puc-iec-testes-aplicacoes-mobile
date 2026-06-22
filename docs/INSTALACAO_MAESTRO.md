# Instalação do Maestro CLI

> Disciplina **Testes de Aplicações Mobile** — PUC IEC 2026
> Material de apoio Aula 4 (15/06/2026)

Maestro é a ferramenta principal de automação cross-platform usada na disciplina. Este guia cobre instalação **nativa** (recomendada) e **Docker** (alternativa pra ambientes restritos).

---

## ⚡ Caminho rápido (TL;DR)

| OS | Comando |
|----|---------|
| **Mac** | `curl -Ls "https://get.maestro.mobile.dev" \| bash` |
| **Linux** | `curl -Ls "https://get.maestro.mobile.dev" \| bash` |
| **Windows** | `iwr https://get.maestro.mobile.dev -useb \| iex` (PowerShell) |

Depois: `maestro --version` deve responder. Adicione `~/.maestro/bin` ao PATH se precisar.

---

## 🍎 Mac (recomendado)

### 1. Maestro CLI

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Adicionar ao PATH (zsh é padrão em Macs modernos):

```bash
echo 'export PATH="$PATH:$HOME/.maestro/bin"' >> ~/.zshrc
source ~/.zshrc
```

Verificar:

```bash
maestro --version
# Esperado: 1.x.x
```

### 2. Java 17 (necessário pro Maestro internamente)

```bash
brew install temurin@17
```

Adicionar `JAVA_HOME`:

```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
java --version
```

### 3. Android Studio + AVD (Pixel 8 API 34)

1. Baixar [Android Studio Iguana+](https://developer.android.com/studio)
2. SDK Manager → instalar Android 14 (API 34)
3. AVD Manager → criar device:
   - Phone → Pixel 8
   - System Image: Android 14 (API 34) com **Google APIs**
   - Hardware: ≥ 4GB RAM
4. Iniciar emulator: `emulator -avd Pixel_8_API_34`

### 4. Xcode 16+ + Simulator iOS (apenas Mac)

1. App Store → Xcode 16+
2. Abrir Xcode uma vez (aceita licenças)
3. CLI tools: `sudo xcode-select --install`
4. Simulator: já vem com Xcode (Window → Devices and Simulators)

### 5. Smoke test

```bash
# Iniciar emulator Android
emulator -avd Pixel_8_API_34 &

# Instalar o app CineFav (APK dos Releases) — sem token, dados mockados
adb install CineFav.apk

# Rodar o primeiro flow (modelo resolvido)
cd exercicios/03-maestro-e2e/pratica
maestro test flows/01-launch.yaml
```

---

## 🐧 Linux (Ubuntu / Debian / Fedora)

### 1. Maestro CLI

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
echo 'export PATH="$PATH:$HOME/.maestro/bin"' >> ~/.bashrc
source ~/.bashrc
maestro --version
```

### 2. Java 17

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y openjdk-17-jdk

# Fedora
sudo dnf install -y java-17-openjdk-devel

java --version
```

### 3. Android SDK + emulator + KVM

```bash
# Habilitar KVM (necessário pra emulator x86_64)
sudo apt install -y qemu-kvm libvirt-daemon-system
sudo usermod -aG kvm $USER
# logout/login após esse comando
```

Android Studio: baixar de [developer.android.com/studio](https://developer.android.com/studio) e instalar.

```bash
# Após instalar Android Studio:
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
```

Criar AVD via Android Studio (mesma config: Pixel 8 API 34).

### 4. iOS — não disponível em Linux

iOS Simulator é exclusivo de macOS. Alternativas:
- Mac remoto via SSH/VNC
- Cloud farm (Firebase Test Lab, BrowserStack — Aula 4 cobre)
- Pular testes iOS e foca em Android (a disciplina permite)

### 5. Smoke test

Igual ao Mac (passo 5).

---

## 🪟 Windows 10/11

### 1. Maestro CLI (PowerShell como administrador)

```powershell
iwr https://get.maestro.mobile.dev -useb | iex
```

Adicionar ao PATH:

1. Abrir **Sistema → Configurações Avançadas → Variáveis de Ambiente**
2. Em "User variables" → editar `Path`
3. Adicionar nova entrada: `%USERPROFILE%\.maestro\bin`
4. OK em todas as janelas
5. Fechar e reabrir PowerShell

Verificar:

```powershell
maestro --version
```

### 2. Java 17

Baixar [Eclipse Temurin 17](https://adoptium.net/temurin/releases/?version=17) (instalador Windows .msi).

Após instalar, definir `JAVA_HOME` em variáveis de ambiente:
- `JAVA_HOME` = `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
- Adicionar `%JAVA_HOME%\bin` ao `Path`

```powershell
java --version
```

### 3. Android Studio + AVD

1. Baixar [Android Studio](https://developer.android.com/studio)
2. Habilitar Hyper-V (Windows Pro/Enterprise) ou WHPX (Windows Home)
3. SDK Manager → API 34
4. AVD Manager → Pixel 8 API 34

### 4. iOS — não disponível em Windows

Mesmas alternativas do Linux: Mac remoto, cloud farm, ou pular iOS.

### 5. Smoke test

Igual aos outros OS.

---

## 🐳 Docker (alternativa avançada)

> **Quando usar:** ambiente padronizado em sala de aula, CI local, parse-only / dry-run de flows.
>
> **Limitações:**
> - Devices físicos via USB **não funcionam** facilmente em Docker Desktop (Mac/Windows). Em Linux com USB passthrough, funciona com configuração avançada.
> - Emulator Android dentro do container exige KVM (Linux only) ou imagem com emulator pré-configurado (lenta).
> - iOS Simulator **não funciona** em Docker (host-only, Mac).

### Setup

```bash
# Clone repo
git clone https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/docker

# Build da imagem
docker-compose build

# Rodar parse-only (valida sintaxe dos flows sem executar)
docker-compose run --rm maestro check /flows/

# Rodar contra emulator do host (Linux com network_mode: host)
# 1. Iniciar emulator no host primeiro
emulator -avd Pixel_8_API_34 &
adb devices  # confirmar emulator-5554 listado
# 2. Rodar flows via container
docker-compose run --rm maestro test /flows/
```

### Imagem

Ver [`docker/Dockerfile`](../docker/Dockerfile) — Eclipse Temurin 17 + Maestro CLI.

### Quando preferir nativo vs Docker

| Cenário | Recomendação |
|---------|--------------|
| Aluno desenvolvendo flows e iterando rápido | Nativo |
| Aluno sem permissão de admin no PC | Docker (parse-only) |
| Workshop em sala com 30 PCs | Docker (ambiente padronizado) |
| Execução real em emulator | Nativo |
| CI / pipeline | Docker (com emulator service ou parse-only) |

---

## ☁️ Maestro Studio (gravação visual)

Recurso de **record & replay** — útil pra começar sem escrever YAML.

```bash
# Com emulator/device conectado
maestro studio
```

Abre interface gráfica que mostra hierarquia do app + permite tocar visualmente e gera YAML automaticamente.

> **Dica:** use Studio pra gravar primeiro flow, depois refine YAML manualmente.

---

## ☁️ Cloud farms (Aula 4 cobre detalhe)

Pra alunos sem hardware adequado:

| Plataforma | Free tier |
|-----------|-----------|
| **Firebase Test Lab** | 100min/mês virtual + 5h/mês físico |
| **BrowserStack App Live** | 30min trial |
| **LambdaTest** | 30min trial |
| **AWS Device Farm** | 1000 min device-min free |

Comando exemplo (Firebase):

```bash
gcloud firebase test android run \
  --app CineFav.apk \
  --type instrumentation \
  --device model=shiba,version=34
```

---

## 🔧 Troubleshooting

### `maestro: command not found`

PATH não configurado. Verificar:

```bash
echo $PATH | grep maestro
# Se vazio:
export PATH="$PATH:$HOME/.maestro/bin"
```

### `Error: ANDROID_HOME not set`

```bash
# Mac
export ANDROID_HOME=$HOME/Library/Android/sdk

# Linux
export ANDROID_HOME=$HOME/Android/Sdk

# Windows (PowerShell)
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

### Emulator boota lento (> 5min)

Verificar aceleração de hardware:

- **Mac (Intel)**: Intel HAXM
- **Mac (Apple Silicon)**: ARM image (Pixel 8 → ARM)
- **Linux**: KVM habilitado (`kvm-ok`)
- **Windows**: Hyper-V ou WHPX

### `adb: device offline`

```bash
adb kill-server
adb start-server
adb devices
```

### Flow falha com `assertVisible: "X"` quando texto está visível

Pode ser:
- Texto em outra view hierarchy (use `id:` se testID disponível)
- Animação ainda em curso (`waitForAnimationToEnd`)
- Tradução do app (texto em PT/EN diferente)

---

## 📚 Recursos

- [Docs oficiais Maestro](https://maestro.mobile.dev)
- [Maestro YAML reference](https://maestro.mobile.dev/api-reference/commands)
- Mobile.dev Blog — *Why YAML for E2E Tests*
- App-alvo do Maestro E2E (Atividade 3): **CineFav** (`com.puciec.cinefav`) — APK nos Releases
- App de testes manuais do prof: [TestesQAMobile](https://apps.apple.com/br/app/testes-qa-mobile/id6755933674) (App Store / Play Store)

---

## ❓ Suporte

Dúvidas: **Teams da turma** ou jackson.96@gmail.com.
