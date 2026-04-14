# MarryTone Web (Phase 0)

Minimal frontend baseline for MarryTone using Next.js App Router.

## Stack

- Next.js 14.2.4
- React 18
- TypeScript 5

## Scripts

- `npm run dev` - start local dev server (http://localhost:3003)
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run Next.js ESLint checks
- `npm run typecheck` - TypeScript no-emit check
- `npm run test` - placeholder script (test runner added in later phase)

## Quick Start

```bash
cd apps/web
npm install
npm run dev
```

## Routes

- `/` - routed page index
- `/home` - app home
- `/diagnosis/gate` - diagnosis gate
- `/diagnosis/intake` - diagnosis intake
- `/diagnosis/upload` - photo diagnosis
- `/results/personal-color` - personal color result
- `/results/skeleton` - skeleton result
- `/recommendations` - recommendation list
- `/saved` - saved cards
- `/comparison` - comparison board
- `/consensus` - consensus board (A policy)
- `/checklist` - wedding checklist
- `/coach` - style coach summary
- `/my` - my page
- `/health` - simple health status page
- `/ui/stitch` - stitch_marrytone reference gallery
- `/ui/stitch/[screen]` - iframe preview for `_1` ~ `_13`
