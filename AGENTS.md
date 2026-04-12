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

## Multi-Agent Roles

| Agent | Primary Responsibility | File Ownership |
|---|---|---|
| `planner` | work breakdown, dependency map, risk register | `docs/`, planning sections in spec/blueprint |
| `ui-designer` | token system, screen specs, component visual consistency | `DESIGN.md`, design tokens, UI spec docs |
| `frontend-engineer` | App Router pages, FSD features/widgets/entities/shared | `apps/web/**` or frontend directories |
| `backend-engineer` | domain APIs, auth/admin/recommendation modules | `services/api/**` or backend directories |
| `database-engineer` | schema/index/migration/query performance | `services/api/prisma/**`, SQL/migrations |
| `ml-inference-engineer` | Python sidecar model serving and inference contracts | `services/ml/**` |
| `qa-engineer` | test strategy, integration/e2e, release gates | `tests/**`, QA plans |
| `github-pr-writer` | commit messages, PR summary, test plan, rollout notes | PR/commit docs and templates |

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
