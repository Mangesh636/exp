"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { css, cx } from "../../../../styled-system/css";
import * as React from "react";

import {
  Cancel01Icon,
  UnfoldMoreIcon,
} from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export const ComboboxContext: React.Context<{
  chipsRef: React.RefObject<Element | null> | null;
  multiple: boolean;
}> = React.createContext<{
  chipsRef: React.RefObject<Element | null> | null;
  multiple: boolean;
}>({
  chipsRef: null,
  multiple: false,
});

const chipsInputStyle = css({
  minWidth: "3rem",
  flex: "1",
  color: "var(--foreground)",
  fontSize: "base",
  outline: "none",
  ":where([data-slot='combobox-chip'] + &)": { paddingInlineStart: "0.125rem" },
  "@media (min-width: 40rem)": { fontSize: "sm" },
});

const inputGroupStyle = css({
  position: "relative",
  width: "100%",
  color: "var(--foreground)",
  "&:not(:has(> *.w-full))": { width: "fit-content" },
  "&:has(:disabled)": { opacity: 0.64 },
});

const startAddonStyle = css({
  pointerEvents: "none",
  position: "absolute",
  insetBlock: 0,
  insetInlineStart: "1px",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  paddingInlineStart: "calc(var(--spacing) * 3 - 1px)",
  opacity: 0.8,
  "&:has(+ [data-size='sm'])": { paddingInlineStart: "calc(var(--spacing) * 2.5 - 1px)" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "@media (min-width: 40rem)": {
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
  "& svg": { marginInline: "-0.125rem" },
});

const inputStartAddonStyle = css({
  "& [data-slot='input']": { paddingInlineStart: "calc(var(--spacing) * 8.5 - 1px)" },
  "&[data-size='sm'] [data-slot='input']": { paddingInlineStart: "calc(var(--spacing) * 7.5 - 1px)" },
  "@media (min-width: 40rem)": {
    "& [data-slot='input']": { paddingInlineStart: "calc(var(--spacing) * 8 - 1px)" },
    "&[data-size='sm'] [data-slot='input']": { paddingInlineStart: "calc(var(--spacing) * 7 - 1px)" },
  },
});

const inputEndAddonStyle = css({
  "&:has(+ [data-slot='combobox-trigger'], + [data-slot='combobox-clear']) [data-slot='input']": {
    paddingInlineEnd: "1.75rem",
  },
  "&[data-size='sm']:has(+ [data-slot='combobox-trigger'], + [data-slot='combobox-clear']) [data-slot='input']": {
    paddingInlineEnd: "1.625rem",
  },
});

const actionStyle = css({
  position: "absolute",
  top: "50%",
  display: "inline-flex",
  width: "2rem",
  height: "2rem",
  flexShrink: 0,
  transform: "translateY(-50%)",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "1px",
  borderColor: "transparent",
  borderRadius: "md",
  opacity: 0.8,
  outline: "none",
  transitionProperty: "opacity",
  "&:hover": { opacity: 1 },
  "&:has(+ [data-slot='combobox-clear'])": { display: "none" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "@media (pointer: coarse)": {
    "&::after": { content: '""', position: "absolute", minWidth: "44px", minHeight: "44px" },
  },
  "@media (min-width: 40rem)": {
    width: "1.75rem",
    height: "1.75rem",
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
  "& svg": { pointerEvents: "none", flexShrink: 0 },
});

const popupSurfaceStyle = css({
  position: "relative",
  display: "flex",
  maxHeight: "100%",
  minWidth: "var(--anchor-width)",
  maxWidth: "var(--available-width)",
  transformOrigin: "var(--transform-origin)",
  borderRadius: "lg",
  borderWidth: "1px",
  backgroundColor: "var(--popover)",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
  transitionProperty: "scale, opacity",
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--radius-lg) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
  ".dark &::before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" },
});

const popupContentStyle = css({
  display: "flex",
  maxHeight: "min(var(--available-height), 23rem)",
  flex: 1,
  flexDirection: "column",
  color: "var(--foreground)",
});

const itemStyle = css({
  display: "grid",
  minHeight: "2rem",
  cursor: "default",
  gridTemplateColumns: "1rem minmax(0, 1fr)",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "sm",
  paddingBlock: "0.25rem",
  paddingInlineStart: "0.5rem",
  paddingInlineEnd: "1rem",
  fontSize: "base",
  outline: "none",
  ":where([data-side='none']) &": { minWidth: "calc(var(--anchor-width) + 1.25rem)" },
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    minHeight: "1.75rem",
    fontSize: "sm",
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

const listStyle = css({
  "&:not(:empty)": { scrollPaddingBlock: "0.25rem", padding: "0.25rem" },
  ":where([data-has-overflow-y]) &": { paddingInlineEnd: "0.75rem" },
});

const chipsStyle = css({
  position: "relative",
  display: "inline-flex",
  minHeight: "2.25rem",
  width: "100%",
  flexWrap: "wrap",
  gap: "0.25rem",
  borderWidth: "1px",
  borderColor: "var(--input)",
  borderRadius: "lg",
  backgroundColor: "var(--background)",
  padding: "calc(var(--spacing) * 1 - 1px)",
  color: "var(--foreground)",
  fontSize: "base",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  outline: "none",
  "--ring-color": "color-mix(in srgb, var(--ring) 24%, transparent)",
  "& > *": { minHeight: "1.75rem" },
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--radius-lg) - 1px)",
  },
  "&:not(:has(:disabled)):not(:focus-within):not([aria-invalid])::before": {
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&:focus-within": {
    borderColor: "var(--ring)",
    boxShadow: "0 0 0 3px var(--ring-color)",
  },
  "&:has(:disabled)": { pointerEvents: "none", opacity: 0.64 },
  "&:has([data-size='lg'])": { minHeight: "2.5rem" },
  "&:has([data-size='sm'])": { minHeight: "2rem" },
  "&:has([aria-invalid])": { borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)" },
  "&:has(:disabled, :focus-within, [aria-invalid])": { boxShadow: "none" },
  "&:focus-within:has([aria-invalid])": {
    borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)",
  },
  "&:has([data-size='lg']) > *": { minHeight: "2rem" },
  "&:has([data-size='sm']) > *": { minHeight: "1.5rem" },
  "@media (min-width: 40rem)": {
    minHeight: "2rem",
    fontSize: "sm",
    "&:has([data-size='lg'])": { minHeight: "2.25rem" },
    "&:has([data-size='sm'])": { minHeight: "1.75rem" },
    "& > *": { minHeight: "1.5rem" },
    "&:has([data-size='lg']) > *": { minHeight: "1.75rem" },
    "&:has([data-size='sm']) > *": { minHeight: "1.25rem" },
  },
  ".dark &": {
    "&:not(:has(:disabled))": { backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)" },
    "&:not(:has(:disabled)):not(:focus-within):not([aria-invalid])::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
    "&:has([aria-invalid])": {
      "--ring-color": "color-mix(in srgb, var(--destructive) 24%, transparent)",
    },
  },
});

