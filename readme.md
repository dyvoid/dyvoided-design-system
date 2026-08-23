# dyvoided.2 — Design System

A flexible design system for building apps with a consistent visual identity across productivity tools, developer tools, creative/media tools, and consumer-facing surfaces. Dark-first with light as a peer. Targets Electron desktop shells and browser-based web apps.

The core idea: **one token layer, many apps**. Rebranding an app is a single seed override, not a rebuild. Components are framework-agnostic CSS classes — bring your own JS framework.

## Quick start

Import one file in your app:

```html
<link rel="stylesheet" href="styles.css">
```

That pulls in every token layer (colors, typography, spacing, effects, motion, interaction, scrollbar) and all component classes. Use the `ds-*` classes directly in your markup:

```html
<button class="ds-btn ds-btn-primary">Render</button>
```

Open `index.html` in a browser to see the full showcase — live interactive workbench, every component specimen, all ten app-shell templates, and the type/color foundations.

## Rebranding

Color is fully procedural. Four `oklch` seed values drive every identity color — ramps, muted fills, focus rings, accent-tinted surfaces. Override only the seeds to rebrand an entire app across both themes:

```css
:root {
  --primary-seed:  oklch(62% 0.19 25);    /* your brand hue */
  --accent-1-seed: oklch(72% 0.15 145);
  --accent-2-seed: oklch(68% 0.13 240);
  --accent-3-seed: oklch(66% 0.16 300);
}
```

Rules:
- Seeds accept any CSS color (hex, oklch, hsl). Ramps are recomputed perceptually.
- Never hardcode a hue in a component or screen. Always reference tokens (`--primary`, `--accent-2-500`, `--primary-muted-bg`).
- Token names are positional, never hue-named. It's `--accent-1`, not `--amber`.
- `--signature`, `--success`, `--danger`, `--warning` are fixed. Semantic meaning must not be rebranded.

## What's in the box

- `styles.css` — the one entry point. Import this in any consuming app.
- `tokens/` — colors, typography, spacing, effects (shadow/radius/focus-ring), motion, interaction (hover/press/focus-visible + reduced-motion + native browser surfaces), scrollbar.
- `components/` — 18 reusable primitives, each with a canonical `.card.html` visual specimen and a `.jsx` reference implementation:
  - Button, Input, Select, Checkbox, Switch, Slider
  - Panel, DataTable
  - Badge, Tooltip, Toast, EmptyState, ProgressBar, Spinner
  - Tabs, Breadcrumb, SidebarNav
  - Dialog, Menu, CommandPalette, Scrim
  - Avatar, WindowChrome
- `templates/` — 10 full app-shell templates built with `ds-*` classes: Creative Studio, DAW Sequencer, Image Editor, Dev Dashboard, Dashboard Kanban, Editorial Reader, Messaging, File Manager, Marketing Landing, Account Settings.
- `guidelines/` — foundation specimen cards (colors, type, spacing, elevation, radii, scrollbars, density).
- `scripts/drift.mjs` — drift detector. Scans all specimens, templates, and JSX for banned patterns (unpinned lucide, inline `oklch(from var())`, hardcoded hues, non-token px font sizes, stale font links). Run `node scripts/drift.mjs` from the repo root.
- `index.html` — the showcase. Assembles components into a realistic layout and iframes every specimen and template.

## Foundations

**Color** — A cool graphite neutral scale carries the majority of the UI. Four identity colors (primary + three accents) sit on top, assigned by category not per-element. Dense control surfaces read at a glance without becoming a rainbow. A fixed signature neutral reserved for one decorative detail (the panel top-edge line). Functional colors (success/danger/warning) are fixed.

**Type** — Familjen Grotesk for display (page titles, big numbers, negative tracking). Hanken Grotesk for body (labels, paragraphs, buttons). JetBrains Mono for technical voice: uppercase micro-labels (panel headers, data keys) and anything numeric (timestamps, Hz, dB), with tabular figures on changing values.

**Elevation** — Soft layered shadows, never a single hard drop. Panels float on `--surface-panel` with a signature top edge and inset highlight. Raised elements (dialogs, popovers) get `--shadow-md`/`--shadow-lg` plus a hairline border. Recessed controls (slider track, checkbox, switch track) use `--inset-rail`.

**Presence** — A single `--presence` knob (0.0 to 1.0) controls how strongly surfaces assert themselves. At 0, the system is nearly flat: minimal shadows, no gradients, no inset highlights. At 1, it's lush and tactile: full layered shadows, gradient fills on buttons and controls, visible inset rails and specular edge highlights. Default is 0.5. One value drives every shadow, highlight, and muted-bg fill opacity in the system. Set it once per app to match the desired feel — a calm reading tool might sit at 0.2, a creative DAW at 0.8.

**Corners** — Sharp 2px on all controls and panels. Full pill (999px) only for switches, badges, dots, avatars, and scrollbar thumbs.

**Density** — Every spacing token has a `[data-density="compact"]` override. Default is spacious; compact exists for power-user and data-dense views.

**Motion** — 120ms for hover/press, 180ms for state changes and overlay entrances, 280ms for dialogs. Spring easing only on the Switch thumb. Compositor-only (`transform`/`opacity`); paint properties allowed for state transitions at 180ms or less. Never animate layout properties. Overlay entrances use `@starting-style` + `allow-discrete` for fade+scale. `prefers-reduced-motion` collapses all transitions to 0.01ms (spinner exempted).

**Browser surfaces** — `::selection`, `caret-color`, `::placeholder`, and `accent-color` are themed via `tokens/interaction.css` and flip with `[data-theme]`. Consuming apps inherit themed browser surfaces automatically.

**Window chrome** — Custom Electron titlebar, not OS-native. macOS and Windows look identical. Traffic lights re-colored to brand danger/amber/success.

## Content guidelines

- Short, literal labels over cleverness. "Render", "Duplicate", "Auto-save".
- Second person, direct. "Save changes", not "Your changes will be saved."
- Numbers and units in monospace wherever they're measurements or live values.
- No emoji. No exclamation points in UI copy.
- Sentence case for buttons and labels. Uppercase only for mono micro-labels (data keys like "Sample rate", "Cutoff"). Panel titles use mono uppercase at `--font-size-xs`. Sidebar group headers use body font at `--font-size-2xs`, 600 weight, uppercase.

## Icons

[Lucide](https://lucide.dev), used sparingly: one icon per nav item, one per file row, one per header action. Not used in badges or inside dense control rows. The `.card.html` specimens load Lucide from CDN; real apps should `npm install lucide-react` (or equivalent) and use the real package.

## Accessibility

Every interactive element uses semantic HTML with ARIA roles and states. `:focus-visible` rings appear on keyboard focus via `--focus-ring` — never rely on browser default outlines. Switches use `<input type="checkbox" role="switch">`. Checkboxes and sliders use native inputs with visual peer elements. The `.jsx` reference implementations mirror these patterns with `React.useId()` for label association.
