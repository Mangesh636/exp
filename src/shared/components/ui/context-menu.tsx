"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { css, cx } from "../../../../styled-system/css";

import type * as React from "react";

import { ChevronRightIcon } from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

const popupStyle = css({
  position: "relative",
  display: "flex",
  transformOrigin: "var(--transform-origin)",
  borderWidth: "1px",
  borderRadius: "lg",
  backgroundColor: "var(--popover)",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
  outline: "none",
  "&:not([class*='w-'])": { minWidth: "8rem" },
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--radius-lg) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&:focus": { outline: "none" },
  ".dark &::before": {
    boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
  },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
});

const popupContentStyle = css({
  width: "100%",
  maxHeight: "var(--available-height)",
  overflowY: "auto",
  padding: "0.25rem",
});

const menuItemStyle = css({
  display: "flex",
  minHeight: "2rem",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "sm",
  paddingInline: "0.5rem",
  paddingBlock: "0.25rem",
  color: "var(--foreground)",
  fontSize: "base",
  outline: "none",
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": {
    backgroundColor: "var(--accent)",
    color: "var(--accent-foreground)",
  },
  "&[data-inset]": { paddingInlineStart: "2rem" },
  "&[data-variant='destructive']": { color: "var(--destructive-foreground)" },
  "& > svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& > svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& > svg": { pointerEvents: "none", marginInline: "-0.125rem", flexShrink: 0 },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", fontSize: "sm", "& > svg:not([class*='size-'])": { width: "1rem", height: "1rem" } },
});

const gridItemBase = css({
  display: "grid",
  minHeight: "2rem",
  cursor: "default",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "sm",
  paddingBlock: "0.25rem",
  paddingInlineStart: "0.5rem",
  color: "var(--foreground)",
  fontSize: "base",
  outline: "none",
  ":where([data-side='none']) &": { minWidth: "calc(var(--anchor-width) + 1.25rem)" },
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": {
    backgroundColor: "var(--accent)",
    color: "var(--accent-foreground)",
  },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", flexShrink: 0 },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", fontSize: "sm", "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" } },
});

const checkboxSwitchStyle = css({
  position: "relative",
  display: "inline-flex",
  height: "calc(var(--thumb-size) + 2px)",
  width: "calc(var(--thumb-size) * 2 - 2px)",
  flexShrink: 0,
  alignItems: "center",
  borderRadius: "full",
  padding: "1px",
  outline: "none",
  boxShadow: "inset 0 1px 0 color-mix(in srgb, black 4%, transparent)",
  transition: "background-color 200ms, box-shadow 200ms",
  "--thumb-size": "1rem",
  "&:focus-visible": { outline: "none", boxShadow: "0 0 0 2px var(--ring), 0 0 0 3px var(--background)" },
  "&[data-checked]": { backgroundColor: "var(--primary)" },
  "&[data-unchecked]": { backgroundColor: "var(--input)" },
  "&[data-disabled]": { opacity: 0.64 },
  "@media (min-width: 40rem)": { "--thumb-size": "0.75rem" },
});

const switchThumbStyle = css({
  pointerEvents: "none",
  display: "block",
  aspectRatio: "1",
  height: "100%",
  transformOrigin: "left center",
  borderRadius: "var(--thumb-size)",
  backgroundColor: "var(--background)",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  willChange: "transform",
  transition: "translate 150ms, border-radius 150ms, scale 100ms 100ms, transform-origin 150ms",
  ":where([data-slot='context-menu-checkbox-item'][data-checked]) &": {
    transformOrigin: "var(--thumb-size) 50%",
    translate: "calc(var(--thumb-size) - 4px) 0",
  },
  ":where([data-slot='context-menu-checkbox-item']:active:not([data-disabled])) &": {
    scale: "1.1 1",
    borderRadius: "var(--thumb-size) / calc(var(--thumb-size) * 1.1)",
  },
  ":where([dir='rtl']) &": { transformOrigin: "right center" },
  ":where([dir='rtl'] [data-slot='context-menu-checkbox-item'][data-checked]) &": {
    transformOrigin: "left center",
    translate: "calc((var(--thumb-size) - 4px) * -1) 0",
  },
});

export const ContextMenu: typeof ContextMenuPrimitive.Root =
  ContextMenuPrimitive.Root;

export const ContextMenuPortal: typeof ContextMenuPrimitive.Portal =
  ContextMenuPrimitive.Portal;

export function ContextMenuTrigger({
  className,
  children,
  ...props
}: ContextMenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <ContextMenuPrimitive.Trigger
      className={className}
      data-slot="context-menu-trigger"
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Trigger>
  );
}

export function ContextMenuPopup({
  children,
  className,
  sideOffset = 4,
  align = "center",
  alignOffset,
  side = "bottom",
  anchor,
  portalProps,
  ...props
}: ContextMenuPrimitive.Popup.Props & {
  align?: ContextMenuPrimitive.Positioner.Props["align"];
  sideOffset?: ContextMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ContextMenuPrimitive.Positioner.Props["alignOffset"];
  side?: ContextMenuPrimitive.Positioner.Props["side"];
  anchor?: ContextMenuPrimitive.Positioner.Props["anchor"];
  portalProps?: ContextMenuPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <ContextMenuPortal {...portalProps}>
      <ContextMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={css({ zIndex: 50 })}
        data-slot="context-menu-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          className={cx(popupStyle, className)}
          data-slot="context-menu-popup"
          {...props}
        >
          <div className={popupContentStyle}>{children}</div>
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPortal>
  );
}

