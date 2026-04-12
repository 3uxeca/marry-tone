# MarryTone Codex Automation Blueprint
> Created: 2026-04-12
> Purpose: Codex implementation blueprint

## 0. Goals and Deliverables

### Primary Goal
퍼스널 컬러/골격/취향 데이터를 실제 웨딩 의사결정으로 연결하는 모바일 퍼스트 웹 서비스의 프로젝트 시작용 통합 블루프린트를 만든다.

### Success Definition
- MarryTone MVP 완료 조건이 명확하다: 예비신부/예비신랑 각자의 퍼스널컬러·골격 기반으로 드레스/턱시도/헤어/메이크업/촬영 컨셉/예식장 환경 최종 1안이 확정되고 체크리스트가 생성된다.
- 카테고리별 최대 3안 제안과 최종 1안 메인 추천 규칙, 취향 충돌 시 합의 보드 수동 의사결정 정책(A)이 문서에 명시된다.
- 문서가 Codex 구현 기준(LLM vs code 분리, 상태 모델, 산출물 규칙, validation 체크리스트)을 충족한다.
- MVP와 확장 기능(제휴/예약/수익화)이 명확히 분리되어 우선순위 혼선이 없다.

### Out of Scope
- 외부 제휴사 API 연동의 실제 구현(예약/결제/재고 동기화).
- 네이티브 iOS/Android 앱 개발.
- 실제 퍼스널 컬러/골격 진단 알고리즘의 의료·전문 자격 인증.

## 1. Working Context

### Background
예비부부는 스드메 준비 과정에서 정보 과부하와 선택 기준 부재를 겪는다. 단순 추천 리스트보다, 개인 특성과 예식 컨셉을 결합한 “선택 기준”과 “비교 가능한 기록 체계”가 필요하다.

### Objective
Codex 중심 워크플로우로, 실제 개발 착수에 필요한 서비스 기획 초안(기능 우선순위, 화면 구조, 데이터/운영 요구사항, 확장 로드맵)을 재현 가능하게 산출한다.

### Scope
- Included: 서비스 정의, 핵심 사용자 유형, 대표 플로우, MVP 기능, IA, 화면 우선순위, AI 추천/진단 흐름, 저장/비교/기록 설계, 운영 기능, 브랜딩 방향, 단계별 확장/수익모델.
- Excluded: 상세 UI 시안 픽셀 레벨 디자인, 코드 구현, 인프라 IaC, 실제 계약·정산 프로세스.

### Inputs
| Item | Format | Source | Notes |
|---|---|---|---|
| 서비스 아이디어 원문 | md | `prompt.md` | 사용자 제공 1차 요구사항 |
| 사전 진단 경험 응답 | form/json | user | 퍼스널 컬러/골격 진단 경험 유무, 있으면 결과값 입력 |
| 퍼스널 컬러 진단 사진 | image (jpg/png) | user upload | 머리카락과 몸을 가린 맨얼굴 사진 |
| 골격 진단 사진 | image (jpg/png) | user upload | 전신 골격이 드러나는 사진 |
| UI 레퍼런스 가이드 | md | `DESIGN_AIRBNB.md` | 레이아웃/타이포/컴포넌트 체계 기준 |
| 기술스택 레퍼런스 | md | `/Users/dasha/Desktop/code/he-test-app/spec-hamkke-todak-app.md` | FE/BE/DB/MQ 인프라 기준 차용 |
| 멀티에이전트 운영 원칙 | md | `AGENTS_ECC.md` | 역할 분리와 품질 게이트 원칙 |
| 도메인 가정값 | md/table | system | 인터뷰 미진행 항목(예: KPI, 예산, API) 기본값 적용 |
| Codex 운영 규칙 | md | `AGENTS.md` | 보안/테스트/폴더 구조 원칙 |

### Outputs
| Item | Format | Destination | Notes |
|---|---|---|---|
| 통합 블루프린트 | md | `./blueprint-wedding-style-coach.md` | 구현 착수 기준 문서 |
| 프로젝트 에이전트 운영 규칙 | md | `./AGENTS.md` | 멀티에이전트 개발 실행 기준 |
| 프로젝트 디자인 시스템 | md | `./DESIGN.md` | Airbnb 기반 UI 토큰/컴포넌트 기준 |
| 커스텀 에이전트 안내서 | toml | `./.codex/agents/*.toml` | 역할별 개발 지시서 |
| 단계별 중간 산출물 | md/json | `output/stepNN_<name>.<ext>` | 추적/검증/재생성용 |

### Constraints
- 모바일 퍼스트 반응형 UX를 최우선으로 하되 데스크톱 사용성도 보장한다.
- 추천은 설명 가능해야 하며(왜 이 추천인지), 사용자가 수동 수정 가능해야 한다.
- 개인정보(얼굴/체형/취향 데이터)는 최소 수집·명시 동의·삭제 가능 정책을 따른다.
- AI 추천 이전에 사전 질문(퍼스널 컬러/골격 진단 경험 유무)을 필수로 수행한다.
- 사전 질문에서 진단 경험이 없으면 사진 업로드 진단(퍼스널 컬러용 맨얼굴, 골격용 전신) 경로로 분기한다.
- 초기 MVP는 외부 유료 API 의존을 최소화하고 규칙 기반 + LLM 보조 추천으로 시작한다.
- 모바일 4G 기준 추천 결과 첫 로딩은 10초 이내, 재추천은 10초 이내를 목표로 한다.
- AI 추천 실패 시 규칙 기반 상위 3안 fallback, `추천 근거 생성 중` 상태 표시, 재시도 1회 후 수동 선택 유도로 전환한다.
- 자동 진단 신뢰도가 낮으면 재촬영 가이드 후 재업로드를 먼저 유도하고, 재시도 후에도 낮으면 설문 기반 수동 진단으로 전환한다(C 정책).
- 업로드 이미지는 전송/저장 구간 암호화를 적용하고, 원본 이미지는 진단 완료 즉시 삭제한다(A 정책).
- 백엔드 기술스택은 `NestJS + Fastify + MySQL 8 + Prisma + Redis(BullMQ) + S3 호환 스토리지`를 유지한다.
- 퍼스널 컬러/골격 진단은 Python 오픈소스 모델을 `FastAPI` 사이드카로 분리하고 Node API에서 내부 호출한다.
- UI는 `DESIGN_AIRBNB.md`를 기본으로 하되 브랜드 포인트 컬러를 `#ff385c` 계열 대신 `#ffb1ee` 소프트 핑크 계열로 재정의한다.
- 오픈소스 모델은 라이선스 검증이 완료된 경우에만 포크/배포하며, 라이선스 미명시 저장소는 유지보수자 승인 전까지 프로덕션 사용을 금지한다.
- 퍼스널컬러 MVP는 `prompt-personal-color.md` 기준으로 자체 파이프라인(얼굴/피부/홍채 추출 + 대표색 + PCCS/KS nearest mapping)으로 구현하며, 시즌명 진단은 2차 확장으로 분리한다.
- KPI 세부 수치와 인프라 예산은 후속 운영 설계에서 확정한다.

