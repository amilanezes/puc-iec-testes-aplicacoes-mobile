# maestro-local.ps1 — Inicia emulator + roda Maestro (Windows)
# Uso: powershell -ExecutionPolicy Bypass -File maestro-local.ps1 [AVD] [comando] [flows]

param(
  [string]$Avd = "Medium_Phone_API_35",
  [string]$Command = "test",
  [string]$Flows = "flows/"
)

Write-Host "Maestro Local Runner" -ForegroundColor Cyan
Write-Host "  AVD: $Avd"
Write-Host "  Comando: $Command"
Write-Host "  Alvo: $Flows"
Write-Host ""

# Emulator rodando?
$online = adb devices | Select-String -Pattern "emulator-|device$"
if (-not $online) {
  Write-Host "[!] Emulator nao rodando. Iniciando '$Avd'..." -ForegroundColor Yellow
  Start-Process emulator -ArgumentList "-avd","$Avd","-no-snapshot-load","-no-audio" -WindowStyle Hidden
  Write-Host "Aguardando device bootar (~30s)..."
  adb wait-for-device
  Start-Sleep -Seconds 5
}

Write-Host "[OK] Device pronto" -ForegroundColor Green
Write-Host "Rodando: maestro $Command $Flows"
Write-Host ""

maestro $Command $Flows
