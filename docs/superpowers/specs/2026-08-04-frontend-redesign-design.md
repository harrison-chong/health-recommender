# Frontend Redesign — "Training Room"

**Date:** 2026-08-04
**Status:** Approved (design phase)
**Scope:** Visual reskin of the React/MUI frontend only. No backend, API, or routing-structure changes.

## Problem

The current frontend is a textbook AI-generated aesthetic. The theme file self-identifies as
"AI Startup Inspired Color System / Inspired by Anthropic/OpenAI": indigo primary, sky-blue
secondary, generic zinc neutrals, Inter typeface, soft shadows, and — on the home page —
gradient blobs, a gradient-clipped headline, and "AI-powered" badges. The user wants a
distinctive, intentional visual identity that reads as a deliberate human choice, not a
templated default.

## Subject & single job

- **Subject:** Personal health/training metrics — BMI, BMR/TDEE, body fat, macros, plus
  AI-generated workout and diet plans.
- **Audience:** An individual tracking their own numbers, deciding what to train and eat.
- **The page's single job:** Take my measurements, show me my numbers, give me a plan.

This is a numbers product. The design's central decision flows from that: **numbers are the
hero, so they get their own typeface and their own surface.**

## Direction (approved)

**Training Room** — off-white gym-wall, dense near-black ink, a single burnt-orange signal
accent, monospace for every number. Confident, athletic, no gradients, no blobs. Feels like a
modern strength-training app (a cleaner Hevy / Strong), not an AI startup landing page.

Rejected alternatives (for the record):
- **Clinical Readout** (green-black + lime pulse) — medical-instrument vibe; rejected for direction.
- **Coach's Clipboard** (warm paper + serif + oxblood) — too close to the AI-default
  cream-plus-terracotta-serif look the brief warns against.
- The current indigo/sky "AI startup" look — the thing we are replacing.

## Token system

### Colour

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `wall` | `#FAFAF7` | `#161719` | Page background, sidebar, form surface |
| `ink` | `#15171A` | `#F2F1EC` | Primary text, ink result card (light), button fill (light) |
| `paper` | `#FFFFFF` | `#1E1F22` | Raised cards / panels distinct from the wall |
| `rule` | `#E3E0D8` | `rgba(255,255,255,0.08)` | Hairline dividers, input borders |
| `muted` | `#9A9388` | `#8A857C` | Secondary text, captions, units |
| `signal` (orange) | `#F97316` | `#FB923C` | The single accent — status, range marker, active state |
| `ink.panel` (result) | `#15171A` | `#26282B` | The dark result-card surface, **both themes** |

Status semantics (BMI category, etc.) map onto `signal` intensity + label, **not** onto a
rainbow of reds/greens/ambers. The orange is the signal; neutral ink carries the rest.

### Typography

- **UI / body / display:** `Space Grotesk` (weights 400 / 500 / 600 / 700). Replaces Inter.
- **Numbers / data:** `Space Mono` (weights 400 / 700). Used for *every* number: stat values,
  units, ranges, macro splits, calorie counts, tab counters. The signature face.
- **Eyebrows / labels:** Space Grotesk 500, uppercase, `letter-spacing: 0.14em`, `muted` colour.

A matched family (designed together) so UI and numbers always feel of-one-piece.

Type scale (derived from current scale, retuned):
- Display (result number): `3.5rem`, Space Mono 700, `letter-spacing: -0.03em`.
- h1: `3rem` / 700 / `-0.03em`. h2: `2.25rem` / 700. h3: `1.5rem` / 600.
- Body: `1rem` / 1.6 line-height. Caption: `0.75rem`.
- Buttons: `textTransform: none`, weight 600.

### Shape & elevation

- **Border radius:** `2px` everywhere (cards, inputs, buttons, chips). Near-square — the
  antithesis of the current 12–16px pill-y radii. This is a deliberate edge.
- **Elevation:** no soft drop shadows. Separation is by 1px `rule` hairlines and the
  ink-on-paper contrast of the result card. Inputs sit flat on the wall. The dashboard's outer
  container (currently a shadowed, `20px`-rounded white box) becomes a flat `paper` panel with a
  `rule` border and `2px` radius — same treatment as every other surface.

## Layout

The app shell (Layout + Sidebar + routes) stays. The changes are visual, not structural:

- **Sidebar (260px):** wall background, ruled top/bottom borders. Logo mark redrawn as a
  monospace glyph / simple bar mark (no gradient tiles). Nav items: muted ink, active item gets
  a `2px` ink left-bar + ink text (no indigo pill, no gradient). Theme toggle kept.
- **Home (`/`):** the gradient blobs and gradient headline are deleted entirely. The hero is a
  single large Space Grotesk statement + one Space Mono stat tease (e.g. a sample BMI readout
  on the ink card) so visitors immediately see what the product *does*. CTA is a flat ink
  button. "AI-powered" badge copy is removed or rewritten as plain language.
- **HealthDashboard (`/health`):** centered column, max-width ~960. Header is a Space Grotesk
  title + one-line plain-language subtitle (no "AI-powered"). Tab strip becomes a flat ruled
  row of labels with a `2px` ink underline indicator (replaces the indigo pill tabs).
  `CommonForm` inputs use the flat 2px-radius treatment.

## The signature

**The ink result card.** Every calculator's result renders on a near-black panel
(`ink.panel`) in **both** light and dark themes, with the number in Space Mono glowing against
it and the burnt-orange `signal` marking the user's position on the relevant range
(BMI band, body-fat band, macro split bar, etc.).

This is decoupled from theme on purpose: theme switches the *chrome* (wall, sidebar, form);
the result card is *always* the lit-up hero. That way the signature exists in both themes —
light mode (the default) is not left looking like a plain form.

- Light theme: ink card is `#15171A` against the `#FAFAF7` wall — full contrast.
- Dark theme: wall darkens to `#161719`, the result card *lifts* to `#26282B` so it still reads
  as the focal element against the darker chrome.

## Component-by-component changes

All six calculators (BMI, BMR/TDEE, Body Fat, Macros, Workout, Diet) get:
1. Plain-language intro line (Space Grotesk, `muted`) — reworded to drop "AI-powered".
2. Flat ink submit button (2px radius, no gradient, no glow).
3. Result on the ink card with Space Mono numbers + orange `signal` range marker.

Recommender outputs (Workout, Diet) currently render as text blocks in a tinted paper card;
they move to the ink card with monospace set/rep lines and macro figures, structured like a
training log.

`CommonForm`: inputs go flat — 2px radius, `rule` border, `wall` fill, Space Grotesk labels.
Selects and the shared layout match.

## What is explicitly NOT changing

- No backend, router, or state-hook changes.
- No new dependencies — Space Grotesk + Space Mono load via the existing font pipeline (Google
  Fonts `<link>` in `index.html`, same as Inter today).
- No new pages or routes.
- No animations added beyond what exists; the brief warns extra motion reads as AI-generated.
  Keep current transitions; do not add scroll-reveals or load sequences.

## Quality floor

- Responsive down to mobile (existing breakpoints kept).
- Visible keyboard focus states on all interactive elements (ink outline, 2px).
- `prefers-reduced-motion` respected (existing behaviour preserved).
- Both themes verified — signature must hold in light *and* dark.

## Risks / open notes

- Two-font load (Space Grotesk + Space Mono) vs the current one (Inter). Same Google Fonts
  pipeline, marginal weight only; acceptable.
- Near-square `2px` radius is a strong choice; if any single MUI component fights it (e.g.
  mobile drawer shape), allow a local override rather than weakening the global token.