### Terms
| Term | Definition |
|---|---|
| 퍼스널 컬러 | 피부/눈동자/헤어 톤 기반 컬러 적합도 분류 |
| 골격 진단 | 체형 균형/실루엣 특성 기반 핏 추천 기준 |
| 스드메 | 스튜디오, 드레스, 메이크업 준비 영역 |
| 스타일 카드 | 추천 결과를 비교/저장 가능한 단위 콘텐츠 |
| 무드 보드 | 예식/촬영 감성 레퍼런스 모음 |
| 합의 보드 | 예비신부/예비신랑의 후보 충돌 시 수동으로 최종안을 정하는 협업 화면 |
| 사전 진단 경험 질문 | AI 추천 이전에 기존 진단 경험/결과 보유 여부를 확인하는 게이트 |
| 저신뢰 진단 | 자동 진단 confidence가 임계치 미만인 상태 |

### Service One-Liner
MarryTone은 퍼스널 컬러·골격·취향을 결합해 예비부부의 스드메 선택을 “추천 + 비교 + 기록”으로 끝까지 돕는 웨딩 스타일 코치다.

### User Problem to Solve
- 선택지 과다로 의사결정 피로가 누적됨
- 내게 맞는 기준 없이 SNS/커뮤니티 정보에 흔들림
- 예비신랑/예비신부의 취향 조율과 합의 이력이 남지 않음

### Core User Types
| User Type | Situation | Primary Need | Key UX Requirement |
|---|---|---|---|
| 예비신부(주도형) | 드레스/메이크업 중심 탐색 | 체형·톤 기반 빠른 후보 압축 | 모바일 1손 조작, 즉시 저장 |
| 예비신랑(협업형) | 턱시도/촬영 컨셉 의사결정 참여 | 파트너와 비교·합의 | 커플 공유 보드, 코멘트 |
| 예비부부(시간부족형) | 직장 병행 준비 | 짧은 세션 내 결정 | 5분 요약 추천, 체크리스트 |

### Representative User Flows
1. 사전 질문에서 기존 진단 경험 `있음` 선택 → 퍼스널 컬러/골격 결과 직접 입력 또는 결과지 업로드 → AI가 카테고리별 최대 3안 제안 및 메인 1안 추천.
2. 사전 질문에서 기존 진단 경험 `없음` 선택 → 퍼스널 컬러용 맨얼굴 사진 + 골격용 전신 사진 업로드 → 자동 진단 → 저신뢰 시 재촬영/재업로드, 이후에도 저신뢰면 설문 기반 수동 진단 전환.
3. 저장함/비교보드에서 드레스/턱시도/헤어/메이크업/촬영/예식장 환경 후보를 비교 → 취향 충돌 시 합의 보드에서 수동으로 최종안 확정 → 체크리스트 100% 완료 시 MVP 완료 처리.

### MVP Scope
| Category | MVP (Must) | Post-MVP (Expand) |
|---|---|---|
| 진단/추천 | 사전 경험 질문 게이트, 경험자 입력 간소화, 비경험자 사진 기반 자동 진단 + 저신뢰 C 정책, 규칙 기반 + LLM 설명형 추천, 카테고리별 최대 3안 + 메인 1안 | 이미지 자동 판독 정밀화, 계절/장소 변수 자동 반영, 진단 품질 개인화 |
| 기록/비교 | 저장, 즐겨찾기, 2~4안 비교, 코멘트/결정 상태 | 예산 비교, 일정 동기화, 업체 응대 로그 |
| 운영 | 추천 룰 편집, 카탈로그 관리, 신고/오류 처리, 사진 암호화/삭제 감사 로그 | 제휴 대시보드, 예약 전환 퍼널 분석 |
| 수익화 | 제휴 링크 클릭 트래킹 | 예약/상담 리드 과금, 프리미엄 컨설팅 구독 |

### MVP Completion Criteria
- 예비신부/예비신랑 각각의 퍼스널컬러·골격 진단 결과가 프로필에 반영된다.
- 드레스, 턱시도, 헤어, 메이크업, 촬영 컨셉, 예식장 환경 카테고리별 최종 1안이 확정된다.
- 각 카테고리는 최대 3안까지 제안되며, 그중 1안이 메인 추천으로 표시된다.
- 준비 체크리스트가 자동 생성되고 진행률 100%일 때 완료 상태로 전환된다.

### Core Feature List
- 사용자 진단 게이트: AI 추천 전 사전 질문(기존 진단 경험 유무)으로 입력 경로 분기
- 사용자 진단 프로필: 경험자(결과 입력/업로드 간소화), 비경험자(퍼스널 컬러 맨얼굴 사진 + 골격 전신 사진 업로드) + 수동 보정
- AI 스타일 추천: 드레스/턱시도/헤어/메이크업/촬영 컨셉/예식장 환경에서 카테고리별 최대 3안 제안 + 메인 1안 + 이유 설명
- 스타일 저장함: 카드 저장, 태그, 메모, 상태값(검토중/보류/확정)
- 비교 보드: 최대 4개 후보 병렬 비교, 장단점 자동 요약
- 커플 협업: 공유 링크/권한 기반 코멘트 및 결정 히스토리, 충돌 시 합의 보드 수동 결정
- 준비 트래커: 카테고리별 TODO와 데드라인, 완료율 100% 기반 MVP 완료 처리
- 사진 보안 안내: 업로드 암호화, 원본 즉시 삭제, 유출 위험 최소화 정책 고지 및 동의

### Information Architecture (IA)
- 홈
- 온보딩/진단
- 사전 질문 게이트(기존 진단 경험 확인)
- 사진 업로드 진단(비경험자 전용)
- 추천 결과(메인 1안 + 대안 2안)
- 비교 보드
- 저장함
- 준비 트래커
- 커플 협업(코멘트/합의 기록)
- 마이페이지(프로필/개인정보/알림)
- 관리자: 카탈로그/룰/콘텐츠/신고/분석

