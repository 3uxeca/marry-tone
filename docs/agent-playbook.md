# MarryTone Multi-Agent Playbook

## Roles and Entry Points

- Planner: `.codex/agents/planner.toml`
- UI Designer: `.codex/agents/ui-designer.toml`
- Frontend Engineer: `.codex/agents/frontend-engineer.toml`
- Backend Engineer: `.codex/agents/backend-engineer.toml`
- Database Engineer: `.codex/agents/database-engineer.toml`
- ML Inference Engineer: `.codex/agents/ml-inference-engineer.toml`
- QA Engineer: `.codex/agents/qa-engineer.toml`
- GitHub PR Writer: `.codex/agents/github-pr-writer.toml`

## Recommended Execution Order

1. Planner: split scope and lock ownership.
2. UI Designer + Backend/DB/ML parallel design contracts.
3. Frontend and Backend/ML implementation in parallel by contract.
4. QA Engineer: integration/e2e and regression checks.
5. GitHub PR Writer: final commit/PR package.

## Handoff Contract Checklist

- FE <- BE: OpenAPI/DTO synced
- BE <- ML: sidecar schema + timeout + fallback codes synced
- BE <- DB: migration and rollback confirmed
- QA <- all: test data and acceptance criteria finalized

## Release Gate

- Security checks passed for image encryption and delete policy.
- Recommendation fallback paths verified.
- Checklist completion path verified.
- PR includes risk and rollback section.
