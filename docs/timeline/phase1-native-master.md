# Phase 1-2 Native JSX Master Timeline

- Scope: iframe 기반 stitch 매핑을 실제 Next.js JSX 라우트 구조로 2차 이식
- Method: ECC multi-agent + per-task isolated git worktree
- Coordinator worktree: `/tmp/marrytone-phase1-native-wt/coord` (`phase1/native-coord`)
- Agent worktrees:
  - `ui-a`: `/tmp/marrytone-phase1-native-wt/ui-a` (`phase1/native-a`)
  - `ui-b`: `/tmp/marrytone-phase1-native-wt/ui-b` (`phase1/native-b`)
  - `ui-c`: `/tmp/marrytone-phase1-native-wt/ui-c` (`phase1/native-c`)

## Timeline

| Time (KST) | Owner | Worktree | Task | Status | Notes |
|---|---|---|---|---|---|
| 2026-04-14 21:17 | coordinator | phase1/native-coord | Native JSX 2차 이식 워크트리/브랜치 분리 | done | `native-coord`, `native-a`, `native-b`, `native-c` 생성 |
| 2026-04-14 21:21 | coordinator | phase1/native-coord | 공통 native shell + `mt2-*` 스타일 기반 추가 | done | `_components/native-shell.tsx`, `globals.css` |

## Ownership Matrix

- Agent `ui-a`
  - `apps/web/src/app/home/page.tsx`
  - `apps/web/src/app/diagnosis/gate/page.tsx`
  - `apps/web/src/app/diagnosis/intake/page.tsx`
  - `apps/web/src/app/diagnosis/upload/page.tsx`
- Agent `ui-b`
  - `apps/web/src/app/saved/page.tsx`
  - `apps/web/src/app/results/personal-color/page.tsx`
  - `apps/web/src/app/results/skeleton/page.tsx`
  - `apps/web/src/app/recommendations/page.tsx`
  - `apps/web/src/app/comparison/page.tsx`
- Agent `ui-c`
  - `apps/web/src/app/consensus/page.tsx`
  - `apps/web/src/app/checklist/page.tsx`
  - `apps/web/src/app/coach/page.tsx`
  - `apps/web/src/app/my/page.tsx`
