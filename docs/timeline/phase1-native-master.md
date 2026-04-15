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
| 2026-04-14 21:25 | coordinator | phase1/native-coord | ECC frontend agents `ui-a/ui-b/ui-c` 병렬 투입 | in_progress | 라우트별 iframe 제거 및 native JSX 이식 |
| 2026-04-14 21:30 | ui-a | phase1/native-a | home/diagnosis 라우트 네이티브 JSX 이식 | done | `1224f8c` |
| 2026-04-14 21:33 | ui-b | phase1/native-b | saved/results/recommendation/comparison 네이티브 JSX 이식 | done | `2a7a5dd` |
| 2026-04-14 21:32 | ui-c | phase1/native-c | consensus/checklist/coach/my 네이티브 JSX 이식 | done | `584f662` |
| 2026-04-14 21:35 | coordinator | phase1/native-coord | ui-a/ui-b/ui-c 병합 완료 | done | merge commit 3건 |
| 2026-04-14 21:41 | coordinator | phase1/native-coord | `<img>` -> `next/image` 전환(신규 이식 페이지) | done | lint 경고를 stitch preview 2건으로 축소 |
| 2026-04-14 21:42 | coordinator | main | `@marrytone/web` build 재검증 | done | build 성공, 경고 2건은 `/ui/stitch/*` 기존 미리보기 경로 |
| 2026-04-15 00:06 | coordinator | main | 서비스 라우트 `screen.png` 의존 제거, `VisualBlock` 기반 대체 | done | `/ui/stitch/*` 미리보기 경로 제외 |