### Major Screens and Mobile Priority
| Priority | Screen | Goal | Mobile-first Notes |
|---|---|---|---|
| P0 | 사전 질문 게이트 | 경험자/비경험자 경로 분기 | 예/아니오 1탭 선택, 즉시 분기 |
| P0 | 온보딩/진단 | 입력 피로 최소화 | 1문항 1화면, 진행률, 건너뛰기 제공 |
| P0 | 사진 업로드 진단 | 비경험자 자동 진단 진입 | 촬영 가이드 오버레이, 품질 실시간 힌트 |
| P0 | 추천 결과 피드 | 즉시 가치 체감 | 카드 스와이프 + 저장 CTA 고정 |
| P0 | 비교 보드 | 의사결정 지원 | 2열 토글/세로 스택 전환 |
| P1 | 저장함 | 후보 관리 | 필터 칩 + 상태 배지 |
| P1 | 커플 코멘트 | 합의 이력 | 타임라인형 코멘트 |
| P2 | 준비 트래커 | 실행 관리 | 일정 기반 리마인더 |
| P2 | 관리자 웹 | 운영 최적화 | 데스크톱 우선, 모바일 조회 지원 |

### AI Recommendation / Diagnosis Flow
1. 사전 질문 게이트: 퍼스널 컬러/골격 진단 경험 유무를 확인하고 입력 경로를 분기한다.
2. 경험자 경로: 기존 진단 결과 입력/업로드 후 유효성 검증을 수행한다.
3. 비경험자 경로: 퍼스널 컬러용 맨얼굴 사진과 골격용 전신 사진을 업로드받아 자동 진단을 수행한다.
4. 저신뢰 분기(C 정책): confidence 미달이면 재촬영 가이드 + 재업로드를 유도하고, 재시도 후에도 미달이면 설문 기반 수동 진단으로 전환한다.
5. 통합 프로필 생성: 진단 결과 + 분위기/무드/촬영 취향을 단일 프로필로 정규화한다.
6. 하드 필터링 및 후보 스코어링: 비적합 옵션 제외 후 규칙 점수(적합도) + 선호 점수(취향) 결합.
7. 카테고리별 추천 산출: 최대 3안 제안, 최종 메인 추천 1안 지정.
8. LLM 설명 생성: 추천 이유, 주의 포인트, 대안 선택 가이드 생성.
9. 실패 폴백: AI 추천 실패 시 규칙 기반 상위 3안 제공 + `추천 근거 생성 중` 상태 표시 + 1회 재시도 후 수동 선택 유도.
10. 사용자 피드백 반영: 싫어요/좋아요/보류 신호를 다음 추천에 가중치 반영.

### Photo Security and Privacy Policy
- 업로드 이미지는 전송 구간(TLS)과 저장 구간(암호화 스토리지)에서 암호화 처리한다.
- 원본 이미지는 진단 완료 즉시 삭제하며, 서비스에는 진단 결과와 필요한 최소 메타데이터만 유지한다.
- 업로드 화면과 개인정보 처리방침에서 암호화/즉시삭제 정책을 명시하고 사용자 동의를 기록한다.
- 운영자는 원본 이미지에 접근할 수 없고, 정책 준수 여부는 감사 로그로 추적한다.

### Save / Compare / Log Design
- 저장 단위: 스타일 카드(`category`, `fit_score`, `mood_tags`, `memo`, `status`)
- 비교 단위: 동일 카테고리 2~4개 후보 + 자동 비교 포인트(핏/무드/실용성/예산)
- 기록 단위: 의사결정 이벤트 로그(누가, 언제, 어떤 이유로 상태 변경)
- 진단 로그 단위: 사전 질문 응답, 진단 경로(경험자/비경험자), confidence, 재촬영 횟수, 수동 전환 여부
- 충돌 해결 단위: 예비신부/예비신랑 각자 추천을 유지한 채 합의 보드에서 수동 확정(A 정책)
- 되돌리기: 최근 20개 상태 변경 undo 가능
- 완료 단위: 체크리스트 진행률 100% 도달 시 `MVP_COMPLETE` 이벤트 기록

### Admin / Operations Requirements
- 추천 룰셋 버전 관리(배포 전 샌드박스 검증)
- 카탈로그 CRUD(드레스/턱시도/헤어/메이크업/촬영 컨셉)
- 부적절 콘텐츠 신고 처리, 사용자 문의 티켓 관리
- 추천 품질 모니터링(KPI: 저장률, 비교 진입률, 최종 확정률)
- 성능 모니터링(SLI): 첫 추천 로딩 10초 이내, 재추천 10초 이내 준수율 추적
- 진단 품질 모니터링: 자동 진단 confidence 분포, 재촬영 전환율, 수동 진단 전환율 추적
- 보안 운영: 업로드 암호화 상태 점검, 원본 즉시 삭제 작업 성공률, 동의/삭제 감사 로그 점검

### Branding and Tone & Manner
- 키워드: 따뜻함, 신뢰, 정돈, 코칭형 친절함
- UX 원칙: Airbnb 스타일의 정돈된 카드/여백/타이포를 유지하고, 감성 이미지는 풍부하게, 결정 UI는 단순하게
- 카피 톤: 단정한 존댓말 + 선택 근거를 짧고 명확하게 제시
- 포인트 컬러 정책: CTA/활성/하이라이트는 소프트 핑크 `#ffb1ee` 기반 토큰(`primary`, `hover`, `soft`)을 사용한다.

### Phase Roadmap
| Phase | Timeline (Assumption) | Deliverables |
|---|---|---|
| Phase 1 | 0-8주 | 진단/추천/저장/비교 MVP 출시 |
| Phase 2 | 9-16주 | 커플 협업, 준비 트래커, 운영 대시보드 |
| Phase 3 | 17-28주 | 제휴 추천, 리드 전송, 예약 연결 실험 |
| Phase 4 | 29주+ | 개인화 고도화, 프리미엄 구독, B2B 제휴 확장 |

### Phase 1 Development Plan (Updated 2026-04-13)

목표:
- 8주 내 MVP 핵심 흐름(사전 질문 -> 진단 -> 추천 3안/메인 1안 -> 저장/비교 -> 체크리스트 완료)을 운영 가능한 품질로 릴리스한다.

