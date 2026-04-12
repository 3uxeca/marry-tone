#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${1:-${ML_HEALTH_URL:-http://localhost:8000/health}}"
TIMEOUT_SECONDS="${SIDECAR_HEALTH_TIMEOUT_SECONDS:-3}"
RETRIES="${SIDECAR_HEALTH_RETRIES:-10}"
SLEEP_SECONDS="${SIDECAR_HEALTH_SLEEP_SECONDS:-2}"

echo "Checking sidecar health at ${TARGET_URL}"

for ((attempt=1; attempt<=RETRIES; attempt++)); do
  if response="$(curl --silent --show-error --fail --max-time "${TIMEOUT_SECONDS}" "${TARGET_URL}" 2>/dev/null)"; then
    echo "Sidecar healthy on attempt ${attempt}: ${response}"
    exit 0
  fi

  echo "Attempt ${attempt}/${RETRIES} failed; retrying in ${SLEEP_SECONDS}s..."
  sleep "${SLEEP_SECONDS}"
done

echo "Sidecar health check failed after ${RETRIES} attempts: ${TARGET_URL}" >&2
exit 1
