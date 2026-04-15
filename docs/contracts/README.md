# MarryTone P0 API Contract Draft

This directory contains the contract-first API draft for MarryTone Phase 2 P0.
The contract is intentionally defined before database schema, NestJS modules,
and ML orchestration are implemented.

## Scope

- Modules covered: `profile`, `recommendation`, `couple`, `wardrobe`
- Contract file: [openapi-p0.yaml](/tmp/marrytone-phase2-contract-wt/openapi/docs/contracts/openapi-p0.yaml)
- API style: REST-first with a shared response envelope
- Policy assumptions locked for P0:
  - Preference conflict default: `policy-a`
  - Low-confidence automatic diagnosis handling: `policy-c`
  - Recommendation failure fallback: approved default example behavior
  - Recommendation output: per category up to 3 options, with 1 main option

## Screen Mapping

This draft maps to stitch screens as follows:

- `_2` diagnosis gate
  - `POST /v1/profile/diagnosis-gate`
- `_3` home/start recommendation trigger
  - `POST /v1/recommendations/generate`
- `_5` saved style cards
  - `POST /v1/wardrobe/style-cards`
  - `GET /v1/wardrobe/style-cards`
- `_8` comparison board
  - `POST /v1/wardrobe/comparison-sets`
- `_9` recommendation result list
  - `POST /v1/recommendations/generate`
  - `POST /v1/wardrobe/style-cards`
- `_10` consensus confirmation
  - `POST /v1/couple/consensus/confirm`
- `_11` checklist progress
  - `GET /v1/profile/checklist`
- `_13` my/profile summary
  - `POST /v1/profile/diagnosis-intake`
  - `GET /v1/profile/checklist`

## Assumptions

- Image upload binary transport is out of scope for this draft.
  - The intake contract references encrypted asset IDs produced by a separate upload flow.
- Diagnosis automation returns normalized personal color and skeleton values only.
  - Model execution details and ML-side confidence calculations are not defined here.
- The response envelope is fixed as `success + data/error + meta`.
- Authentication, authorization, and admin APIs are out of scope for P0.

## Implementation Notes

- This file is intended to drive DTO, validation schema, and OpenAPI generation work.
- Database identifiers are modeled as UUIDs for draft stability.
- Final field names can still be refined if DTO and persistence constraints require it, but the endpoint surface should remain stable where possible.
