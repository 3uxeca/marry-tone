# MarryTone Design System

This guide follows:
- Base layout language: `DESIGN_AIRBNB.md`
- Visual refinement reference: `/Users/dasha/Downloads/stitch_marrytone/seoul_ethereal/DESIGN.md`

## Creative Direction

- Creative north star: `The Ethereal Curator`
- Product feeling: Seoul-style wedding editorial, not generic SaaS dashboard
- UX tone: emotional but structured, warm but practical
- Composition: intentional asymmetry + generous whitespace + image-led storytelling

## Core Color System

| Token | Value | Usage |
|---|---|---|
| `--bg-page` | `#fbf9fa` | default page background (warm paper) |
| `--bg-surface` | `#ffffff` | card/sheet surface |
| `--text-primary` | `#1b1c1d` | primary text |
| `--text-secondary` | `#6a6a6a` | secondary text |
| `--brand-primary` | `#88487d` | brand emphasis, key icon/text |
| `--brand-pink` | `#ffb1ee` | primary container / welcoming CTA |
| `--brand-blue` | `#baeaFF` | secondary container / calm accent |
| `--accent-hover` | `#ff99e6` | hover/focus accent |
| `--accent-strong` | `#ff7ddb` | selected state emphasis |
| `--accent-soft` | `#fff0fb` | selected background tint |
| `--outline-ghost` | `rgba(211,194,204,0.1)` | minimal boundary when unavoidable |
| `--danger` | `#c13515` | error state |

## Structural Rules

### No-Line Rule
- Do not use visible 1px divider lines for sectioning.
- Separate content primarily with tonal surface shifts and spacing.

### Glass and Gradient Rule
- Floating bars/sheets may use frosted treatment:
  - `backdrop-blur` + translucent background (`~60%`)
- Hero/primary CTA may use subtle gradient:
  - `brand-primary -> brand-pink` at diagonal angle

### Tonal Layering Rule
- Depth is defined by tonal tiers first, shadow second:
  - Base: page
  - Section: container-low
  - Interactive card: container-lowest
- Heavy drop shadows are prohibited.

## Typography

- Primary family: `Pretendard Variable`
- Headline style may borrow `Plus Jakarta Sans` spacing logic for editorial feel.
- Heading weights: `600-700`
- Body weights: `400-500`
- Long-form body line height: around `1.6`
- Labels/meta: compact uppercase style allowed with positive letter spacing

## Component Rules

- Buttons:
  - Primary uses pink container tone (`--brand-pink`) and no hard border.
  - Secondary uses tonal surface instead of heavy outline.
- Cards:
  - Main radius: `20px` (hero containers can be larger)
  - No inner divider lines; separate blocks with padding rhythm.
- Inputs:
  - Tonal filled background (`surface-container-low` style)
  - Focus with soft glow/ring, not thick high-contrast stroke.
- Header:
  - Tiara icon + `MarryTone` wordmark optically centered
  - Wordmark stays high-contrast black anchor

## Motion and Interaction

- Motion should explain state transitions:
  - upload -> diagnosing -> result
  - select -> compare -> confirm
- Avoid decorative looping animations.
- Interaction feedback should be subtle and quick.

## Accessibility

- Target WCAG AA for text and interactive elements.
- Keep touch target near `44x44` minimum on mobile.
- Never encode status by color only; include text/icon cues.

## UI Reference Pages (_1 ~ _13)

Future UI tasks must reference both `code.html` and `screen.png` from:
- `/Users/dasha/Downloads/stitch_marrytone/_1` ... `/Users/dasha/Downloads/stitch_marrytone/_13`

Reference index:
- `_1`: no HTML title (`screen.png` as visual source of truth)
- `_2`: `MarryTone - Diagnosis Gate`
- `_3`: no HTML title (`screen.png` as visual source of truth)
- `_4`: `MarryTone - Photo Diagnosis`
- `_5`: `MarryTone - 나의 보관함`
- `_6`: `MarryTone - 퍼스널 컬러 진단 결과`
- `_7`: `MarryTone - 체형 진단 결과`
- `_8`: no HTML title (`screen.png` as visual source of truth)
- `_9`: no HTML title (`screen.png` as visual source of truth)
- `_10`: no HTML title (`screen.png` as visual source of truth)
- `_11`: `MarryTone - 웨딩 준비 체크리스트`
- `_12`: no HTML title (`screen.png` as visual source of truth)
- `_13`: no HTML title (`screen.png` as visual source of truth)

Mandatory rule for future UI implementation:
- If a new UI task maps to an existing `_n` page, maintain that page's composition, spacing rhythm, tonal hierarchy, and header language before adding new variations.
- If there is no direct page match, blend nearest two `_n` references and document which pages were used.

## Do and Don't

Do:
- Use soft pink + sky blue balance for emotional contrast.
- Keep editorial whitespace generous.
- Preserve tonal layering and frosted header language.

Don't:
- Reintroduce hard divider-heavy dashboard patterns.
- Use saturated neon pink as a dominant surface color.
- Break token usage with ad-hoc hardcoded color values.