스프린트 계획(2주 단위):
| Sprint | Timeline | Primary Scope | Owner Agents | Exit Criteria |
|---|---|---|---|---|
| Sprint 1 | Week 1-2 | 모노레포 안정화, 공통 계약/인증 골격, 진단 게이트 UI/API 연결 | planner, frontend-engineer, backend-engineer, database-engineer | `web/api/ml` 로컬 실행, `/health` 및 내부 sidecar 헬스체크 통과, 사전 질문 경로 FE/BE 연동 완료 |
| Sprint 2 | Week 3-4 | 퍼스널컬러/골격 진단 파이프라인 1차, 저신뢰 C정책, 보안/삭제 로그 | ml-inference-engineer, backend-engineer, database-engineer | 진단 API 3종 응답 스키마 고정, 저신뢰 분기/재업로드 플로우 구현, 원본 즉시삭제 감사로그 기록 |
| Sprint 3 | Week 5-6 | 추천 엔진(카테고리별 최대 3안 + 메인 1안), 저장함/비교보드, 충돌 A정책 | backend-engineer, frontend-engineer, ui-designer | 추천 결과/설명/폴백 동작, 저장/비교/결정 이벤트 로그 적재, 합의 보드 수동 확정 경로 동작 |
| Sprint 4 | Week 7-8 | 체크리스트 완료 처리, 운영자 기본 도구, 성능/회귀 테스트, 릴리스 하드닝 | qa-engineer, backend-engineer, frontend-engineer, github-pr-writer | 체크리스트 100% 시 완료 이벤트, 첫 추천/재추천 10초 이내 기준 검증, 배포 전 회귀 테스트 통과 |

병렬 작업 소유권(충돌 방지 기준):
- `frontend-engineer`: `apps/web/**`
- `backend-engineer`: `services/api/src/**`
- `database-engineer`: `services/api/prisma/**`
- `ml-inference-engineer`: `services/ml/**`
- `qa-engineer`: `tests/**`
- `github-pr-writer`: 릴리스 노트/PR 본문/변경 이력 문서

품질 게이트(모든 Sprint 공통):
1. 계약 우선: FE/BE/ML 경계는 DTO/스키마 변경 PR을 선행한다.
2. 테스트 우선: 신규 기능은 단위/통합 테스트 최소 1개 이상 포함한다.
3. 보안 우선: 이미지 원본 미보관, 암호화 전송, 민감정보 로그 금지 정책을 유지한다.
4. 성능 기준: 추천 첫 로딩/재추천 10초 목표를 벗어나면 릴리스 후보에서 제외한다.
5. 롤백 기준: DB 마이그레이션과 추천 룰셋은 각각 롤백 절차를 PR에 명시한다.

Phase 1 종료(Release) 체크:
- 사전 질문 기반 분기(경험자/비경험자)와 저신뢰 C정책이 실제 사용자 플로우에서 동작한다.
- 드레스/턱시도/헤어/메이크업/촬영/예식장 환경의 3안 제안 + 메인 1안 추천이 노출된다.
- 저장함/비교보드/합의 보드(A정책)/체크리스트 완료 이벤트까지 E2E가 통과한다.
- 운영 화면에서 진단/추천 오류 모니터링과 기본 카탈로그 관리가 가능하다.

### Future Monetization Direction
- CPA/CPL 기반 제휴 리드 수익(드레스샵/메이크업샵/스튜디오)
- 프리미엄 플랜(고급 추천, 전문가 리뷰, 무제한 비교 보드)
- 웨딩 업체 대상 스폰서드 노출(광고 표기 준수)

### Assumptions
- 초기 타깃은 한국어 사용자이며 지역은 수도권 중심으로 시작한다.
- 로그인은 이메일/소셜 중 1개만 MVP에 포함한다.
- 개인정보 정책/약관은 법률 검토 전 임시 초안으로 운영한다.
- 카테고리별 데이터 카탈로그(드레스/턱시도/헤메/촬영/예식장 환경)는 MVP 기간에 운영자가 수동 큐레이션한다.
- 사진 업로드 가이드(조명/거리/배경/포즈)를 제공해 자동 진단 입력 품질을 일정 수준 이상으로 유지한다.
- 오픈소스 진단 모델은 품질/라이선스/재현성 검토 후 포크해서 내부 배포하며, 불충분 시 규칙 기반 진단을 기본값으로 유지한다.
- 스트레이트/웨이브/내추럴 분류는 단일 정답 모델이 아닌 휴리스틱 기반 확률 분류로 제공하며, 결과 화면에 신뢰도와 보정 가이드를 함께 노출한다.

### Technical Stack Decision (Confirmed)
- Frontend:
  - `Next.js 14.2.4`, `React 18`, `TypeScript 5`, `@tanstack/react-query 5.28.9`
  - App Router + FSD(Feature-Sliced Design) 계층 구조
- Backend Core:
  - `Node.js LTS + TypeScript + NestJS(Fastify)` REST-first API
  - 모듈형 모놀리스(`auth`, `recommendation`, `profile`, `wardrobe`, `comparison`, `admin`)
- Data / Infra:
  - `MySQL 8 + Prisma`, `Redis + BullMQ`, S3 호환 스토리지(개발 MinIO)
  - Docker Compose 시작, 트래픽 증가 시 k8s/ECS 확장
- AI Inference Sidecar:
  - Python `FastAPI` 서비스로 퍼스널컬러/골격 모델 제공
  - Node 백엔드가 내부 네트워크 API로 호출하고, 결과만 주 DB에 저장
  - 권장 내부 API 계약:
    - `POST /diagnosis/personal-color` (face image -> skin/iris representative colors + PCCS/KS code + confidence)
    - `POST /diagnosis/body-measurements` (front/side image + height -> measurements)
    - `POST /diagnosis/skeleton-type` (measurements/features -> straight/wave/natural + confidence + rationale)

### Open-Source Diagnosis API Compatibility Review
| Candidate | Source | License Verification Status | Fit for MarryTone | Compatibility with Confirmed Stack | Fork Decision |
|---|---|---|---|---|---|
| Colorinsight (personal color) | https://github.com/PSY222/Colorinsight | `LICENSE` 경로 404(루트 라이선스 미확인) | 참고 구현으로는 유의미하나 포크 적용 리스크 존재 | sidecar 구조와는 호환되나 법적 리스크로 직접 채택 부적합 | **대체 구현 채택** (`prompt-personal-color.md` 기반 인하우스 파이프라인) |
| Live-Measurements-Api | https://github.com/JavTahir/Live-Measurements-Api | GitHub 저장소에 `LICENSE` 파일 및 MIT 라이선스 표기 확인 | 골격 직접 분류보다는 신체 측정치 추출에 강점 | Python sidecar에서 측정값 추출 후 Node에서 골격 타입 매핑 로직으로 활용 가능 | **포크 진행** (MIT 조건 준수, 저작권 고지 유지) |
| Body-Shape-Classification | https://github.com/Mahsa33/Body-Shape-Classification | 라이선스 표기 확인 필요(추가 검증) | 연구용 분류 모델, 즉시 API 형태는 아님 | 모델 서빙 계층(FastAPI) 추가 구현이 필요하나 아키텍처적으로는 적용 가능 | 후보 유지 |

