#!/bin/bash
# maestro-local.sh — Start emulator + run Maestro flows

set -e

AVD="${1:-Medium_Phone_API_35}"
COMMAND="${2:-test}"
FLOWS="${3:-flows/}"

echo "🚀 Maestro Local Runner"
echo "   AVD: $AVD"
echo "   Command: $COMMAND"
echo "   Target: $FLOWS"
echo ""

# Check emulator running
if ! adb devices | grep -q "$AVD\|emulator-"; then
  echo "⚠️ Emulator '$AVD' not running. Starting..."
  emulator -avd "$AVD" -no-snapshot-load -no-audio 2>/dev/null &
  echo "⏳ Waiting for device to boot (~30s)..."
  adb wait-for-device
  sleep 5
fi

echo "✅ Device ready"
echo "▶️ Running: maestro $COMMAND $FLOWS"
echo ""

maestro "$COMMAND" "$FLOWS"
