# dyvoided.2 — Design System

A from-scratch design identity for a personal suite of applications: productivity/dashboard tools, developer tools, creative/media tools, and consumer-facing apps — with a specific eye toward Electron desktop shells. No existing codebase, Figma, or brand was attached; this was built from the brief below plus reference taste.

**Reference taste (not copied, not literal sources):** Arturia Pigments (rich, precise creative-tool UI — soft elevation, tactile controls, confident but restrained color), Obsidian (clean, calm, dark-first productivity surface). Explicitly avoided: flat/lifeless Microsoft-era UI, and trend-driven "style over clarity" agency sites. The result sits between those two poles — sleek and professional, control-dense where it needs to be, never decorative for its own sake.

Name is provisional. Components compile onto `window.DyvoidedDesignSystem_7b704c` (this project's auto-derived namespace) — every template's `x-import` tags reference that name. Rename the project and re-check with `check_design_system` to see the new namespace before updating those references.

## Index

- `styles.css` — the one entry point. Import this file in any consuming app.
- `tokens/` — colors, typography, spacing, effects (shadow/radius/blur/inset-rail/inset-highlight/focus-ring), motion, interaction (hover/press/focus-visible + reduced-motion, driven by `data-ds-*` attributes components set; also themes native browser surfaces: `::selection`, `caret-color`, `::placeholder`, `accent-color`).
- `guidelines/` — foundation specimen cards (colors, type, spacing, elevation, radii).
- `components/` — reusable primitives, grouped by concern:
  - `button/` — Button
  - `input/` — Input
  - `checkbox/` — Checkbox
  - `switch/` — Switch
  - `select/` — Select
  - `controls/` — Slider
  - `surfaces/` — Panel, DataTable
  - `feedback/` — Badge, Tooltip, Toast (+ ToastStack), EmptyState, ProgressBar, Spinner
  - `navigation/` — Tabs, Breadcrumb; `sidebar/` — SidebarNav (tabs as a vertical rail)
  - `overlays/` — Dialog, Menu, CommandPalette, Scrim (`.ds-scrim` utility — fixed full-screen overlay with `--scrim` background and fade transition via `@starting-style`)
  - `avatar/` — Avatar (+ AvatarGroup)
  - `chrome/` — WindowChrome (branded Electron titlebar)
- `scripts/drift.mjs` — drift detector. Scans all `.card.html`, `.jsx`, and `eval.html` for banned patterns (unpinned lucide, inline `oklch(from var())`, zero-offset halo box-shadows, non-token `px` font sizes, hardcoded hues, stale font links). Run `node scripts/drift.mjs` from `current/`. Exit 1 on findings.
- `eval.html` — sanctioned validation surface. An app-shell composition that assembles multiple components into a realistic layout. Imports `styles.css` and iframes the canonical `.card.html` specimens, so it stays in sync with the component layer automatically. The drift script scans it alongside cards and JSX to catch banned patterns.
- `templates/` — ten full app-shell templates, each composed from the real components above via `x-import` (never hand-rolled CSS clones): DAW Sequencer Shell, Creative Studio Shell, Image Editor Shell, Dev Dashboard Shell, Dashboard Kanban Shell, Editorial Reader Shell, Messaging Shell, File Manager Shell, Marketing Landing Shell, Account Settings Shell.

No source codebase defined a component inventory, so the set above is a standard starter set sized to the four app types described in the brief. Add more as real screens need them — ask and I'll build them to match.

## Content fundamentals

No product copy exists yet (no real app to draw voice from). Provisional stance, matching the visual restraint:

- Short, literal labels over cleverness: "Render", "Duplicate", "Auto-save" — not "Let's make magic happen."
- Second person, direct: "Save changes", not "Your changes will be saved."
- Numbers and units in monospace (`--font-mono`) wherever they're measurements or live values — buffer sizes, dB, Hz, timestamps — visually distinguishing "data" from "prose."
- No emoji. No exclamation points in UI copy.
- Sentence case for buttons and labels; uppercase only for small mono/tracking-wide microlabels (data keys like "Sample rate", "Cutoff"). Panel titles use mono uppercase at `--font-size-xs`. Sidebar group headers ("Workspace", "Layers", "Inspector") use the body font at `--font-size-2xs`, 600 weight, uppercase, slightly tighter tracking — a deliberate hierarchy step down from panel titles.

## Visual foundations

- **Color** *(procedural — see "Theming" below)*: a near-monochrome graphite scale (cool, slightly blue-gray, never pure black/white) carries the majority of the UI. On top sit **four identity colors** — a primary (`--primary`, primary actions/focus) plus three supporting accents (`--accent-1`/`--accent-2`/`--accent-3`) for per-parameter identity, so dense control surfaces read at a glance without turning into a rainbow: each is assigned a role, never picked freely per-element. These are **not fixed** — their default hues (indigo / amber / teal / magenta) are just the dyvoided.2 defaults; every app rebrands by overriding the seeds. A separate **fixed** signature neutral (`--signature`) is reserved for one decorative detail (the panel top-edge line) and is deliberately immune to rebranding. Functional colors (`--success`/`--danger`/`--warning`) are also fixed — semantic meaning must never be rebranded.
- **Type**: Familjen Grotesk (display) is a characterful contemporary grotesque — used for page titles and big numbers, always at negative tracking for a tighter, more deliberate feel. Hanken Grotesk (body) is a clean humanist grotesk built for small UI text — labels, paragraphs, buttons. JetBrains Mono is the technical voice: uppercase, letter-spaced micro-labels (panel headers, tabs, field labels, window title) and anything literally numeric (timestamps, Hz, dB, code), with tabular figures where values change.
- **Elevation**: soft, layered, never a single hard drop shadow. Shadows are two-layer (tight + soft) for real depth. Panels float on `--surface-panel` with a signature top edge (`--signature-500` 1px, the fixed neutral metallic line immune to rebranding) plus `--shadow-sm` and an inset highlight; no full 1px border — background contrast and the signature top edge do the definition work. Raised elements (dialogs, popovers) get `--shadow-md`/`--shadow-lg` plus a 1px hairline border. Recessed controls (slider track, checkbox, switch track) use `--inset-rail` for an inset shadow that reads as a recessed surface.
- **Corners**: sharp 2px on all controls and panels (`--radius-xs` through `--radius-xl`), full pill (`--radius-full`, 999px) only for switches, badges, dots, avatars, and scrollbar thumbs. Never fully square, never bubble-rounded — precision and authority, not softness.
- **Borders & surfaces**: hairline borders at low opacity (`--border-subtle` \~9-14%, `--border-strong` \~16-20%) rather than solid gray lines — reads as "glass panel edge," not a ruled line.
- **Focus**: every interactive element shows `--focus-ring` on keyboard focus (`:focus-visible`, not mouse clicks) via a shared `data-ds-focus` attribute — never rely on browser default outlines.
- **Density**: every spacing token has a `[data-density="compact"]` override. Default is spacious (Pigments/Obsidian both give content room); compact mode exists for power users and data-dense views (mixers, tables) without a second design language.
- **Motion**: fast (120ms) for hover/press feedback, base (180ms) for state changes and overlay entrances, slow (280ms) for dialogs and toast entrance. Spring easing only on the Switch thumb (the one place a little personality is earned). All animations are compositor-only (`transform`/`opacity`), never layout properties (`left`/`width`/`height`). No bounce anywhere else. Overlay entrances (dialog, command palette, menu, select pop, scrim) use `@starting-style` + `allow-discrete` for fade+scale on show, with `[hidden]` driving the exit. Toasts fade+rise on insertion via `@keyframes ds-toast-in`. The tab indicator is always rendered and toggled via opacity transition so the underline fades between tabs instead of jumping. Checkbox, switch track, and select field ease through state changes. `@keyframes ds-spin` (spinner) is defined in `components.css`. The existing `prefers-reduced-motion` override in `tokens/interaction.css` collapses all transitions and animations to 0.01ms — overlays still appear, feedback still registers, just instantly.
- **Backgrounds**: base surfaces (`--surface-app`, `--surface-panel`, `--surface-raised`) are flat — no noise/grain, no imagery-as-chrome. The one exception is the **main-area wash**: 1–2 soft `radial-gradient`s built from `*-muted-bg` tokens (18% opacity) fading to `transparent` by \~45% radius, laid over flat `--surface-app` — see `templates/dashboard-kanban`, `templates/marketing-landing`, `templates/daw-sequencer`, `templates/dev-dashboard` for the exact recipe. Never raise the opacity past the muted-bg tokens or use a full-strength/opaque gradient — the wash must stay faint enough that panel borders (`--border-subtle`, 7%) still read clearly on top of it.
- **Browser surfaces**: `::selection`, `caret-color`, `::placeholder`, and `accent-color` (native checkboxes/radios) are themed via `tokens/interaction.css` and flip with `[data-theme]`. Consuming apps inherit themed browser surfaces automatically.
- **Window chrome (Electron)**: custom titlebar, not OS-native, so the app looks identical on macOS and Windows. macOS traffic lights are re-colored to the brand's danger/amber/success rather than red/yellow/green — same affordance, on-brand.
- **Identity color in use**: the four identity seeds are expressed by category, not by individual element. In creative tools, sliders get an accent color only when the parameter is being modulated (e.g., Cutoff gets teal because LFO 1 → Cutoff is active); other sliders stay primary. Layers get a colored left edge by category (drum, bass, lead, pad, fx), and colors repeat across layers. Most of the UI stays primary; accents carry meaning, not decoration. Sliders auto-render a 20-step tick rail below the track via `::after` (no markup required); an explicit `.ds-slider-ticks` element overrides the auto-render if present.

## Theming (procedural color)

Color is **fully procedural**. Each of the four identity colors is defined by a single **seed** custom property — `--primary-seed`, `--accent-1-seed`, `--accent-2-seed`, `--accent-3-seed` — and *everything else derives from it*: the 300–700 tint/shade ramp (via `oklch(from … )` relative color), the translucent `*-muted-bg` fills, the focus ring, and every accent-tinted surface in the kit (the main-area background wash, sidebar gradient, badges, slider fills, card bars). Change a seed and all of it recolors, in both light and dark themes.

To rebrand an app, override **only the four seeds** — nothing else:

```css
:root {
  --primary-seed:  oklch(62% 0.19 25);   /* e.g. a red-brand app */
  --accent-1-seed: oklch(72% 0.15 145);
  --accent-2-seed: oklch(68% 0.13 240);
  --accent-3-seed: oklch(66% 0.16 300);
}
```

Rules:

- **Seeds accept any CSS color** (hex, oklch, …); ramps are recomputed perceptually so any hue stays balanced.
- **Never hardcode a hue** in a component or screen — reference the tokens (`--primary`, `--accent-2-500`, `--primary-muted-bg`, …). Don't write raw `oklch(… 275)` accent literals; that breaks theming.
- **Token names are positional, never hue-named** — it's `--accent-1`, not `--amber`. The color a name points at is app-defined.
- `--signature`, `--success`, `--danger`, `--warning` are **fixed** and must not be themed.

## Iconography

Icons are real **Lucide** glyphs, not hand-drawn approximations — but how they're wired in differs by file type, because this project's in-browser compiler can't resolve npm packages:

- **`*.card.html` previews** (plain HTML, no React) load the actual Lucide CDN build and render via `<i data-lucide="...">` + `lucide.createIcons()` — a real dependency.
- **`.jsx` components** (Select, CommandPalette, Toast) inline Lucide's exact SVG path data directly, since `import { X } from 'lucide-react'` gets silently dropped by this compiler. Each of those files has a comment flagging this and instructing real consuming apps to `npm install lucide-react` and swap in the real components.

Used sparingly: one icon per nav item, one per file/project row, one per header action button. Not used in badges (text + color carries state there) or inside dense control rows (checkboxes, sliders) to avoid clutter.

## Accessibility

Every interactive element in the canonical `.card.html` specimens uses semantic HTML: `<button>` for tabs, nav items, menu items, select triggers, command palette items; `<input type="checkbox" role="switch">` for switches; `<input type="checkbox">` with `data-ds-peer` for checkboxes; `<input type="range">` inside `data-ds-track` for sliders. ARIA roles (`role="tab"`, `role="menuitem"`, `role="listbox"`, `role="option"`, `role="dialog"`) and states (`aria-selected`, `aria-current`, `aria-checked="mixed"`, `aria-haspopup`, `aria-labelledby`) are set on the appropriate elements. `:focus-visible` rings appear on keyboard focus via `--focus-ring`. The `.jsx` reference implementations mirror these patterns; `Input.jsx` uses `React.useId()` for explicit `htmlFor`/`id` label association.

## Caveats / next steps

- Icons in the `.jsx` components are vendored Lucide path data, not the real npm package (see Iconography above) — sync this repo to Claude Code to bundle with real dependencies if that matters for a real build.
- Component set is sized to the brief's four app categories, not exhaustively enumerated from a real product yet — tell me the first real screen you want to build and I'll add whatever primitives it needs.
- Remember to set this project's File type to **Design System** in the Share menu so other apps/collaborators can pull from it.