const chipsAddonStyle = css({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  paddingInlineStart: "0.5rem",
  opacity: 0.8,
  "&:has(~ [data-size='sm'] + [data-slot='combobox-chip'])": { paddingInlineEnd: "0.375rem", paddingInlineStart: "0.375rem" },
  "&:has(+ [data-slot='combobox-chip'])": { paddingInlineEnd: "0.5rem" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "@media (min-width: 40rem)": {
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
  "& svg": { pointerEvents: "none", marginInlineStart: "-0.125rem", marginInlineEnd: "-0.375rem" },
});

const chipStyle = css({
  display: "flex",
  alignItems: "center",
  borderRadius: "calc(var(--radius-md) - 1px)",
  backgroundColor: "var(--accent)",
  paddingInlineStart: "0.5rem",
  fontWeight: "medium",
  color: "var(--accent-foreground)",
  fontSize: "sm",
  outline: "none",
  "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  "@media (min-width: 40rem)": {
    fontSize: "xs",
    lineHeight: "var(--text-xs--line-height)",
    "& svg:not([class*='size-'])": { width: "0.875rem", height: "0.875rem" },
  },
});

const chipRemoveStyle = css({
  height: "100%",
  flexShrink: 0,
  cursor: "pointer",
  paddingInline: "0.375rem",
  opacity: 0.8,
  "&:hover": { opacity: 1 },
  "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  "@media (min-width: 40rem)": { "& svg:not([class*='size-'])": { width: "0.875rem", height: "0.875rem" } },
});

export function Combobox<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
>(
  props: ComboboxPrimitive.Root.Props<Value, Multiple, Item>,
): React.ReactElement {
  const chipsRef = React.useRef<Element | null>(null);
  return (
    <ComboboxContext.Provider value={{ chipsRef, multiple: !!props.multiple }}>
      <ComboboxPrimitive.Root {...props} />
    </ComboboxContext.Provider>
  );
}

export function ComboboxChipsInput({
  className,
  size,
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
}): React.ReactElement {
  const sizeValue = (size ?? "default") as "sm" | "default" | "lg" | number;
  return (
    <ComboboxPrimitive.Input
      className={cx(chipsInputStyle, sizeValue === "sm" ? css({ paddingInlineStart: "0.375rem" }) : css({ paddingInlineStart: "0.5rem" }), className)}
      data-size={typeof sizeValue === "string" ? sizeValue : undefined}
      data-slot="combobox-chips-input"
      size={typeof sizeValue === "number" ? sizeValue : undefined}
      {...props}
    />
  );
}

export function ComboboxInput({
  className,
  showTrigger = true,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: React.ReactNode;
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
  triggerProps?: ComboboxPrimitive.Trigger.Props;
  clearProps?: ComboboxPrimitive.Clear.Props;
}): React.ReactElement {
  const sizeValue = (size ?? "default") as "sm" | "default" | "lg" | number;
  return (
    <ComboboxPrimitive.InputGroup className={inputGroupStyle} data-slot="combobox-input-group">
      {startAddon && (
        <div aria-hidden="true" className={startAddonStyle} data-slot="combobox-start-addon">
          {startAddon}
        </div>
      )}
      <ComboboxPrimitive.Input
        className={cx(
          startAddon ? inputStartAddonStyle : undefined,
          inputEndAddonStyle,
          className,
        )}
        data-slot="combobox-input"
        render={<Input className={css({ "&:has(:disabled)": { opacity: 1 } })} nativeInput size={sizeValue} />}
        {...props}
      />
      {showTrigger && (
        <ComboboxTrigger
          className={cx(actionStyle, css({ insetInlineEnd: sizeValue === "sm" ? 0 : "0.125rem" }))}
          {...triggerProps}
        >
          <ComboboxPrimitive.Icon data-slot="combobox-icon">
            <Icon icon={UnfoldMoreIcon} />
          </ComboboxPrimitive.Icon>
        </ComboboxTrigger>
      )}
      {showClear && (
        <ComboboxClear
          className={cx(actionStyle, css({ insetInlineEnd: sizeValue === "sm" ? 0 : "0.125rem" }))}
          {...clearProps}
        >
          <Icon icon={Cancel01Icon} />
        </ComboboxClear>
      )}
    </ComboboxPrimitive.InputGroup>
  );
}

export function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Trigger className={className} data-slot="combobox-trigger" {...props}>
      {children}
    </ComboboxPrimitive.Trigger>
  );
}

