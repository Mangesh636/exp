"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useRender } from "@base-ui/react/use-render";
import { cva, css, type RecipeVariantProps } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type * as React from "react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  UnfoldMoreIcon,
} from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;

export const selectTriggerVariants = cva({
  base: {
    position: "relative", display: "inline-flex", minH: "9", w: "full", minW: "36",
    userSelect: "none", alignItems: "center", justifyContent: "space-between", gap: "2",
    rounded: "lg", borderWidth: "1px", borderColor: "input", bg: "background", backgroundClip: "padding-box",
    px: "calc(0.75rem - 1px)", textAlign: "left", fontSize: "md", color: "foreground",
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)", outline: "none",
    transition: "box-shadow 150ms",
    _before: { content: '""', pointerEvents: "none", position: "absolute", inset: "0", rounded: "calc(var(--radius-lg) - 1px)", boxShadow: "0 1px rgb(0 0 0 / 4%)" },
    _focusVisible: { borderColor: "ring", boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)" },
    "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
    "&[aria-invalid]": { borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)" },
    "&:focus-visible[aria-invalid]": { borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)", boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)" },
    "& svg:not([class*='opacity-'])": { opacity: 0.8 },
    "& svg:not([class*='size-'])": { w: "4.5", h: "4.5" },
    "& svg": { pointerEvents: "none", flexShrink: 0 },
    "@media (pointer: coarse)": { _after: { content: '""', position: "absolute", w: "full", h: "full", minH: "11" } },
    "@media (min-width: 640px)": { minH: "8", fontSize: "sm", "& svg:not([class*='size-'])": { w: "4", h: "4" } },
    "&:is([data-disabled],:focus-visible,[aria-invalid],[data-pressed])": { boxShadow: "none" },
    "&:not([data-disabled]):not(:focus-visible):not([aria-invalid]):not([data-pressed])::before": { boxShadow: "0 1px rgb(0 0 0 / 4%)" },
    _dark: { bg: "color-mix(in srgb, var(--input) 32%, transparent)", backgroundClip: "border-box", "&:not([data-disabled]):not(:focus-visible):not([aria-invalid]):not([data-pressed])::before": { boxShadow: "0 -1px rgb(255 255 255 / 6%)" }, "&[aria-invalid]": { boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)" } },
  },
  variants: {
    size: {
      default: {},
      lg: { minH: "10", "@media (min-width: 640px)": { minH: "9" } },
      sm: { minH: "8", gap: "1.5", px: "calc(0.625rem - 1px)", "@media (min-width: 640px)": { minH: "7" } },
    },
  },
  defaultVariants: { size: "default" },
});

export const selectTriggerIconClassName = css({ marginInlineEnd: "-0.25rem", w: "4.5", h: "4.5", opacity: 0.8, "@media (min-width: 640px)": { w: "4", h: "4" } });

export interface SelectButtonProps extends useRender.ComponentProps<"button"> {
  size?: RecipeVariantProps<typeof selectTriggerVariants>["size"];
}

