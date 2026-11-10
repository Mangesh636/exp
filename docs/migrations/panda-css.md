# Tailwind to Panda CSS migration

Working branch: `codex/panda-css-migration`

## Milestone acceptance criteria

- [x] All 54 styled shared UI components have been migrated to Panda CSS; the remaining 2 were audited as having no Tailwind styling to migrate. Preserve existing component APIs and visual behavior.
- [x] All CVA-based component variants are represented as Panda recipes.
- [x] Global tokens, light/dark themes, and base styles are owned by Panda global styles; custom keyframes remain as standard CSS in `globals.css`.
- [x] App-level Tailwind utilities migrated from the root layout and starter page; no other app-level Tailwind styling was found in the source tree.
- [x] Tailwind directives and Turbopack integration removed; Tailwind packages removed from `package.json`. Regenerate `pnpm-lock.yaml` locally and confirm no third-party dependency expects Tailwind.
- [x] Panda's required cascade-layer order is declared in `src/app/globals.css`; `styled-system` is explicitly included by TypeScript.
- [x] `apps/design-system` provides a shadcn-style component gallery with live previews for all 56 shared UI components, representative variants and states, and copyable implementation examples.
- [ ] Re-run Panda codegen, Biome, TypeScript, and production build locally after adding the design-system gallery; resolve any errors.
- [ ] Review visual parity in light and dark themes at responsive breakpoints.

- CVA audit completed against the original `main` branch: all eight original CVA implementations (`alert`, `badge`, `button`, `empty`, `group`, `input-group`, `select`, and `toggle`) are represented with Panda `cva` recipes on this branch. `toggle-group`, pagination, and toast reuse the Toggle/Button recipe APIs rather than defining duplicate recipes. User reported clean Panda codegen, Biome, TypeScript, and production build checks before the gallery was added; rerun those checks against the new gallery. Responsive light/dark visual parity remains pending.

- Design-system gallery added under `apps/design-system` and exposed at `/design-system`. It renders live shared components rather than placeholder replicas, covers all 56 inventory entries across foundations, forms, feedback, layout, navigation, composite controls, overlays, and utilities, and provides copyable example snippets. The route and gallery files are in place; codegen, lint, TypeScript, production build, and visual checks must be rerun after these additions.

## Component inventory

### Migrated to Panda CSS (54 implementations; parity still needs local validation)

- [x] `accordion.tsx`
- [x] `alert-dialog.tsx`
- [x] `alert.tsx`
- [x] `autocomplete.tsx`
- [x] `avatar.tsx`
- [x] `badge.tsx`
- [x] `breadcrumb.tsx`
- [x] `button.tsx`
- [x] `calendar.tsx`
- [x] `card.tsx`
- [x] `checkbox-group.tsx`
- [x] `checkbox.tsx`
- [x] `collapsible.tsx`
- [x] `combobox.tsx`
- [x] `command.tsx`
- [x] `composer.tsx`
- [x] `context-menu.tsx`
- [x] `dialog.tsx`
- [x] `drawer.tsx`
- [x] `empty.tsx`
- [x] `field.tsx`
- [x] `fieldset.tsx`
- [x] `frame.tsx`
- [x] `group.tsx`
- [x] `input-group.tsx`
- [x] `input.tsx`
- [x] `kbd.tsx`
- [x] `label.tsx`
- [x] `menu.tsx`
- [x] `meter.tsx`
- [x] `number-field.tsx`
- [x] `otp-field.tsx`
- [x] `pagination.tsx`
- [x] `popover.tsx`
- [x] `preview-card.tsx`
- [x] `progress.tsx`
- [x] `radio-group.tsx`
- [x] `scroll-area.tsx`
- [x] `segmented-control.tsx`
- [x] `select.tsx`
- [x] `separator.tsx`
- [x] `sheet.tsx`
- [x] `skeleton.tsx`
- [x] `slider.tsx`
- [x] `spinner.tsx`
- [x] `switch.tsx`
- [x] `table.tsx`
- [x] `tabs.tsx`
- [x] `textarea.tsx`
- [x] `toast.tsx`
- [x] `toggle-group.tsx`
- [x] `toggle.tsx`
- [x] `toolbar.tsx`
- [x] `tooltip.tsx`

### Audited; no Tailwind styling to migrate (2)
- [x] `form.tsx` (passes through caller-provided className; contains no Tailwind utilities)
- [x] `icon.tsx` (icon wrapper has no Tailwind utilities or component styling)

### Remaining

- None. All 54 styled components have been migrated; 2 additional components were audited as already Tailwind-free.

## Current implementation notes

- Panda CSS config and PostCSS integration were already present on `main`; this migration extends the extraction include paths to cover `apps/**`. The Next.js App Router setup uses `@pandacss/dev/postcss`, the `prepare: panda codegen` script, the documented CSS layer order, and a `styled-system` TypeScript include.
- Tailwind dependencies and the Tailwind Turbopack loader have been removed from `package.json` and `next.config.ts`. The lockfile still needs regeneration with pnpm.
- TypeScript check: user reports `pnpm exec tsc --noEmit` completes with no errors before the latest global-style and app-page changes. Re-run after Panda codegen and lockfile regeneration; lint, production build, and light/dark visual checks are also pending.
- The design-system showcase is intentionally deferred until the component migration and token layer are stable, so it documents the real shared components rather than parallel or placeholder implementations.
- Batch completed: `combobox.tsx`, `command.tsx`, and `context-menu.tsx` now use Panda `css`/`cx`; public exports and Base UI primitive composition were retained. These are implementation-complete only and still require generated-CSS, type, and visual parity checks.