export function ComboboxPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  alignOffset,
  align = "start",
  anchor: anchorProp,
  portalProps,
  ...props
}: ComboboxPrimitive.Popup.Props & {
  align?: ComboboxPrimitive.Positioner.Props["align"];
  sideOffset?: ComboboxPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ComboboxPrimitive.Positioner.Props["alignOffset"];
  side?: ComboboxPrimitive.Positioner.Props["side"];
  anchor?: ComboboxPrimitive.Positioner.Props["anchor"];
  portalProps?: ComboboxPrimitive.Portal.Props;
}): React.ReactElement {
  const { chipsRef } = React.useContext(ComboboxContext);
  const anchor = anchorProp ?? chipsRef;
  return (
    <ComboboxPrimitive.Portal {...portalProps}>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={css({ zIndex: 50, userSelect: "none" })}
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <span className={cx(popupSurfaceStyle, className)}>
          <ComboboxPrimitive.Popup className={popupContentStyle} data-slot="combobox-popup" {...props}>
            {children}
          </ComboboxPrimitive.Popup>
        </span>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Item className={cx(itemStyle, className)} data-slot="combobox-item" {...props}>
      <ComboboxPrimitive.ItemIndicator className={css({ gridColumnStart: 1 })}>
        <svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      </ComboboxPrimitive.ItemIndicator>
      <div className={css({ gridColumnStart: 2, minWidth: 0, overflowWrap: "anywhere" })}>{children}</div>
    </ComboboxPrimitive.Item>
  );
}

