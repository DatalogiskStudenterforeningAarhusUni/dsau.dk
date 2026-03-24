#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TMP_FILE="$ROOT_DIR/outformatted.json"

trap 'rm -f "$TMP_FILE"' EXIT

curl -sf "https://www.googleapis.com/calendar/v3/calendars/26efd4a6136ae6fcfd17ab7d7e5033f346f8b28c6040b83431d5b5197e8a57b6@group.calendar.google.com/events?key=AIzaSyC8V7kVfg4P7gGuAMSEOopOP2c2O6Xb1Gg&timeZone=Europe/Copenhagen" -o "$TMP_FILE"

node "$SCRIPT_DIR/format-data.js" "$TMP_FILE" "$ROOT_DIR/src/data/calendar_events.json"
