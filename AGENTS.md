# MarryTone Agent Operating Guide

This document defines project-specific operating rules for multi-agent development in Codex.
It is aligned with `AGENTS_ECC.md` and `blueprint-wedding-style-coach.md`.

## Core Principles

1. Agent-first execution with explicit ownership.
2. Test-driven changes with 80%+ coverage target.
3. Security-first handling for PII and image uploads.
4. Immutable update style for state/data transformations.
5. Plan before implementation for multi-file changes.

## Product and Stack Baseline

- Product: MarryTone (wedding style coach)
- Frontend: `Next.js 14.2.4`, `React 18`, `TypeScript 5`, App Router + FSD
- Backend: `NestJS + Fastify` (TypeScript)
- Data: `MySQL 8 + Prisma`, `Redis + BullMQ`, S3-compatible object storage
- AI inference: Python `FastAPI` sidecar for personal color/body diagnosis
- API style: REST-first + OpenAPI

## UI Protection Rules (Stitch Freeze Policy)

> These rules exist because Stitch-generated HTML (_1 ~ _13) is the single source of truth for all UI.
> Agents that violate these rules must revert their changes before proceeding.

### Stitch Reference Obligation
- Before any UI task, the responsible agent MUST read the corresponding `stitch_marrytone/_N/code.html`.
- The screen's composition, tonal hierarchy, spacing rhythm, and header structure must be preserved exactly.
- If a task maps to an existing `_N` page, creating a new layout from scratch is **forbidden**.
- If no direct match exists, blend the two nearest `_N` references and document which pages were used.

### UI Immutability — File Ownership
- `apps/web/**` files may be modified by `ui-designer` and `frontend-engineer` only.
- `ui-designer` owns visual decisions: layout composition, spacing rhythm, color/typography tokens, and interaction look-and-feel.
- `frontend-engineer` owns functional implementation: routing, state, data fetching, API wiring, accessibility, and performance.
- `frontend-engineer` must not change visual composition/tokens without explicit `ui-designer` approval.
- All other agents (backend-engineer, ml-inference-engineer, qa-engineer, etc.) are **read-only** on `apps/web/**`.
- Exception for non-UI agents is limited to strictly scoped integration wiring requested by `frontend-engineer`, with zero layout/style changes.

### Forbidden Actions for Non-UI Agents
- Do NOT add, change, or remove any CSS class, inline style, Tailwind utility, or color token.
- Do NOT add new `<div>` wrappers, change flex/grid structure, or alter spacing.
- Do NOT change or add background colors. The page background is `--bg-page: #fbf9fa` — this is immutable.
- Do NOT introduce new HTML pages or JSX components without a corresponding Stitch `_N` mapping.
- Do NOT use hardcoded hex values outside of `DESIGN.md` token definitions.

### Mock UI Ban
- Creating demo/test UI screens is **forbidden**. If a screen is needed, port the existing Stitch HTML to Next.js — do not invent new layouts.
- Placeholder screens ("coming soon", "TODO: implement") may only be a single `<p>` inside the existing shell — no new structure.

### Implementation-First Sequence
All feature work must follow this order. UI wiring is always the last step:
```
1. API contract (OpenAPI / DTO) agreed between FE ↔ BE
2. DB schema / migration merged
3. Backend implementation + unit tests pass
4. ML sidecar contract confirmed (if applicable)
5. UI wiring into existing Stitch-ported component
```
Skipping steps or doing UI before step 4 is a scope violation.

## Multi-Agent Roles

| Agent | Primary Responsibility | File Ownership |
|---|---|---|
| `planner` | work breakdown, dependency map, risk register | `docs/`, planning sections in spec/blueprint |
| `ui-designer` | token system, screen specs, component visual consistency | `DESIGN.md`, design tokens, UI spec docs, visual layer in `apps/web/**` |
| `frontend-engineer` | App Router pages, FSD features/widgets/entities/shared | functional layer in `apps/web/**` (routing/state/API wiring), frontend directories |
| `backend-engineer` | domain APIs, auth/admin/recommendation modules | `services/api/**` or backend directories |
| `database-engineer` | schema/index/migration/query performance | `services/api/prisma/**`, SQL/migrations |
| `ml-inference-engineer` | Python sidecar model serving and inference contracts | `services/ml/**` |
| `qa-engineer` | test strategy, integration/e2e, release gates | `tests/**`, QA plans |
| `github-pr-writer` | commit messages, PR summary, test plan, rollout notes | PR/commit docs and templates |

## Screen → Module Mapping (Stitch _N Reference Index)

| Stitch Page | Screen Name | Priority | NestJS Module(s) | ML Sidecar? |
|---|---|---|---|---|
| `_1` | 온보딩 / 스플래시 | P0 | auth | No |
| `_2` | 진단 게이트 | P0 | profile | No |
| `_3` | 홈 / 대시보드 | P0 | profile, recommendation | No |
| `_4` | 사진 업로드 진단 | P0 | profile + ML sidecar | **Yes** |
| `_5` | 나의 보관함 | P1 | wardrobe | No |
| `_6` | 퍼스널컬러 진단 결과 | P0 | profile + ML sidecar | **Yes** |
| `_7` | 체형 진단 결과 | P0 | profile + ML sidecar | **Yes** |
| `_8` | 스타일 비교 보드 | P1 | wardrobe, recommendation | No |
| `_9` | 추천 결과 피드 | P0 | recommendation, wardrobe | No |
| `_10` | 커플 합의 보드 | P1 | couple | No |
| `_11` | 웨딩 준비 체크리스트 | P2 | profile | No |
| `_12` | 관리자 대시보드 | P2 | admin | No |
| `_13` | 마이페이지 | P2 | profile, couple | No |

## Coordination Rules

- One agent owns one write scope at a time.
- Do not overwrite another agent's files; adapt to existing changes.
- Blockers must be surfaced with impact and fallback.
- Cross-boundary changes require contract updates first:
  - FE/BE: OpenAPI or DTO contract
  - BE/ML: sidecar request/response schema and timeout policy
  - BE/DB: migration and rollback plan

## Definition of Done

1. Relevant unit/integration/e2e tests pass.
2. Security checks for image upload and PII paths are included.
3. Validation logic and failure fallback are implemented.
4. Docs/specs are updated when behavior changes.
5. PR contains risk notes and a concrete test plan.
6. For Phase 0 scope, completed work is appended to `docs/phase0-timeline.md`.

## Security and Privacy Rules (MarryTone)

- No raw user images retained after diagnosis completion.
- Image transfer and storage must be encrypted.
- Access to sensitive diagnosis artifacts is least-privilege only.
- Log policy/audit events, not raw sensitive payloads.
- Never hardcode credentials or keys.

## Commit and PR Rules

- Conventional commit: `<type>: <description>`
- Recommended types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- PR body must include:
  - Summary of user-visible changes
  - Technical decisions and tradeoffs
  - Test evidence
  - Known risks and rollback notes
