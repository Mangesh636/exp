"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { css, cx } from "styled-system/css";

import type React from "react";

import {
  Cancel01Icon,
  UnfoldMoreIcon,
} from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export const Autocomplete: typeof AutocompletePrimitive.Root =
  AutocompletePrimitive.Root;

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
  "&:has(+ [data-size='sm'])": {
    paddingInlineStart: "calc(var(--spacing) * 2.5 - 1px)",
  },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "@media (min-width: 40rem)": {
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
  "& svg": { marginInline: "-0.125rem" },
});

const inputStartAddonStyle = css({
  "& [data-slot='autocomplete-input']": {
    paddingInlineStart: "calc(var(--spacing) * 8.5 - 1px)",
  },
  "&[data-size='sm'] [data-slot='autocomplete-input']": {
    paddingInlineStart: "calc(var(--spacing) * 7.5 - 1px)",
  },
  "@media (min-width: 40rem)": {
    "& [data-slot='autocomplete-input']": {
      paddingInlineStart: "calc(var(--spacing) * 8 - 1px)",
    },
    "&[data-size='sm'] [data-slot='autocomplete-input']": {
      paddingInlineStart: "calc(var(--spacing) * 7 - 1px)",
    },
  },
});

const inputEndAddonStyle = css({
  "&:has(+ [data-slot='autocomplete-trigger'], + [data-slot='autocomplete-clear']) [data-slot='autocomplete-input']": {
    paddingInlineEnd: "1.75rem",
  },
  "&[data-size='sm']:has(+ [data-slot='autocomplete-trigger'], + [data-slot='autocomplete-clear']) [data-slot='autocomplete-input']": {
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
  transitionProperty: "color, background-color, opacity",
  "&:hover": { opacity: 1 },
  "&:has(+ [data-slot='autocomplete-clear'])": { display: "none" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "@media (pointer: coarse)": {
    "&::after": {
      content: '""',
      position: "absolute",
      minWidth: "44px",
      minHeight: "44px",
    },
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
  ".dark &::before": {
    boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
  },
});

const popupContentStyle = css({
  display: "flex",
  maxHeight: "min(var(--available-height), 23rem)",
  flex: 1,
  flexDirection: "column",
  color: "var(--foreground)",
});

const itemStyle = css({
  display: "flex",
  minHeight: "2rem",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  borderRadius: "sm",
  paddingX: "0.5rem",
  paddingY: "0.25rem",
  fontSize: "base",
  outline: "none",
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": {
    backgroundColor: "var(--accent)",
    color: "var(--accent-foreground)",
  },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", fontSize: "sm" },
});

export function AutocompleteInput({
  className,
  showTrigger = false,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: React.ReactNode;
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
  triggerProps?: AutocompletePrimitive.Trigger.Props;
  clearProps?: AutocompletePrimitive.Clear.Props;
}): React.ReactElement {
  const sizeValue = (size ?? "default") as "sm" | "default" | "lg" | number;

  return (
    <AutocompletePrimitive.InputGroup
      className={inputGroupStyle}
      data-slot="autocomplete-input-group"
    >
      {startAddon && (
        <div
          aria-hidden="true"
          className={startAddonStyle}
          data-slot="autocomplete-start-addon"
        >
          {startAddon}
        </div>
      )}
      <AutocompletePrimitive.Input
        className={cx(
          startAddon ? inputStartAddonStyle : undefined,
          inputEndAddonStyle,
          className,
        )}
        data-slot="autocomplete-input"
        render={<Input nativeInput size={sizeValue} />}
        {...props}
      />
      {showTrigger && (
        <AutocompleteTrigger
          className={cx(actionStyle, css({
            insetInlineEnd: sizeValue === "sm" ? 0 : "0.125rem",
          }))}
          {...triggerProps}
        >
          <AutocompletePrimitive.Icon data-slot="autocomplete-icon">
            <Icon icon={UnfoldMoreIcon} />
          </AutocompletePrimitive.Icon>
        </AutocompleteTrigger>
      )}
      {showClear && (
        <AutocompleteClear
          className={cx(actionStyle, css({
            insetInlineEnd: sizeValue === "sm" ? 0 : "0.125rem",
          }))}
          {...clearProps}
        >
          <Icon icon={Cancel01Icon} />
        </AutocompleteClear>
      )}
    </AutocompletePrimitive.InputGroup>
  );
}

export function AutocompletePopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  alignOffset,
  align = "start",
  anchor,
  portalProps,
  ...props
}: AutocompletePrimitive.Popup.Props & {
  align?: AutocompletePrimitive.Positioner.Props["align"];
  sideOffset?: AutocompletePrimitive.Positioner.Props["sideOffset"];
  alignOffset?: AutocompletePrimitive.Positioner.Props["alignOffset"];
  side?: AutocompletePrimitive.Positioner.Props["side"];
  anchor?: AutocompletePrimitive.Positioner.Props["anchor"];
  portalProps?: AutocompletePrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <AutocompletePrimitive.Portal {...portalProps}>
      <AutocompletePrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={css({ zIndex: 50, userSelect: "none" })}
        data-slot="autocomplete-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <span className={cx(popupSurfaceStyle, className)}>
          <AutocompletePrimitive.Popup
            className={popupContentStyle}
            data-slot="autocomplete-popup"
            {...props}
          >
            {children}
          </AutocompletePrimitive.Popup>
        </span>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

export function AutocompleteItem({
  className,
  children,
  ...props
}: AutocompletePrimitive.Item.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Item
      className={cx(itemStyle, className)}
      data-slot="autocomplete-item"
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  );
}

export function AutocompleteSeparator({
  className,
  ...props
}: AutocompletePrimitive.Separator.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Separator
      className={cx(css({
        marginX: "0.5rem",
        marginY: "0.25rem",
        height: "1px",
        backgroundColor: "var(--border)",
        "&:last-child": { display: "none" },
      }), className)}
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

export function AutocompleteGroup({
  className,
  ...props
}: AutocompletePrimitive.Group.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Group
      className={cx(css({
        "[[role=group] + &]": { marginTop: "0.375rem" },
      }), className)}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

export function AutocompleteGroupLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.GroupLabel
      className={cx(css({
        paddingX: "0.5rem",
        paddingY: "0.375rem",
        fontWeight: "medium",
        color: "var(--muted-foreground)",
        fontSize: "xs",
      }), className)}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

export function AutocompleteEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Empty
      className={cx(css({
        "&:not(:empty)": { padding: "0.5rem" },
        textAlign: "center",
        fontSize: "base",
        color: "var(--muted-foreground)",
        "@media (min-width: 40rem)": { fontSize: "sm" },
      }), className)}
      data-slot="autocomplete-empty"
      {...props}
    />
  );
}

export function AutocompleteRow({
  className,
  ...props
}: AutocompletePrimitive.Row.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Row
      className={className}
      data-slot="autocomplete-row"
      {...props}
    />
  );
}

