# Phase 0 Smoke Test Plan

## Objective

Establish a minimal pass/fail gate that confirms monorepo infrastructure wiring and base service reachability.

## Preconditions

- `.env` exists (seed from `.env.example`).
- Docker engine is running.
- Service Dockerfiles exist at:
  - `apps/web/Dockerfile`
  - `services/api/Dockerfile`
  - `services/ml/Dockerfile`

## Test Cases

1. Infra bootstrap
   - Command: `docker compose up -d mysql redis minio`
   - Expected: all three containers report healthy status.

2. API/ML/Web startup
   - Command: `docker compose up -d api ml web`
   - Expected: containers stay running without crash loop for 60+ seconds.

3. ML sidecar health endpoint
   - Command: `./scripts/check-sidecar-health.sh`
   - Expected: script exits `0` and reports healthy response.

4. Public endpoint reachability
   - Commands:
     - `curl -f http://localhost:${API_PORT:-4000}/health`
     - `curl -f http://localhost:${ML_PORT:-8000}/health`
     - `curl -f http://localhost:${WEB_PORT:-3003}`
   - Expected: each command exits `0`.

## Exit Criteria

- All test cases pass locally.
- CI workflow runs lint, typecheck, and test scripts successfully.
