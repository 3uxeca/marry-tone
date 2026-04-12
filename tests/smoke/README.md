# Smoke Tests (Phase 0)

This directory holds lightweight smoke checks for local/dev and CI gates.

## Scope

- Verify infrastructure dependencies can boot (`mysql`, `redis`, `minio`).
- Verify service entrypoints are reachable (`api`, `ml`, `web`).
- Verify API-to-ML sidecar connectivity at a basic health level.

## Quick Start

1. Copy `.env.example` to `.env`.
2. Start infrastructure: `docker compose up -d mysql redis minio`.
3. Start services (or full stack): `docker compose up -d api ml web`.
4. Run sidecar check: `./scripts/check-sidecar-health.sh`.
5. Follow the checklist in `tests/smoke/SMOKE_TEST_PLAN.md`.