export function ContextMenuGroup(
  props: ContextMenuPrimitive.Group.Props,
): React.ReactElement {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

export function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.ReactElement {
  return (
    <ContextMenuPrimitive.Item
      className={cx(menuItemStyle, className)}
      data-inset={inset}
      data-slot="context-menu-item"
      data-variant={variant}
      {...props}
    />
  );
}

export function ContextMenuLinkItem({
  className,
  inset,
  variant = "default",
  closeOnClick = true,
  ...props
}: ContextMenuPrimitive.LinkItem.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.ReactElement {
  return (
    <ContextMenuPrimitive.LinkItem
      className={cx(menuItemStyle, className)}
      closeOnClick={closeOnClick}
      data-inset={inset}
      data-slot="context-menu-link-item"
      data-variant={variant}
      {...props}
    />
  );
}

export function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  variant = "default",
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  variant?: "default" | "switch";
}): React.ReactElement {
  return (
    <ContextMenuPrimitive.CheckboxItem
      checked={checked}
      className={cx(gridItemBase, css({
        ...(variant === "switch"
          ? { gridTemplateColumns: "1fr auto", gap: "1rem", paddingInlineEnd: "0.375rem" }
          : { gridTemplateColumns: "0.75rem 1fr", paddingInlineEnd: "1rem" }),
      }), className)}
      data-slot="context-menu-checkbox-item"
      {...props}
    >
      {variant === "switch" ? (
        <>
          <span style={{ gridColumnStart: 1 }}>{children}</span>
          <ContextMenuPrimitive.CheckboxItemIndicator
            className={checkboxSwitchStyle}
            keepMounted
          >
            <span className={switchThumbStyle} />
          </ContextMenuPrimitive.CheckboxItemIndicator>
        </>
      ) : (
        <>
          <ContextMenuPrimitive.CheckboxItemIndicator className={css({ gridColumnStart: 1, marginInlineStart: "-0.125rem" })}>
            <svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
            </svg>
          </ContextMenuPrimitive.CheckboxItemIndicator>
          <span style={{ gridColumnStart: 2 }}>{children}</span>
        </>
      )}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

export function ContextMenuRadioGroup(
  props: ContextMenuPrimitive.RadioGroup.Props,
): React.ReactElement {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ContextMenuPrimitive.RadioItem.Props): React.ReactElement {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cx(gridItemBase, css({ gridTemplateColumns: "0.75rem 1fr", paddingInlineEnd: "1rem" }), className)}
      data-slot="context-menu-radio-item"
      {...props}
    >
      <ContextMenuPrimitive.RadioItemIndicator className={css({ gridColumnStart: 1, marginInlineStart: "-0.125rem" })}>
        <svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      </ContextMenuPrimitive.RadioItemIndicator>
      <span style={{ gridColumnStart: 2 }}>{children}</span>
    </ContextMenuPrimitive.RadioItem>
  );
}

export function ContextMenuGroupLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <ContextMenuPrimitive.GroupLabel
      className={cx(css({
        paddingInline: "0.5rem",
        paddingBlock: "0.375rem",
        fontWeight: "medium",
        color: "var(--muted-foreground)",
        fontSize: "xs",
        "&[data-inset]": { paddingInlineStart: "2.25rem" },
        "@media (min-width: 40rem)": { "&[data-inset]": { paddingInlineStart: "2rem" } },
      }), className)}
      data-inset={inset}
      data-slot="context-menu-label"
      {...props}
    />
  );
}

export function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props): React.ReactElement {
  return (
    <ContextMenuPrimitive.Separator
      className={cx(css({ marginInline: "0.5rem", marginBlock: "0.25rem", height: "1px", backgroundColor: "var(--border)" }), className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
}

export function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cx(css({
        marginInlineStart: "auto",
        fontWeight: "medium",
        fontFamily: "var(--font-sans)",
        color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)",
        fontSize: "xs",
        letterSpacing: "0.1em",
      }), className)}
      data-slot="context-menu-shortcut"
      {...props}
    />
  );
}

export function ContextMenuSub(
  props: ContextMenuPrimitive.SubmenuRoot.Props,
): React.ReactElement {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />;
}

export function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      className={cx(menuItemStyle, css({
        "&[data-popup-open]": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
        "& > svg:not(:last-child)": { marginInline: "-0.125rem" },
      }), className)}
      data-inset={inset}
      data-slot="context-menu-sub-trigger"
      {...props}
    >
      {children}
      <Icon icon={ChevronRightIcon} className={css({ marginInlineStart: "auto", marginInlineEnd: "-0.125rem", opacity: 0.8 })} />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

export function ContextMenuSubPopup({
  className,
  sideOffset = 0,
  alignOffset,
  align = "start",
  ...props
}: ContextMenuPrimitive.Popup.Props & {
  align?: ContextMenuPrimitive.Positioner.Props["align"];
  sideOffset?: ContextMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ContextMenuPrimitive.Positioner.Props["alignOffset"];
}): React.ReactElement {
  const defaultAlignOffset = align !== "center" ? -5 : undefined;

  return (
    <ContextMenuPopup
      align={align}
      alignOffset={alignOffset ?? defaultAlignOffset}
      className={className}
      data-slot="context-menu-sub-content"
      side="inline-end"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export { ContextMenuPrimitive };
