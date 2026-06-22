#!/bin/bash
# setup-maestro-check.sh — Maestro setup verification for turma

echo "🔧 Maestro Setup Verification"
set -e

# 1. adb
if ! command -v adb &> /dev/null; then
  echo "❌ adb not found. Install Android Platform Tools:"
  echo "   macOS: brew install android-platform-tools"
  echo "   Windows: choco install android-platform-tools"
  echo "   Linux: sudo apt install android-tools-adb"
  exit 1
fi
echo "✅ adb installed"

# 2. Device/emulator online
if ! adb devices | grep -qE "emulator-|device"; then
  echo "❌ No device/emulator online"
  echo "💡 Start emulator or connect device via USB"
  echo ""
  echo "Available emulators:"
  emulator -list-avds 2>/dev/null || echo "  (none found)"
  echo ""
  echo "To start: emulator -avd <name>"
  exit 1
fi
DEVICE=$(adb devices | grep -E "emulator-|device" | awk '{print $1}' | head -1)
echo "✅ Device online: $DEVICE"

# 3. App installed
if ! adb shell pm list packages | grep -q "com.puciec.cinefav"; then
  echo "⚠️ App not installed. Installing..."
  if [ -f "CineFav.apk" ]; then
    adb install CineFav.apk
    echo "✅ App installed"
  else
    echo "❌ CineFav.apk not found in current directory"
    echo "📥 Download from GitHub Releases:"
    echo "   https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile/releases"
    echo ""
    echo "Then run: adb install CineFav.apk"
    exit 1
  fi
fi
echo "✅ App (com.puciec.cinefav) installed"

# 4. Maestro CLI
if ! command -v maestro &> /dev/null; then
  echo "⚠️ Maestro CLI not found. Installing..."
  curl -Ls "https://get.maestro.mobile.dev" | bash
  export PATH="$PATH:$HOME/.maestro/bin"
  echo "✅ Maestro installed"
else
  echo "✅ Maestro installed: $(maestro --version 2>&1 | head -1)"
fi

# 5. Connectivity test
echo "🧪 Testing device connectivity..."
if ! maestro hierarchy > /dev/null 2>&1; then
  echo "❌ Maestro can't reach device"
  echo "💡 Try:"
  echo "   adb kill-server && adb start-server"
  echo "   Restart emulator"
  exit 1
fi
echo "✅ Device reachable"

echo ""
echo "✨ All systems ready!"
echo ""
echo "Next: cd pratica && yarn maestro:test"