export const AutocompleteValue: typeof AutocompletePrimitive.Value =
  AutocompletePrimitive.Value;

export function AutocompleteList({
  className,
  ...props
}: AutocompletePrimitive.List.Props): React.ReactElement {
  return (
    <ScrollArea overscrollContain scrollbarGutter scrollFade>
      <AutocompletePrimitive.List
        className={cx(css({
          "&:not(:empty)": { scrollPaddingY: "0.25rem", padding: "0.25rem" },
          "&[data-has-overflow-y]": { paddingInlineEnd: "0.75rem" },
        }), className)}
        data-slot="autocomplete-list"
        {...props}
      />
    </ScrollArea>
  );
}

export function AutocompleteClear({
  className,
  ...props
}: AutocompletePrimitive.Clear.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Clear
      className={cx(css({
        position: "absolute",
        insetInlineEnd: "0.125rem",
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
        transitionProperty: "color, background-color, box-shadow, opacity",
        "&:hover": { opacity: 1 },
        "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
        "& svg": { pointerEvents: "none", flexShrink: 0 },
        "@media (pointer: coarse)": {
          "&::after": {
            content: '""',
            position: "absolute",
            minWidth: "44px",
            minHeight: "44px",
          },
        },
        "@media (min-width: 40rem)": {
          width: "1.75rem",
          height: "1.75rem",
          "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
        },
      }), className)}
      data-slot="autocomplete-clear"
      {...props}
    >
      <Icon icon={Cancel01Icon} />
    </AutocompletePrimitive.Clear>
  );
}

export function AutocompleteStatus({
  className,
  ...props
}: AutocompletePrimitive.Status.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Status
      className={cx(css({
        paddingX: "0.75rem",
        paddingY: "0.5rem",
        fontWeight: "medium",
        color: "var(--muted-foreground)",
        fontSize: "xs",
        "&:empty": { margin: 0, padding: 0 },
      }), className)}
      data-slot="autocomplete-status"
      {...props}
    />
  );
}

export const AutocompleteCollection: typeof AutocompletePrimitive.Collection =
  AutocompletePrimitive.Collection;

export function AutocompleteTrigger({
  className,
  children,
  ...props
}: AutocompletePrimitive.Trigger.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Trigger
      className={className}
      data-slot="autocomplete-trigger"
      {...props}
    >
      {children}
    </AutocompletePrimitive.Trigger>
  );
}

export const useAutocompleteFilter: typeof AutocompletePrimitive.useFilter =
  AutocompletePrimitive.useFilter;

export { AutocompletePrimitive };
