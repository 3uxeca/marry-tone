# API Contract Registry

This folder provides an implementation-free route registry for API modules.

## Purpose

- Keep route IDs, HTTP method, path, and DTO type names in one place.
- Let controllers/services consume typed route metadata without importing business logic.
- Align API handlers with `@marrytone/contracts` DTO names.

## How to consume

1. Import module registry from `src/contracts`.
2. Use route entries as the source of truth for `method` + `path`.
3. Use `RouteRequest<T>` / `RouteResponse<T>` to type handler input/output.

Example:

```ts
import { profileRouteRegistry, type RouteRequest, type RouteResponse } from "../contracts";

type IntakeRoute = typeof profileRouteRegistry.submitProfileIntake;
type IntakeReq = RouteRequest<IntakeRoute>;
type IntakeRes = RouteResponse<IntakeRoute>;
```

## Notes

- This layer is intentionally adapter-only; no validation, persistence, or domain logic.
- `requestTypeName` and `responseTypeName` are deterministic contract keys expected from `@marrytone/contracts`.
