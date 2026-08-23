# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Solo builder using dyvoided as the shared visual system across his own apps. No external consumers, no team, no public audience. Decisions optimize for one person's taste and workflow; documentation discipline is optional, not a deliverable.

End-users of the consuming apps vary (dashboard users, developers, creatives, consumers), but they are not the audience for the system itself.

## Product Purpose

A flexible design system that lets one person ship a consistent visual identity across a personal suite of apps spanning productivity/dashboard tools, developer tools, creative/media tools, and consumer-facing apps. The system exists so each new app does not start from zero and does not drift from the others.

Success means: a new app can be skinned and assembled from the system in a short session, and the result reads as the same family without looking templated.

## Positioning

Procedural theming via four `oklch` color seeds: one override rebrands an entire app across light and dark, with all ramps, muted fills, focus rings, and accent-tinted surfaces deriving perceptually. A neighboring design system could copy the component set but not the seed-driven recolor without rebuilding the token layer.

## Operating Context

- Consuming apps target Electron desktop shells and browser-based web apps. Responsive, but not mobile-first; no native iOS/Android shells.
- App categories in scope: dashboards, creative/media tools (DAW, image editor, etc.), developer tooling, messaging, file management, editorial/reader surfaces, marketing landing, account settings.
- Dense control surfaces are in scope (mixers, tables, sequencers, inspectors) alongside calmer reading and settings surfaces. The system must hold both without a second design language.
- Dark-first; light theme is a peer, not an afterthought.

## Capabilities and Constraints

- Token layer is the commitment: colors, typography, spacing, effects (shadow/radius/blur), motion, interaction, scrollbar. Consuming apps bring their own framework. Corners are sharp 2px on all controls and panels (`--radius-xs` through `--radius-xl`); full pill (`--radius-full`) only for switches, badges, dots, avatars, scrollbar thumbs. Browser surfaces (`::selection`, `caret-color`, `::placeholder`, `accent-color`) are themed via `tokens/interaction.css` and flip with `[data-theme]`.
- JSX components in `components/` are reference implementations, not the committed component layer. HTML `.card.html` previews are the canonical visual specimens. All interactive specimens use semantic HTML (`<button>`, `<input>`, ARIA roles) with `:focus-visible` rings; `.jsx` mirrors these patterns.
- Procedural color: four `*-seed` custom properties drive all identity color. `--signature`, `--success`, `--danger`, `--warning` are fixed and must not be rebranded. Identity color is expressed by category (slider modulation source, layer category), not by individual element — most of the UI stays primary; accents carry meaning.
- Density: every spacing token has a `[data-density="compact"]` override. Default is spacious; compact exists for power-user and data-dense views.
- Theming rule: never hardcode a hue in a component or screen; always reference the tokens. Token names are positional (`--accent-1`), never hue-named.
- Motion: animations are compositor-only (`transform`/`opacity`); paint properties (`color`, `background`, `border-color`, `box-shadow`) are allowed for state transitions at ≤180ms. Never animate layout properties (`width`, `height`, `margin`, `padding`, `top`, `left`). Spring easing only on the Switch thumb. Overlay entrances (dialog, command palette, menu, select pop, scrim) use `@starting-style` + `allow-discrete` for fade+scale on show. Toasts fade+rise on insertion via keyframe. Tab indicator fades between tabs via opacity transition. Checkbox, switch track, and select field ease through state changes.
- Icons: Lucide, used sparingly. `.card.html` previews load the real CDN build; `.jsx` references vendor Lucide path data and instruct real apps to `npm install lucide-react`.
- Window chrome: custom Electron titlebar, not OS-native, so macOS and Windows look identical. macOS traffic lights re-colored to brand danger/amber/success.
- Current scope: 18 components, 10 app-shell templates. Component set is sized to the four app categories, not exhaustively enumerated from a real product yet.
- `index.html` is the landing page and sanctioned validation surface: an app-shell composition that assembles multiple components into a realistic layout. It imports `styles.css` and iframes the canonical `.card.html` specimens, so it stays in sync with the component layer automatically. The drift script (`scripts/drift.mjs`) scans it alongside cards and JSX to catch banned patterns, hardcoded hues, and non-token font sizes.

## Brand Commitments

- Name "dyvoided" is provisional. Compile namespace is auto-derived from the project name (`window.DyvoidedDesignSystem_7b704c` at time of writing); renaming the project changes it.
- Voice: short, literal labels over cleverness. Second person, direct. Numbers and units in monospace wherever they are measurements or live values. No emoji. No exclamation points in UI copy. Sentence case for buttons and labels. Panel titles use mono uppercase at `--font-size-xs`; sidebar group headers use the body font at `--font-size-2xs`, 600 weight, uppercase — a deliberate hierarchy step down from panel titles. Data keys (File size, Opacity) stay small/mono/uppercase.
- Reference taste on record: Arturia Pigments (rich, precise creative-tool UI) and Obsidian (clean, calm, dark-first productivity). Explicitly avoided: flat/lifeless Microsoft-era UI and trend-driven "style over clarity" agency sites.
- A separate reference (Cape Town Dam Levels) was considered for its finesse and lightness, not its structure or topic. Its overuse of italics and uppercase, and its neon turquoise accent, are explicitly rejected.

## Evidence on Hand

- The repo root holds the full incumbent system: tokens, guidelines, components, templates, readme. This is the primary evidence and the anti-reference for the refinement work ahead.
- `readme.md` — the system's own foundation doc, written when the system was built.
- No real consuming app exists yet; no real product copy exists. All copy in templates is provisional.

## Product Principles

1. **One system, many apps.** Flexibility across app categories outranks optimization for any single one. No category gets a bespoke design language.
2. **Tokens are the contract.** The token layer is the commitment; components and frameworks are interchangeable. Rebranding is a seed override, not a rebuild.
3. **Restraint over decoration.** No ornament for its own sake. Identity lives in precise details, not in effects.
4. **Dark-first, light as peer.** Both themes are real surfaces with real users, not a toggle afterthought.
5. **Finesse over bulk.** The system should read as considered and light, not heavy or AI-generated. This is the active refinement direction.

## Accessibility & Inclusion

No product-specific accessibility standard has been established yet. Default to standard web practice: keyboard focus on every interactive element via `:focus-visible` (the system already does this through `data-ds-focus`), semantic HTML, sufficient contrast on text. Refine as real apps surface real needs.
