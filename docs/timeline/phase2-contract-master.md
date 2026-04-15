# Phase 2 Contract Master Timeline

- Scope: P0 API contract definition (`profile`, `recommendation`, `couple`, `wardrobe`) + OpenAPI draft
- Method: ECC multi-agent + per-task isolated git worktree
- Coordinator worktree: `/tmp/marrytone-phase2-contract-wt/coord` (`phase2/contract-coord`)
- Agent worktrees:
  - `contracts`: `/tmp/marrytone-phase2-contract-wt/contracts` (`phase2/contract-contracts`)
  - `openapi`: `/tmp/marrytone-phase2-contract-wt/openapi` (`phase2/contract-openapi`)
  - `api`: `/tmp/marrytone-phase2-contract-wt/api` (`phase2/contract-api`)

## Timeline

| Time (KST) | Owner | Worktree | Task | Status | Notes |
|---|---|---|---|---|---|
| 2026-04-15 10:08 | coordinator | phase2/contract-coord | Phase 2 contract worktree 4-way 분리 | done | `contract-coord/contracts/openapi/api` 생성 |
| 2026-04-15 10:10 | coordinator | phase2/contract-coord | 타임라인/문서 디렉토리 초기화 | done | `docs/timeline`, `docs/contracts` |

## Ownership Matrix

- Agent `contracts`
  - `packages/contracts/src/**`
- Agent `openapi`
  - `docs/contracts/**`
- Agent `api`
  - `services/api/src/contracts/**` (contract adapter/types only, no business logic)
| 2026-04-15 10:13 | coordinator | phase2/contract-coord | ECC agents 투입(`contracts/openapi/api`) | in_progress | P0 계약 병렬 작성 시작 |
| 2026-04-15 10:16 | openapi | phase2/contract-openapi | P0 OpenAPI 초안 및 모듈-화면 매핑 문서 작성 | done | `ae9297c` |
| 2026-04-15 10:17 | api | phase2/contract-api | API contract registry 초안 작성 | done | `fc22a40` |
| 2026-04-15 10:18 | contracts | phase2/contract-contracts | P0 domain contracts 작성 | done | `20433d0` |
| 2026-04-15 10:20 | coordinator | phase2/contract-coord | 3개 브랜치 병합 후 API registry 타입/경로 정합화 | done | contracts/openapi와 일치하도록 수정 |
| 2026-04-15 10:24 | coordinator | phase2/contract-coord | `@marrytone/contracts`, `@marrytone/api` 빌드 검증 | done | 모두 성공 |
