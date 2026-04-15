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