- Batch completed: `composer.tsx`, `dialog.tsx`, and `drawer.tsx` now use Panda `css`/`cx`. Composer editor hooks, content-editable/token portal behavior, Base UI dialog/drawer primitives, virtual-keyboard provider, swipe directions, nested drawer transforms, safe-area handling, and menu item APIs were retained in the conversion. These are implementation-complete only; generated CSS, type, runtime interaction, and visual parity checks remain pending.

- Batch audited: `form.tsx` and `icon.tsx` already contain no Tailwind utility styling, so their APIs and implementation were intentionally left unchanged. `group.tsx` was converted to Panda recipes and `css`/`cx`; orientation variants, joined-control borders, focus layering, separator focus behavior, dark-mode styling, and existing exports were retained. Generated-CSS, type, and visual parity checks remain pending.

- Batch completed: `input-group.tsx`, `menu.tsx`, and `number-field.tsx` now use Panda CSS `css`/`cva`/`cx` styling. Existing component APIs, Base UI primitive composition, input focus-on-addon behavior, menu submenu/checkbox/radio/switch interactions, number-field sizing and scrub-area accessibility were retained. Generated-CSS, type, runtime interaction, and visual parity checks remain pending.

- Batch completed: `otp-field.tsx`, `pagination.tsx`, and `popover.tsx` now use Panda CSS `css`/`cx`. OTP sizing, disabled/focus/invalid states, pagination's button recipe variants and responsive previous/next controls, and Popover positioning, animation states, tooltip styling, calendar viewport behavior, and public Base UI APIs were retained. Generated-CSS, type, runtime, and visual parity checks remain pending.

- Batch completed: `preview-card.tsx`, `scroll-area.tsx`, and `segmented-control.tsx` now use Panda CSS `css`/`cx`. Preview-card positioning, popup animation and light/dark surface; Scroll Area overflow, conditional overscroll/gutter, fade masks and scrollbar interactions; and Segmented Control sizing, active states, animated indicator measurement/observers and public class-name exports were retained in the conversion. Generated-CSS, type, runtime, and visual parity checks remain pending.

- Batch completed: `select.tsx`, `sheet.tsx`, and `slider.tsx` now use Panda CSS `css`/`cx`/`cva`. Select trigger sizing, popup positioning, scrolling arrows, item states and public exports; Sheet side/inset variants, backdrop and panel composition; and Slider orientation, multi-thumb rendering, focus and dragging states were retained. Generated-CSS, type, runtime interaction, and visual parity checks remain pending.

- Batch completed: `table.tsx`, `tabs.tsx`, and `textarea.tsx` now use Panda CSS `css`/`cx`. Table default/card variants, nested row/cell states, selected/hover treatments, checkbox alignment, and public render API; Tabs orientation, underline/default indicators, size context, and segmented-control shared class exports; and Textarea `unstyled`, size variants, field integration, focus/invalid/disabled states, and ref/value handling were retained. Generated-CSS, type, runtime, and visual parity checks remain pending.

- Batch completed: `toast.tsx`, `toggle-group.tsx`, and `toggle.tsx` now use Panda CSS `css`/`cx`/`cva`. Toast managers/providers, anchored and viewport rendering, placement, stacking, swipe/expand/exit transitions, replay feedback animations, icon/action rendering and public exports; Toggle size/outline variants, pointer-coarse hit targets, focus/pressed/disabled states; and Toggle Group orientation, joined borders, separator states, shared size/variant context and Base UI primitives were retained. Generated-CSS, type, runtime interaction, and visual parity checks remain pending.

- Final component batch completed: `toolbar.tsx` and `tooltip.tsx` now use Panda `css`/`cx`. Toolbar layout, group spacing, orientation-aware separators, and caller class-name overrides were retained. Tooltip positioning, popup surface, before-shadow treatment, instant/starting/ending states, viewport padding, and current/previous content transitions were translated to Panda selectors. Component migration inventory is complete; generated-CSS, type, runtime, and visual parity checks remain pending.

- Follow-up import/configuration update: all 54 Panda-styled UI components now import generated helpers through the explicit relative path `../../../../styled-system/css`, matching their location under `src/shared/components/ui`. `panda.config.ts` retains both required presets, `preflight: true`, an empty exclude list, `styled-system` output, and content globs covering `src`, `pages`, and `apps`; comments now explain the Next.js source scan. Local codegen and application validation are still required.

- TypeScript follow-up: added a shared `src/shared/lib/cx.ts` composer so Base UI state-aware `className` render functions are composed with Panda classes instead of being passed directly to Panda's string-only `cx`. Added typed Panda conditions for sibling, input-group, RTL, and active-label selectors; normalized dark-mode selectors; merged duplicate object keys; and corrected the touch-target `size` property. These fixes are committed, but local Panda codegen, TypeScript, lint, build, and visual checks are still pending.


- Global-style migration: moved the light/dark semantic color variables, font variables, spacing/radius aliases, and base element styles into Panda's `globalCss`; added the neutral palette and font tokens to the Panda theme. Removed Tailwind's `@import`, `@custom-variant`, `@theme`, and `@apply` directives from `src/app/globals.css`, retaining only the project's standard CSS keyframes. Replaced the remaining Tailwind utility classes on the root layout with global styles. This change follows Panda's documented `globalCss` and token configuration model; code generation and visual parity still require local verification.


- App-level migration: replaced the starter home page's Tailwind utilities with Panda `css` styles, including responsive and dark-mode variants. Removed the Tailwind Turbopack CSS loader and removed `tailwindcss`, `@tailwindcss/turbopack`, and `tw-animate-css` from `package.json`. The pnpm lockfile must be regenerated locally before install/build validation.
