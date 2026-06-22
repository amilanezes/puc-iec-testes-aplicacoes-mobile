#!/bin/bash
set -e

echo "=== Instalando Simple Calculator (SimpleMobileTools) ==="
CALC_URL=$(gh api repos/SimpleMobileTools/Simple-Calculator/releases/latest \
  --jq '[.assets[] | select(.name | endswith(".apk"))] | .[0].browser_download_url' 2>/dev/null || echo "")

if [[ "$CALC_URL" != https://* ]]; then
  echo "ERRO: nao foi possivel obter URL da calculadora" && exit 1
fi

echo "Baixando: $CALC_URL"
curl -sL "$CALC_URL" -o /tmp/calc.apk
adb install /tmp/calc.apk
echo "Calculadora instalada."

echo ""
echo "=== Rodando Maestro ==="
maestro test exercicios/03-hello-maestro/pratica/flows/ --format junit --output results.xml
