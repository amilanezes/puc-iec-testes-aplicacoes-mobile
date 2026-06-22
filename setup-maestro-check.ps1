# setup-maestro-check.ps1 — Verificacao de setup Maestro (Windows)
# Uso: powershell -ExecutionPolicy Bypass -File setup-maestro-check.ps1

$ErrorActionPreference = "Stop"
Write-Host "Maestro Setup Verification (Windows)" -ForegroundColor Cyan

# 1. adb
if (-not (Get-Command adb -ErrorAction SilentlyContinue)) {
  Write-Host "[X] adb nao encontrado. Instale Android Platform Tools:" -ForegroundColor Red
  Write-Host "    choco install android-platform-tools"
  Write-Host "    (ou) scoop install adb"
  exit 1
}
Write-Host "[OK] adb instalado" -ForegroundColor Green

# 2. Device/emulator online
$devices = adb devices | Select-String -Pattern "emulator-|device$"
if (-not $devices) {
  Write-Host "[X] Nenhum device/emulator online" -ForegroundColor Red
  Write-Host "    Inicie um emulator (Android Studio > Device Manager) ou conecte device via USB"
  Write-Host ""
  Write-Host "Emulators disponiveis:"
  emulator -list-avds 2>$null
  exit 1
}
Write-Host "[OK] Device online" -ForegroundColor Green

# 3. App instalado
$app = adb shell pm list packages | Select-String "com.puciec.cinefav"
if (-not $app) {
  Write-Host "[!] App nao instalado. Tentando instalar..." -ForegroundColor Yellow
  if (Test-Path "CineFav.apk") {
    adb install CineFav.apk
    Write-Host "[OK] App instalado" -ForegroundColor Green
  } else {
    Write-Host "[X] CineFav.apk nao encontrado no diretorio atual" -ForegroundColor Red
    Write-Host "    Baixe do GitHub Releases:"
    Write-Host "    https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/releases"
    Write-Host "    Depois: adb install CineFav.apk"
    exit 1
  }
} else {
  Write-Host "[OK] App (com.puciec.cinefav) instalado" -ForegroundColor Green
}

# 4. Maestro CLI
if (-not (Get-Command maestro -ErrorAction SilentlyContinue)) {
  Write-Host "[!] Maestro CLI nao encontrado. Instale:" -ForegroundColor Yellow
  Write-Host "    iwr get.maestro.mobile.dev/windows | iex"
  Write-Host "    (reabra o terminal depois de instalar)"
  exit 1
}
Write-Host "[OK] Maestro instalado" -ForegroundColor Green

# 5. Connectivity test
Write-Host "Testando conectividade com o device..."
maestro hierarchy *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host "[X] Maestro nao alcanca o device" -ForegroundColor Red
  Write-Host "    Tente: adb kill-server; adb start-server"
  exit 1
}
Write-Host "[OK] Device alcancavel" -ForegroundColor Green

Write-Host ""
Write-Host "Tudo pronto! Proximo: cd exercicios\03-maestro-e2e\pratica; maestro test flows\" -ForegroundColor Cyan
