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

- Token layer is the commitment: colors, typography, spacing, effects (shadow/radius/blur), motion, interaction, scrollbar. Consuming apps bring their own framework.
- JSX components in `current/components/` are reference implementations, not the committed component layer. HTML `.card.html` previews are the canonical visual specimens.
- Procedural color: four `*-seed` custom properties drive all identity color. `--signature`, `--success`, `--danger`, `--warning` are fixed and must not be rebranded.
- Density: every spacing token has a `[data-density="compact"]` override. Default is spacious; compact exists for power-user and data-dense views.
- Theming rule: never hardcode a hue in a component or screen; always reference the tokens. Token names are positional (`--accent-1`), never hue-named.
- Icons: Lucide, used sparingly. `.card.html` previews load the real CDN build; `.jsx` references vendor Lucide path data and instruct real apps to `npm install lucide-react`.
- Window chrome: custom Electron titlebar, not OS-native, so macOS and Windows look identical. macOS traffic lights re-colored to brand danger/amber/success.
- Current scope: 18 components, 10 app-shell templates. Component set is sized to the four app categories, not exhaustively enumerated from a real product yet.

## Brand Commitments

- Name "dyvoided" is provisional. Compile namespace is auto-derived from the project name (`window.DyvoidedDesignSystem_7b704c` at time of writing); renaming the project changes it.
- Voice: short, literal labels over cleverness. Second person, direct. Numbers and units in monospace wherever they are measurements or live values. No emoji. No exclamation points in UI copy. Sentence case for buttons and labels; uppercase only for small mono/tracking-wide microlabels.
- Reference taste on record: Arturia Pigments (rich, precise creative-tool UI) and Obsidian (clean, calm, dark-first productivity). Explicitly avoided: flat/lifeless Microsoft-era UI and trend-driven "style over clarity" agency sites.
- A separate reference (Cape Town Dam Levels) was considered for its finesse and lightness, not its structure or topic. Its overuse of italics and uppercase, and its neon turquoise accent, are explicitly rejected.

## Evidence on Hand

- `current/` — the full incumbent system: tokens, guidelines, components, templates, readme. This is the primary evidence and the anti-reference for the refinement work ahead.
- `current/readme.md` — the system's own foundation doc, written when the system was built.
- `current/templates/*/.thumbnail` — rendered previews of each app-shell template.
- No real consuming app exists yet; no real product copy exists. All copy in templates is provisional.

## Product Principles

1. **One system, many apps.** Flexibility across app categories outranks optimization for any single one. No category gets a bespoke design language.
2. **Tokens are the contract.** The token layer is the commitment; components and frameworks are interchangeable. Rebranding is a seed override, not a rebuild.
3. **Restraint over decoration.** No ornament for its own sake. Identity lives in precise details, not in effects.
4. **Dark-first, light as peer.** Both themes are real surfaces with real users, not a toggle afterthought.
5. **Finesse over bulk.** The system should read as considered and light, not heavy or AI-generated. This is the active refinement direction.

## Accessibility & Inclusion

No product-specific accessibility standard has been established yet. Default to standard web practice: keyboard focus on every interactive element via `:focus-visible` (the system already does this through `data-ds-focus`), semantic HTML, sufficient contrast on text. Refine as real apps surface real needs.
