#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available

set -e

TIMEOUT=15
STRICT=0
HOST=""
PORT=""

while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        --timeout)
        TIMEOUT="$2"
        shift
        shift
        ;;
        --strict)
        STRICT=1
        shift
        ;;
        --)
        shift
        break
        ;;
        *)
        if [[ -z "$HOST" ]]; then
            HOST="$1"
        elif [[ -z "$PORT" ]]; then
            PORT="$1"
        fi
        shift
        ;;
    esac
done

for i in $(seq $TIMEOUT); do
    if nc -z "$HOST" "$PORT"; then
        echo "✅ $HOST:$PORT is available"
        exit 0
    fi
    echo "⏳ Waiting for $HOST:$PORT... ($i/$TIMEOUT)"
    sleep 1
done

if [[ "$STRICT" -eq 1 ]]; then
    echo "❌ Timeout! $HOST:$PORT is not available after $TIMEOUT seconds."
    exit 1
else
    echo "⚠️ Proceeding even though $HOST:$PORT is not available."
    exit 0
fi