결론:
- `spec-hamkke-todak-app.md`의 백엔드/DB 스택은 MarryTone에 그대로 적용 가능하다.
- 단, 오픈소스 진단 모델은 대부분 Python 생태계이므로 **Node 메인 + Python sidecar** 분리가 가장 현실적인 통합 전략이다.
- Live-Measurements-Api는 MIT 기반으로 포크 적용 가능하다.
- Colorinsight는 라이선스 미확인으로 포크를 보류하고, `prompt-personal-color.md` 기반 자체 구현으로 대체 가능하다.

### Colorinsight Replacement Feasibility (prompt-personal-color.md)
판정: **구현 가능** (MVP 범위 충족).

대체 구현 권장 조합:
- API: `FastAPI` (MIT)
- 얼굴/랜드마크/홍채: `MediaPipe` (Apache-2.0)
- 이미지 처리/색공간 변환: `OpenCV >= 4.5` (Apache-2.0)
- 대표색 추출: `numpy + scikit-learn KMeans` (BSD-3-Clause)

처리 흐름:
1. 정면 단일 얼굴 이미지 입력
2. 얼굴 검출 + 랜드마크 추출
3. 피부/홍채 ROI 분리(머리카락·입술·배경 배제)
4. ROI 대표색 추출(중앙값 + dominant color)
5. RGB -> Lab 변환 후 내부 PCCS/KS 기준 팔레트와 거리 계산
6. nearest code 반환(JSON)

MVP 출력(시즌명 제외):
- `skin_color_rgb/lab`, `iris_color_rgb/lab`
- `pccs_code` 또는 `ks_code`
- `distance_score`, `confidence`, `quality_flags`

### Measurement-to-Skeleton Mapping Strategy
조사 결과, `스트레이트/웨이브/내추럴`은 패션 골격진단 도메인에서 주로 질감/프레임/중심(상중하) 특성을 함께 쓰며, 신체 치수만으로 단일 표준식이 합의된 상태는 아니다. 따라서 아래와 같이 **측정 기반 1차 분류 + 시각 특징 보정**의 2단계 전략을 적용한다.

1) 측정 기반 1차 분류(Body shape proxy):
- 입력(측정 API): `shoulder_width`, `chest_width`, `chest_circumference`, `waist`, `hip_width`, `hip_circumference`, `user_height_cm`
- 파생 지표:
  - `SHR = shoulder_width / hip_width`
  - `WHR = waist / hip_circumference`
  - `CWR = chest_circumference / waist`
  - `CHR = chest_circumference / hip_circumference`
- 참조 방식:
  - FFIT류 연구에서 사용하는 bust/waist/hip 차이 규칙으로 triangle/rectangle/inverted-triangle의 거친 shape cluster를 먼저 산출
  - 이 cluster를 골격 타입 후보군으로 매핑

2) 골격 보정(Visual/texture proxy):
- 이미지 기반 특징:
  - 쇄골/관절 돌출감(내추럴 가중치)
  - 상체 두께감 및 볼륨 중심(스트레이트 가중치)
  - 상체 얇음/하체 중심 및 낮은 중심(웨이브 가중치)
- 최종 출력:
  - `type`: `STRAIGHT` | `WAVE` | `NATURAL`
  - `confidence`: 0~1
  - `evidence`: 상위 기여 지표 목록
  - `fallback`: `MIXED` 또는 수동 진단 유도

3) 운영 안전장치:
- `confidence < threshold` 또는 상충 지표가 많으면 자동 확정 금지 후 수동 보정 질문으로 전환
- 결과 화면에 “치수 기반 추정 + 시각 보정 모델”임을 명시하고 과신 방지 문구를 제공

## 2. Workflow Definition

### End-to-End Flow
`[prompt.md] -> [Step 01 Requirement Parsing] -> [Step 02 Persona & Problem Framing] -> [Step 03 IA & Screen Priority] -> [Step 04 Recommendation Logic Design] -> [Step 05 Save/Compare/Log + Admin Spec] -> [Step 06 MVP/Roadmap/Monetization] -> [Step 07 Blueprint Assembly] -> [Step 08 Structural Validation] -> [Final Blueprint]`

### LLM vs Code Boundary
| LLM handles | Code handles |
|---|---|
| 요구사항 해석, 우선순위 결정, 사용자 플로우 구성, 추천 로직 설명, 문서 통합 | 파일 I/O, 템플릿 헤더 검사, 상태 토큰 검사, 표 형식 검증, 산출물 경로 규칙 확인 |

#### Step 01: Requirement Parsing and Gap Tagging
1) Step Goal:
`prompt.md`를 분석해 목표/범위/누락 가정을 정리한다.

2) Input / Output:
- Input: `prompt.md`
- Output: 요구사항 요약 + 가정 목록

3) LLM Decision Area:
문장 기반 요구를 기능 요구/비기능 요구/확장 요구로 분류한다.

4) Code Processing Area:
필수 섹션 키워드 존재 여부(IA, MVP, 플로우 등) 룰 체크.

5) Success Criteria:
핵심 요구 100%가 카테고리 태깅되고 누락 가정이 명시된다.

6) Validation Method:
Rule-based validation(요구 항목 체크리스트 대조).

7) Failure Handling:
핵심 항목 누락 시 1회 재파싱 후 `NEEDS_USER_INPUT`로 전환.

8) Skills / Scripts:
- Skill: `blueprint`
- Script: none

9) Intermediate Artifact Rule:
`output/step01_requirement_brief.md`

#### Step 02: Persona and Problem Framing
1) Step Goal:
핵심 사용자 유형과 해결 문제를 서비스 목표에 연결한다.

2) Input / Output:
- Input: `output/step01_requirement_brief.md`
- Output: 사용자 유형 표 + 대표 플로우 초안

3) LLM Decision Area:
사용자 세그먼트별 핵심 pain point와 의사결정 맥락을 도출한다.