export function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Separator
      className={cx(css({ marginInline: "0.5rem", marginBlock: "0.25rem", height: "1px", backgroundColor: "var(--border)", "&:last-child": { display: "none" } }), className)}
      data-slot="combobox-separator"
      {...props}
    />
  );
}

export function ComboboxGroup({
  className,
  ...props
}: ComboboxPrimitive.Group.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Group
      className={cx(css({ "[[role=group] + &]": { marginTop: "0.375rem" } }), className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

export function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cx(css({ paddingInline: "0.5rem", paddingBlock: "0.375rem", fontWeight: "medium", color: "var(--muted-foreground)", fontSize: "xs" }), className)}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

export function ComboboxEmpty({
  className,
  ...props
}: ComboboxPrimitive.Empty.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Empty
      className={cx(css({ "&:not(:empty)": { padding: "0.5rem", textAlign: "center", color: "var(--muted-foreground)", fontSize: "base" }, "@media (min-width: 40rem)": { "&:not(:empty)": { fontSize: "sm" } } }), className)}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

export function ComboboxRow({
  className,
  ...props
}: ComboboxPrimitive.Row.Props): React.ReactElement {
  return <ComboboxPrimitive.Row className={className} data-slot="combobox-row" {...props} />;
}

export const ComboboxValue: typeof ComboboxPrimitive.Value = ComboboxPrimitive.Value;

export function ComboboxList({
  className,
  ...props
}: ComboboxPrimitive.List.Props): React.ReactElement {
  return (
    <ScrollArea overscrollContain scrollbarGutter scrollFade>
      <ComboboxPrimitive.List className={cx(listStyle, className)} data-slot="combobox-list" {...props} />
    </ScrollArea>
  );
}

export function ComboboxClear({
  className,
  ...props
}: ComboboxPrimitive.Clear.Props): React.ReactElement {
  return <ComboboxPrimitive.Clear className={className} data-slot="combobox-clear" {...props} />;
}

export function ComboboxStatus({
  className,
  ...props
}: ComboboxPrimitive.Status.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Status
      className={cx(css({ paddingInline: "0.75rem", paddingBlock: "0.5rem", fontWeight: "medium", color: "var(--muted-foreground)", fontSize: "xs", "&:empty": { margin: 0, padding: 0 } }), className)}
      data-slot="combobox-status"
      {...props}
    />
  );
}

export const ComboboxCollection: typeof ComboboxPrimitive.Collection = ComboboxPrimitive.Collection;

export function ComboboxChips({
  className,
  children,
  startAddon,
  ...props
}: ComboboxPrimitive.Chips.Props & {
  startAddon?: React.ReactNode;
}): React.ReactElement {
  const { chipsRef } = React.useContext(ComboboxContext);
  return (
    <ComboboxPrimitive.Chips
      className={cx(chipsStyle, className)}
      data-slot="combobox-chips"
      ref={chipsRef as React.Ref<HTMLDivElement> | null}
      {...props}
    >
      {startAddon && (
        <div aria-hidden="true" className={chipsAddonStyle} data-slot="combobox-start-addon">
          {startAddon}
        </div>
      )}
      {children}
    </ComboboxPrimitive.Chips>
  );
}

export function ComboboxChip({
  children,
  removeProps,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  removeProps?: ComboboxPrimitive.ChipRemove.Props;
}): React.ReactElement {
  return (
    <ComboboxPrimitive.Chip className={chipStyle} data-slot="combobox-chip" {...props}>
      {children}
      <ComboboxChipRemove {...removeProps} />
    </ComboboxPrimitive.Chip>
  );
}

export function ComboboxChipRemove(
  props: ComboboxPrimitive.ChipRemove.Props,
): React.ReactElement {
  return (
    <ComboboxPrimitive.ChipRemove className={chipRemoveStyle} data-slot="combobox-chip-remove" {...props}>
      <Icon icon={Cancel01Icon} />
    </ComboboxPrimitive.ChipRemove>
  );
}

export const createComboboxItems: typeof ComboboxPrimitive.createItems = ComboboxPrimitive.createItems;

export const useComboboxFilter: typeof ComboboxPrimitive.useFilter = ComboboxPrimitive.useFilter;

export { ComboboxPrimitive };
