# MarryTone Phase 0 Timeline

## Purpose
Phase 0에서 완료된 작업을 멀티에이전트/분리 워킹트리 기준으로 추적한다.
이 문서는 Phase 0 이후에도 완료 단위로 계속 append한다.

## Timeline

| No | Completed At (KST) | Workstream | Worktree | Branch | Commit | Summary |
|---|---|---|---|---|---|---|
| 1 | 2026-04-13 | Kickoff | main + split worktrees | `main` + `phase0/*` | n/a | ECC 멀티에이전트 병렬 작업을 위해 `fe`, `be`, `ml`, `infra` 워킹트리 분리 생성 |
| 2 | 2026-04-13 00:37:27 +0900 | Frontend Scaffold | `/tmp/marry-tone-wt/fe` | `phase0/fe` | `7409872` | `apps/web` Next.js 14.2.4 App Router baseline, soft pink token, health 페이지, Dockerfile 추가 |
| 3 | 2026-04-13 00:46:58 +0900 | Backend + Contracts + DB | `/tmp/marry-tone-wt/be` | `phase0/be` | `dc4946a` | `services/api` NestJS+Fastify baseline, `/health`, `/internal/ml/health`, Prisma 초기 스키마/마이그레이션, `packages/contracts` 추가 |
| 4 | 2026-04-13 00:47:10 +0900 | ML Sidecar Scaffold | `/tmp/marry-tone-wt/ml` | `phase0/ml` | `2f0bd1c` | `services/ml` FastAPI baseline, 진단 3개 엔드포인트 + `GET /health`, Pydantic 모델, Dockerfile 추가 |
| 5 | 2026-04-13 00:47:20 +0900 | Infra + CI + Smoke Docs | `/tmp/marry-tone-wt/infra` | `phase0/infra` | `f066e73` | 루트 `package.json`, `pnpm-workspace.yaml`, `.env.example`, `docker-compose.yml`, CI 워크플로우, sidecar health 스크립트, smoke 문서 추가 |
| 6 | 2026-04-13 00:47:40 +0900 | Integration Merge | main | `main` | `bf5a938`, `508df54`, `48612f5`, `d67bfb5` | 분리 브랜치 4개를 `--no-ff`로 순차 병합, 충돌 없이 통합 완료 |
| 7 | 2026-04-13 | Sanity Validation | main | `main` | n/a | `bash -n scripts/check-sidecar-health.sh` 통과, `python3 -m compileall services/ml/app` 통과 |
| 8 | 2026-04-13 01:00:09 +0900 | Port Policy + Runbook Update | main | `main` | n/a | 프론트엔드 포트를 `3003`으로 고정하고(`.env.example`, `docker-compose.yml`, `apps/web/*`), 루트 `README.md`에 로컬 실행 가이드를 추가 |
| 9 | 2026-04-13 09:47:21 +0900 | Phase 1 UI Kickoff (Stitch Integration) | main | `main` | n/a | `stitch_marrytone`의 `_1~_13` HTML/CSS 자산을 `apps/web/public/stitch`로 통합하고, `/ui/stitch` 및 `/ui/stitch/[screen]` 프리뷰 라우트를 추가 |
| 10 | 2026-04-13 09:55:51 +0900 | Phase 1 Routed UI Pages | main | `main` | n/a | 프리뷰가 아닌 실제 앱 라우트(`/home`, `/diagnosis/*`, `/results/*`, `/saved`, `/comparison`, `/consensus`, `/checklist`, `/coach`, `/my`)를 추가하고 공통 모바일 셸 컴포넌트를 적용 |

## Delivered Scope Snapshot (Phase 0)

- Monorepo baseline:
  - `apps/web`
  - `services/api`
  - `services/ml`
  - `packages/contracts`
  - `tests/smoke`
- Runtime baseline:
  - Docker Compose (`mysql`, `redis`, `minio`, `api`, `ml`, `web`)
  - Env template (`.env.example`)
- Quality baseline:
  - CI workflow scaffold
  - Sidecar health check script

## Logging Rule

Phase 0 범위에서 완료된 신규 작업은 아래 포맷으로 마지막 줄에 추가한다.

`| No | Completed At (KST) | Workstream | Worktree | Branch | Commit | Summary |`