4) Code Processing Area:
표 포맷 강제 및 필수 열(User Type/Situation/Need) 검증.

5) Success Criteria:
최소 3개 사용자 유형과 3개 대표 플로우가 정의된다.

6) Validation Method:
LLM self-check + rule-based row count check.

7) Failure Handling:
유형이 2개 이하일 경우 재작성, 계속 부족하면 기본 페르소나 템플릿 적용.

8) Skills / Scripts:
- Skill: `blueprint`
- Script: none

9) Intermediate Artifact Rule:
`output/step02_persona_flow.md`

#### Step 03: IA and Screen Priority Design
1) Step Goal:
모바일 퍼스트 기준 IA와 화면 우선순위를 설계한다.

2) Input / Output:
- Input: `output/step02_persona_flow.md`
- Output: IA 트리 + 화면 우선순위 표(P0/P1/P2)

3) LLM Decision Area:
탐색 깊이와 화면 진입 순서를 의사결정 피로 최소화 관점으로 배치한다.

4) Code Processing Area:
IA 노드 중복 제거, 우선순위 값 enum 검증.

5) Success Criteria:
P0 화면 3개 이상, IA 7개 이상 노드가 명확히 정의된다.

6) Validation Method:
Rule-based validation(개수/우선순위 규칙).

7) Failure Handling:
중복/충돌 화면 발견 시 자동 정규화 후 재검증.

8) Skills / Scripts:
- Skill: `frontend-patterns`
- Script: `scripts/normalize-ia.mjs` (planned)

9) Intermediate Artifact Rule:
`output/step03_ia_screens.json`

#### Step 04: Recommendation and Diagnosis Flow Design
1) Step Goal:
사전 질문 기반 분기, 자동 진단, 저신뢰 처리(C 정책), 보안 정책, Node-Python 연동 계약, 퍼스널컬러 자체 추출 파이프라인을 포함한 AI 추천/진단 파이프라인을 정의한다.

2) Input / Output:
- Input: `output/step03_ia_screens.json`
- Output: 분기형 진단/추천 파이프라인 명세 + 피드백 반영 규칙 + 보안 정책 + sidecar API 계약서 + 측정기반 골격 매핑 규칙 + 퍼스널컬러 추출/매핑 규칙

3) LLM Decision Area:
사전 질문 분기 기준, 추천 근거 문장 구조, 대안 제시 방식, 사용자 신뢰/보안 안내 문구를 설계한다.

4) Code Processing Area:
입력 taxonomy 매핑, 얼굴/피부/홍채 ROI 추출, 대표색 추출, Lab 변환 및 PCCS/KS nearest mapping, body measurement 파생지표 계산(SHR/WHR/CWR/CHR), confidence 계산, 점수 계산, 암호화/삭제 처리, sidecar API 호출/타임아웃/재시도, 로그 스키마 검증.

5) Success Criteria:
사전질문→경험자/비경험자 분기→(저신뢰 시 C정책)→sidecar 진단(퍼스널컬러 대표색+PCCS/KS 매핑, 측정 기반 골격 추정 포함)→필터→스코어→카테고리별 최대 3안/메인 1안→설명→피드백 루프가 끊김 없이 정의된다.

6) Validation Method:
Schema validation(JSON spec) + security checklist + human review(운영자 관점).

7) Failure Handling:
자동 진단 저신뢰 시 재촬영 가이드/재업로드를 먼저 수행하고, 재시도 후에도 저신뢰면 설문 기반 수동 진단으로 전환한다. sidecar 응답 실패/타임아웃 시 규칙 기반 진단으로 폴백한다. 퍼스널컬러 추출 실패 시 피부/홍채 품질 플래그와 함께 재촬영을 유도한다. 라이선스 미검증 모델은 배포 경로에서 제외한다. AI 추천 실패 시 규칙 기반 상위 3안 fallback, `추천 근거 생성 중` 상태 표시, 1회 재시도 후 수동 선택 유도로 전환한다.

8) Skills / Scripts:
- Skill: `backend-patterns`
- Script: `scripts/validate-recommendation-spec.mjs` (planned)

9) Intermediate Artifact Rule:
`output/step04_recommendation_spec.json`

#### Step 05: Save/Compare/Log and Admin Spec
1) Step Goal:
저장/비교/기록 기능과 운영자 기능을 데이터 구조 중심으로 정의한다.

2) Input / Output:
- Input: `output/step04_recommendation_spec.json`
- Output: 사용자 기능 스펙 + 관리자 기능 스펙

3) LLM Decision Area:
사용자 행동 로그와 운영 KPI를 어떤 단위로 볼지 결정한다.

4) Code Processing Area:
엔터티 스키마 정의(`style_card`, `comparison_set`, `decision_event`) 및 상태 전이 검증.

5) Success Criteria:
사용자/운영자 모두의 핵심 시나리오가 CRUD + 상태 전이로 표현되고, 취향 충돌 케이스는 합의 보드 수동 확정 정책(A)으로 처리된다.

6) Validation Method:
Schema validation + rule-based transition check.

7) Failure Handling:
상태 전이 충돌 시 충돌 케이스를 분리 기록하고 재설계.

8) Skills / Scripts:
- Skill: `backend-patterns`
- Script: `scripts/validate-state-transition.mjs` (planned)

9) Intermediate Artifact Rule:
`output/step05_feature_ops_spec.md`

#### Step 06: MVP Boundary, Roadmap, and Monetization
1) Step Goal:
MVP와 확장 기능을 분리하고 단계별 로드맵/수익모델을 확정한다.

2) Input / Output:
- Input: `output/step05_feature_ops_spec.md`
- Output: 단계별 로드맵 표 + 수익 모델 매트릭스

3) LLM Decision Area:
사용자 가치 대비 구현 복잡도를 기준으로 우선순위를 조정한다.

4) Code Processing Area:
기능 태그(`MVP`, `Phase2+`) 일관성 검사.

5) Success Criteria:
모든 기능이 MVP 또는 확장 중 하나로 분류되고 근거가 기재되며, MVP 완료 조건(카테고리 최종 1안 확정 + 체크리스트 100%)이 명시된다.

6) Validation Method:
Rule-based tag coverage + human review.

7) Failure Handling:
분류 모호 항목은 `NEEDS_USER_INPUT` 후보로 표기하고 기본값은 확장으로 이동.

8) Skills / Scripts:
- Skill: `blueprint`
- Script: none