export function SelectButton({ className, size, render, children, ...props }: SelectButtonProps): React.ReactElement {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] = render ? undefined : "button";
  const defaultProps = {
    children: <><span className={css({ flex: "1", truncate: true, "&[data-placeholder]": { color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)" } })}>{children}</span><Icon icon={UnfoldMoreIcon} className={selectTriggerIconClassName} /></>,
    className: cx(selectTriggerVariants({ size }), css({ minW: "0" }), className),
    "data-slot": "select-button",
    type: typeValue,
  };
  return useRender({ defaultTagName: "button", props: mergeProps<"button">(defaultProps, props), render });
}

export function SelectTrigger({ className, size = "default", children, ...props }: SelectPrimitive.Trigger.Props & RecipeVariantProps<typeof selectTriggerVariants>): React.ReactElement {
  return <SelectPrimitive.Trigger className={cx(selectTriggerVariants({ size }), className)} data-slot="select-trigger" {...props}>{children}<SelectPrimitive.Icon data-slot="select-icon"><Icon icon={UnfoldMoreIcon} className={selectTriggerIconClassName} /></SelectPrimitive.Icon></SelectPrimitive.Trigger>;
}

export function SelectValue({ className, ...props }: SelectPrimitive.Value.Props): React.ReactElement {
  return <SelectPrimitive.Value className={cx(css({ flex: "1", minW: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", "&[data-placeholder]": { color: "muted.foreground" } }), className)} data-slot="select-value" {...props} />;
}

export function SelectPopup({ className, children, side = "bottom", sideOffset = 4, align = "start", alignOffset = 0, alignItemWithTrigger = true, anchor, portalProps, ...props }: SelectPrimitive.Popup.Props & {
  portalProps?: SelectPrimitive.Portal.Props;
  side?: SelectPrimitive.Positioner.Props["side"];
  sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
  align?: SelectPrimitive.Positioner.Props["align"];
  alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
  alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
  anchor?: SelectPrimitive.Positioner.Props["anchor"];
}): React.ReactElement {
  return <SelectPrimitive.Portal {...portalProps}>
    <SelectPrimitive.Positioner align={align} alignItemWithTrigger={alignItemWithTrigger} alignOffset={alignOffset} anchor={anchor} className={css({ zIndex: "50", userSelect: "none" })} data-slot="select-positioner" side={side} sideOffset={sideOffset}>
      <SelectPrimitive.Popup className={css({ transformOrigin: "var(--transform-origin)", color: "foreground", outline: "none" })} data-slot="select-popup" {...props}>
        <SelectPrimitive.ScrollUpArrow className={css({ position: "relative", top: "0", zIndex: "50", display: "flex", h: "6", w: "full", cursor: "default", alignItems: "center", justifyContent: "center", _before: { content: '""', pointerEvents: "none", position: "absolute", insetInline: "1px", top: "1px", h: "200%", borderTopLeftRadius: "calc(var(--radius-lg) - 1px)", borderTopRightRadius: "calc(var(--radius-lg) - 1px)", background: "linear-gradient(to bottom, var(--popover) 50%, transparent)" } })} data-slot="select-scroll-up-arrow"><Icon icon={ChevronUpIcon} className={css({ position: "relative", w: "4.5", h: "4.5", "@media (min-width: 640px)": { w: "4", h: "4" } })} /></SelectPrimitive.ScrollUpArrow>
        <div className={css({ position: "relative", h: "full", minW: "var(--anchor-width)", rounded: "lg", borderWidth: "1px", bg: "popover", backgroundClip: "padding-box", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)", _before: { content: '""', pointerEvents: "none", position: "absolute", inset: "0", rounded: "calc(var(--radius-lg) - 1px)", boxShadow: "0 1px rgb(0 0 0 / 4%)" }, _dark: { _before: { boxShadow: "0 -1px rgb(255 255 255 / 6%)" } } })}>
          <SelectPrimitive.List className={cx(css({ maxH: "var(--available-height)", overflowY: "auto", p: "1" }), className)} data-slot="select-list">{children}</SelectPrimitive.List>
        </div>
        <SelectPrimitive.ScrollDownArrow className={css({ position: "relative", bottom: "0", zIndex: "50", display: "flex", h: "6", w: "full", cursor: "default", alignItems: "center", justifyContent: "center", _before: { content: '""', pointerEvents: "none", position: "absolute", insetX: "1px", bottom: "1px", h: "200%", borderBottomLeftRadius: "calc(var(--radius-lg) - 1px)", borderBottomRightRadius: "calc(var(--radius-lg) - 1px)", background: "linear-gradient(to top, var(--popover) 50%, transparent)" } })} data-slot="select-scroll-down-arrow"><Icon icon={ChevronDownIcon} className={css({ position: "relative", w: "4.5", h: "4.5", "@media (min-width: 640px)": { w: "4", h: "4" } })} /></SelectPrimitive.ScrollDownArrow>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>;
}

export function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props): React.ReactElement {
  return <SelectPrimitive.Item className={cx(css({ display: "grid", minH: "8", cursor: "default", gridTemplateColumns: "1rem minmax(0, 1fr)", alignItems: "center", gap: "2", rounded: "sm", py: "1", ps: "2", pe: "4", fontSize: "md", outline: "none", "&[data-side=none]": { minW: "calc(var(--anchor-width) + 1.25rem)" }, "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 }, "&[data-highlighted]": { bg: "accent", color: "accent.foreground" }, "& svg:not([class*='size-'])": { w: "4.5", h: "4.5" }, "& svg": { pointerEvents: "none", flexShrink: 0 }, "@media (min-width: 640px)": { minH: "7", fontSize: "sm", "& svg:not([class*='size-'])": { w: "4", h: "4" } } }), className)} data-slot="select-item" {...props}>
    <SelectPrimitive.ItemIndicator className={css({ gridColumn: "1" })}><svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5.252 12.7 10.2 18.63 18.748 5.37" /></svg></SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText className={css({ gridColumn: "2", minW: "0", overflowWrap: "anywhere" })}>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>;
}

export function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props): React.ReactElement {
  return <SelectPrimitive.Separator className={cx(css({ mx: "2", my: "1", h: "1px", bg: "border" }), className)} data-slot="select-separator" {...props} />;
}

export function SelectGroup(props: SelectPrimitive.Group.Props): React.ReactElement {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectLabel({ className, ...props }: SelectPrimitive.Label.Props): React.ReactElement {
  return <SelectPrimitive.Label className={cx(css({ display: "inline-flex", cursor: "default", alignItems: "center", gap: "2", mb: "2", fontWeight: "medium", color: "foreground", fontSize: "md", lineHeight: "4.5", "&:where(:not([data-slot=field] *))": { mb: "2" }, "@media (min-width: 640px)": { fontSize: "sm", lineHeight: "4" } }), className)} data-slot="select-label" {...props} />;
}

export function SelectGroupLabel(props: SelectPrimitive.GroupLabel.Props): React.ReactElement {
  return <SelectPrimitive.GroupLabel className={css({ px: "2", py: "1.5", fontWeight: "medium", color: "muted.foreground", fontSize: "xs" })} data-slot="select-group-label" {...props} />;
}

export { SelectPrimitive, SelectPopup as SelectContent };
