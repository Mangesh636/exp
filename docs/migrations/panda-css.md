# Tailwind to Panda CSS migration

Working branch: `codex/panda-css-migration`

## Milestone acceptance criteria

- [ ] All 56 shared UI components use Panda CSS; preserve existing component APIs and visual behavior.
- [ ] All CVA-based component variants are represented as Panda recipes.
- [ ] Global tokens, light/dark themes, keyframes, and base styles are owned by Panda/CSS rather than Tailwind.
- [ ] App-level Tailwind utilities are migrated.
- [ ] Tailwind packages, directives, and Turbopack integration are removed only after no Tailwind usage remains.
- [ ] `apps/design-system` provides a shadcn-style component gallery with previews, variants, states, and copyable examples.
- [ ] Run Panda codegen, Biome, TypeScript, and production build locally; resolve all errors.
- [ ] Review visual parity in light and dark themes at responsive breakpoints.

## Component inventory

### Migrated to Panda CSS (46 implementations; parity still needs local validation)

- [x] `alert.tsx`
- [x] `badge.tsx`
- [x] `breadcrumb.tsx`
- [x] `button.tsx`
- [x] `checkbox.tsx`
- [x] `checkbox-group.tsx`
- [x] `card.tsx`
- [x] `alert-dialog.tsx`
- [x] `accordion.tsx`
- [x] `avatar.tsx`
- [x] `autocomplete.tsx`
- [x] `calendar.tsx`
- [x] `collapsible.tsx`
- [x] `empty.tsx`
- [x] `field.tsx`
- [x] `fieldset.tsx`
- [x] `frame.tsx`
- [x] `input.tsx`
- [x] `kbd.tsx`
- [x] `label.tsx`
- [x] `meter.tsx`
- [x] `progress.tsx`
- [x] `radio-group.tsx`
- [x] `separator.tsx`
- [x] `skeleton.tsx`
- [x] `spinner.tsx`
- [x] `switch.tsx`
- [x] `combobox.tsx`
- [x] `command.tsx`
- [x] `context-menu.tsx`
- [x] `composer.tsx`
- [x] `dialog.tsx`
- [x] `drawer.tsx`
- [x] `group.tsx`
- [x] `input-group.tsx`
- [x] `menu.tsx`
- [x] `number-field.tsx`
- [x] `otp-field.tsx`
- [x] `pagination.tsx`
- [x] `popover.tsx`
- [x] `preview-card.tsx`
- [x] `scroll-area.tsx`
- [x] `segmented-control.tsx`

### Audited; no Tailwind styling to migrate (2)

- [x] `form.tsx` (passes through caller-provided className; contains no Tailwind utilities)
- [x] `icon.tsx` (icon wrapper has no Tailwind utilities or component styling)

### Remaining (8)

- [ ] `table.tsx`
- [ ] `tabs.tsx`
- [ ] `textarea.tsx`
- [ ] `toast.tsx`
- [ ] `toggle-group.tsx`
- [ ] `toggle.tsx`
- [ ] `toolbar.tsx`
- [ ] `tooltip.tsx`

## Current implementation notes

- Panda CSS config and PostCSS integration were already present on `main`; this migration extends the extraction include paths to cover `apps/**`.
- Tailwind remains installed and active because components and global styles are still being migrated.
- The current branch cannot be considered complete until local code generation, type checking, linting, build, and light/dark visual checks pass.
- The design-system showcase is intentionally deferred until the component migration and token layer are stable, so it documents the real shared components rather than parallel or placeholder implementations.
- Batch completed: `combobox.tsx`, `command.tsx`, and `context-menu.tsx` now use Panda `css`/`cx`; public exports and Base UI primitive composition were retained. These are implementation-complete only and still require generated-CSS, type, and visual parity checks.

- Batch completed: `composer.tsx`, `dialog.tsx`, and `drawer.tsx` now use Panda `css`/`cx`. Composer editor hooks, content-editable/token portal behavior, Base UI dialog/drawer primitives, virtual-keyboard provider, swipe directions, nested drawer transforms, safe-area handling, and menu item APIs were retained in the conversion. These are implementation-complete only; generated CSS, type, runtime interaction, and visual parity checks remain pending.

- Batch audited: `form.tsx` and `icon.tsx` already contain no Tailwind utility styling, so their APIs and implementation were intentionally left unchanged. `group.tsx` was converted to Panda recipes and `css`/`cx`; orientation variants, joined-control borders, focus layering, separator focus behavior, dark-mode styling, and existing exports were retained. Generated-CSS, type, and visual parity checks remain pending.

- Batch completed: `input-group.tsx`, `menu.tsx`, and `number-field.tsx` now use Panda CSS `css`/`cva`/`cx` styling. Existing component APIs, Base UI primitive composition, input focus-on-addon behavior, menu submenu/checkbox/radio/switch interactions, number-field sizing and scrub-area accessibility were retained. Generated-CSS, type, runtime interaction, and visual parity checks remain pending.

- Batch completed: `otp-field.tsx`, `pagination.tsx`, and `popover.tsx` now use Panda CSS `css`/`cx`. OTP sizing, disabled/focus/invalid states, pagination's button recipe variants and responsive previous/next controls, and Popover positioning, animation states, tooltip styling, calendar viewport behavior, and public Base UI APIs were retained. Generated-CSS, type, runtime, and visual parity checks remain pending.

- Batch completed: `preview-card.tsx`, `scroll-area.tsx`, and `segmented-control.tsx` now use Panda CSS `css`/`cx`. Preview-card positioning, popup animation and light/dark surface; Scroll Area overflow, conditional overscroll/gutter, fade masks and scrollbar interactions; and Segmented Control sizing, active states, animated indicator measurement/observers and public class-name exports were retained in the conversion. Generated-CSS, type, runtime, and visual parity checks remain pending.

- Batch completed: `select.tsx`, `sheet.tsx`, and `slider.tsx` now use Panda CSS `css`/`cx`/`cva`. Select trigger sizing, popup positioning, scrolling arrows, item states and public exports; Sheet side/inset variants, backdrop and panel composition; and Slider orientation, multi-thumb rendering, focus and dragging states were retained. Generated-CSS, type, runtime interaction, and visual parity checks remain pending.