9) Intermediate Artifact Rule:
`output/step06_roadmap_monetization.md`

#### Step 07: Blueprint Assembly and Consistency Pass
1) Step Goal:
모든 중간 산출물을 템플릿 구조에 맞춰 최종 문서로 통합한다.

2) Input / Output:
- Input: `output/step01...step06` artifacts
- Output: `blueprint-wedding-style-coach.md` draft

3) LLM Decision Area:
중복 제거, 섹션 간 논리 일관성, 톤앤매너 통일을 수행한다.

4) Code Processing Area:
필수 헤더/테이블/체크리스트/상태 토큰 존재 여부 검사.

5) Success Criteria:
문서가 템플릿 필수 구조와 사용자 요청 항목을 모두 포함한다.

6) Validation Method:
Rule-based section check + LLM self-check.

7) Failure Handling:
누락 항목이 있으면 해당 Step 산출물로 되돌아가 보완 후 재통합.

8) Skills / Scripts:
- Skill: `blueprint`
- Script: `scripts/validate_blueprint_doc.py`

9) Intermediate Artifact Rule:
`output/step07_blueprint_draft.md`

#### Step 08: Structural Validation and Handoff
1) Step Goal:
공식 validator로 구조를 검증하고 핸드오프 요약을 만든다.

2) Input / Output:
- Input: `blueprint-wedding-style-coach.md`
- Output: 검증 결과 로그 + 전달 요약

3) LLM Decision Area:
검증 실패 항목의 우선순위를 판단하고 수정 방향을 정한다.

4) Code Processing Area:
`validate_blueprint_doc.py` 실행, 결과 파싱, pass/fail 판정.

5) Success Criteria:
Validator 통과(`exit code 0`) 및 사용자 공유용 핵심 결정 요약 완료.

6) Validation Method:
Script-based validation.

7) Failure Handling:
실패 시 문서 수정 후 최대 3회 재검증, 이후 `FAILED`로 종료.

8) Skills / Scripts:
- Skill: `blueprint`
- Script: `/Users/dasha/.agents/skills/blueprint/scripts/validate_blueprint_doc.py`

9) Intermediate Artifact Rule:
`output/step08_validation_report.txt`

### State Model
| State | Entry Condition | Exit Condition | Next State |
|---|---|---|---|
| `COLLECTING_REQUIREMENTS` | `prompt.md`를 읽고 요구를 구조화하는 중 | 요구/가정이 문서화됨 | `PLANNING` |
| `PLANNING` | 섹션/단계 설계와 우선순위 결정 중 | 단계 정의 완료 | `RUNNING_SCRIPT` or `VALIDATING` |
| `RUNNING_SCRIPT` | 정적 검증/포맷 검증 스크립트 실행 | 스크립트 성공 또는 실패 반환 | `VALIDATING` or `FAILED` |
| `VALIDATING` | 문서 구조/내용을 점검 중 | 통과 또는 보완 필요 판단 완료 | `DONE` or `NEEDS_USER_INPUT` or `FAILED` |
| `NEEDS_USER_INPUT` | 모호한 정책 선택 또는 누락 정보 확인 필요 | 사용자 응답 확보 | `PLANNING` or `DONE` |
| `DONE` | 최종 문서 전달 및 합의 완료 | Terminal | [none] |
| `FAILED` | 검증 실패 반복 또는 복구 불가 | Terminal | [none] |

## 3. Implementation Spec

### Recommended Folder Structure
```text
/project-root
  AGENTS.md
  AGENTS_ECC.md
  DESIGN.md
  DESIGN_AIRBNB.md
  prompt.md
  blueprint-wedding-style-coach.md
  /.codex
    config.toml
    /agents
      planner.toml
      ui-designer.toml
      frontend-engineer.toml
      backend-engineer.toml
      database-engineer.toml
      ml-inference-engineer.toml
      qa-engineer.toml
      github-pr-writer.toml
  /.agents
    /skills
      /wedding-intake-normalizer
        SKILL.md
        /agents
          openai.yaml
        /scripts
        /references
      /wedding-style-recommender
        SKILL.md
        /scripts
        /references
      /wedding-comparison-planner
        SKILL.md
        /scripts
        /references
  /output
  /scripts
  /docs
```

### AGENTS.md Responsibilities
- 루트 `AGENTS.md`는 `AGENTS_ECC.md`를 참조해 MarryTone 전용 멀티에이전트 역할/소유 범위/품질 게이트를 정의한다.
- 스킬 호출 규칙은 `.agents/skills/<skill-name>/SKILL.md`를 단일 진실원으로 사용한다.
- `.codex/config.toml`의 `features.multi_agent = true`를 기준으로 병렬 개발을 수행하고, 동일 파일 동시 write를 금지한다.
- FE/BE/DB/QA/PR 작성 에이전트 간 handoff 체크리스트를 유지한다.

### Custom Agent Definitions
| Name | Path | Role | Required Fields |
|---|---|---|---|
| planner | `.codex/agents/planner.toml` | 스프린트/작업 분해, 의존성 및 리스크 관리 | `name`, `description`, `developer_instructions` |
| ui-designer | `.codex/agents/ui-designer.toml` | `DESIGN_AIRBNB.md` 기반 UI/토큰 설계, 핑크 톤 가이드 적용 | `name`, `description`, `developer_instructions` |
| frontend-engineer | `.codex/agents/frontend-engineer.toml` | Next.js App Router + FSD 프론트 구현 | `name`, `description`, `developer_instructions` |
| backend-engineer | `.codex/agents/backend-engineer.toml` | NestJS/Fastify API 및 도메인 모듈 구현 | `name`, `description`, `developer_instructions` |
| database-engineer | `.codex/agents/database-engineer.toml` | MySQL/Prisma 스키마, 인덱스, 마이그레이션 설계 | `name`, `description`, `developer_instructions` |
| ml-inference-engineer | `.codex/agents/ml-inference-engineer.toml` | Python FastAPI sidecar 및 모델 서빙/검증 | `name`, `description`, `developer_instructions` |
| qa-engineer | `.codex/agents/qa-engineer.toml` | 테스트 전략, E2E/통합/회귀 검증 | `name`, `description`, `developer_instructions` |
| github-pr-writer | `.codex/agents/github-pr-writer.toml` | 커밋 메시지/PR 설명/테스트 플랜 작성 | `name`, `description`, `developer_instructions` |

### Skill and Script Inventory
| Name | Type | Role | Trigger Condition |
|---|---|---|---|
| `blueprint` | skill | 요구사항을 통합 설계 문서로 변환 | 초기 기획/설계 문서 작성 시 |
| `wedding-intake-normalizer` | skill (planned) | 사용자 입력을 표준 taxonomy로 정규화 | 진단 입력 파이프라인 정의 시 |
| `wedding-style-recommender` | skill (planned) | 카테고리별 추천/설명 생성 규칙 관리 | 추천 품질 개선 주기마다 |
| `wedding-comparison-planner` | skill (planned) | 저장/비교/합의 흐름 자동화 | 의사결정 UX 고도화 시 |
| `scripts/normalize-ia.mjs` | script (planned) | IA 노드 정합성 검사 | IA 변경 커밋 전 |
| `scripts/validate-recommendation-spec.mjs` | script (planned) | 추천 스펙 스키마 검증 | 추천 로직 수정 후 |
| `scripts/validate-state-transition.mjs` | script (planned) | 상태 전이 규칙 검증 | 저장/비교 로직 수정 후 |
| `scripts/check-sidecar-health.sh` | script (planned) | Node↔Python sidecar 헬스체크 | 배포 전/장애 점검 시 |
| `/Users/dasha/.agents/skills/blueprint/scripts/validate_blueprint_doc.py` | script | 블루프린트 구조 검증 | 문서 제출 직전 |

### Skill Creation Rules

> 이 설계서에 정의된 모든 스킬은 구현 시 반드시 `skill-creator` 스킬(`/skill-creator`)을 사용하여 생성할 것.
> 직접 SKILL.md를 수동 작성하지 말 것 — 규격 불일치 및 트리거 실패의 원인이 됨.

skill-creator가 보장하는 규격:
1. SKILL.md frontmatter (`name`, `description`) 필수 필드 준수
2. `description`의 트리거 정확도 최적화 (eval 기반 optimization loop)
3. 스킬 저장 위치 `.agents/skills/<skill-name>/` 규격 준수
4. 폴더 구조 (`SKILL.md` + `scripts/` + `references/`) 규격 준수
5. Progressive disclosure: SKILL.md 본문 500줄 이내, 대용량 참조는 `references/`로 분리
6. 테스트 프롬프트 실행 및 품질 검증 완료

### Core Artifacts
| Path | Format | Producer | Purpose |
|---|---|---|---|
| `output/step01_requirement_brief.md` | md | Step 01 | 요구사항/가정 정리 |
| `output/step02_persona_flow.md` | md | Step 02 | 사용자 유형/대표 플로우 정의 |
| `output/step03_ia_screens.json` | json | Step 03 | IA/화면 우선순위 구조화 |
| `output/step04_recommendation_spec.json` | json | Step 04 | 추천/진단 규칙 명세 |
| `output/step04_measurement_mapping_rules.json` | json | Step 04 | 측정 기반 골격 매핑 규칙/임계값 |
| `output/step04_personal_color_mapping_rules.json` | json | Step 04 | 피부/홍채 대표색 PCCS/KS 매핑 규칙 |
| `output/step05_feature_ops_spec.md` | md | Step 05 | 기능/운영 스펙 문서화 |
| `output/step06_roadmap_monetization.md` | md | Step 06 | MVP/확장/수익모델 계획 |
| `output/step07_blueprint_draft.md` | md | Step 07 | 통합 초안 |
| `output/step08_validation_report.txt` | txt | Step 08 | 검증 로그 |
| `AGENTS.md` | md | Project root | 멀티에이전트 운영 규칙 |
| `DESIGN.md` | md | Project root | Airbnb 기반 디자인 시스템 |
| `docs/agent-playbook.md` | md | Project root | 역할별 handoff/릴리즈 체크 안내서 |
| `.codex/agents/*.toml` | toml | Project root | 역할별 커스텀 에이전트 안내서 |
| `blueprint-wedding-style-coach.md` | md | Final | 프로젝트 시작용 최종 블루프린트 |

### ECC Multi-Agent Implementation Readiness Check (2026-04-12)

판정: **부분 준비 완료 (Planning-Ready, Build-Not-Ready)**.

현재 확인된 준비 완료 항목:
- `.codex/config.toml`에 `features.multi_agent = true`가 활성화되어 있고 역할별 `layer` 연결이 유효하다.
- `.codex/agents/*.toml`에 planner/UI/FE/BE/DB/ML/QA/PR-writer 역할 정의가 존재한다.
- `AGENTS.md`, `DESIGN.md`, `docs/agent-playbook.md`가 작성되어 멀티에이전트 협업 기준이 문서화되어 있다.

현재 구현 착수 전 필수 보완 항목:
- 실행 가능한 애플리케이션 코드 스캐폴드 부재: `apps/web`, `services/api`, `services/ml`, `tests` 디렉터리 미생성.
- 빌드/의존성 관리 파일 부재: `package.json`, 워크스페이스 설정(`pnpm-workspace.yaml` 등), Python 의존성 파일 미존재.
- 로컬 실행 인프라 부재: `docker-compose.yml`, 환경변수 템플릿(`.env.example`), DB 마이그레이션 초기본 미존재.
- CI/품질 게이트 부재: lint/typecheck/test 스크립트 및 파이프라인 설정 미구성.

즉시 실행 가능한 구현 상태로 전환하기 위한 Phase 0 기준:
1. 모노레포 스캐폴드 생성 (`apps/web`, `services/api`, `services/ml`, `packages/contracts`, `tests`).
2. FE/BE/ML/DB 기본 부트스트랩 및 헬스체크 API + sidecar 연결 smoke test 구현.
3. Prisma 초기 스키마/마이그레이션, Redis/BullMQ, S3(MinIO) 개발 환경 compose 구성.
4. 테스트/검증 명령(`test`, `lint`, `typecheck`)과 최소 CI 파이프라인 연결.
5. 멀티에이전트 병렬 작업 단위(파일 소유권) 확정 후 1차 구현 스프린트 시작.

## 4. Validation Checklist

- [ ] Every workflow step has all 9 required fields
- [ ] Intermediate artifacts use the `output/stepNN_<name>.<ext>` rule
- [ ] LLM vs code responsibilities are separated clearly
- [ ] Human review points are explicit where needed
- [ ] Codex skill paths use `.agents/skills/...`
- [ ] Codex custom subagents use `.codex/agents/*.toml`
- [ ] Skill additions or updates mention `skill-creator`
- [ ] MVP and post-MVP scope are explicitly separated
- [ ] Mobile-first screen priorities are clearly defined
