"use client";

import { Dialog as CommandDialogPrimitive } from "@base-ui/react/dialog";
import { css, cx } from "styled-system/css";

import type * as React from "react";

import { Search01Icon } from "@/shared/components/icons/interface-icon";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from "@/shared/components/ui/autocomplete";
import { Icon } from "@/shared/components/ui/icon";

const backdropStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgb(0 0 0 / 0.32)",
  backdropFilter: "blur(4px)",
  transition: "all 200ms",
  "&[data-ending-style], &[data-starting-style]": { opacity: 0 },
  "@supports (-webkit-touch-callout: none)": { position: "absolute" },
});

const viewportStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingInline: "1rem",
  paddingBlock: "max(1rem, 4vh)",
  "@media (min-width: 40rem)": { paddingBlock: "10vh" },
});

const popupStyle = css({
  position: "relative",
  gridRowStart: 2,
  display: "flex",
  width: "100%",
  minWidth: 0,
  minHeight: 0,
  maxWidth: "36rem",
  maxHeight: "26.25rem",
  flexDirection: "column",
  transform: "translateY(calc(-1.25rem * var(--nested-dialogs))) scale(calc(1 - 0.1 * var(--nested-dialogs)))",
  borderWidth: "1px",
  borderRadius: "1rem",
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  opacity: "calc(1 - 0.1 * var(--nested-dialogs))",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
  outline: "none",
  transition: "scale 200ms ease-in-out, opacity 200ms ease-in-out, translate 200ms ease-in-out",
  willChange: "transform",
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--radius-2xl) - 1px)",
    backgroundColor: "color-mix(in srgb, var(--muted) 72%, transparent)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&[data-nested][data-ending-style], &[data-nested][data-starting-style]": {
    translate: "0 2rem",
  },
  "&[data-nested-dialog-open]": { transformOrigin: "top" },
  "&[data-ending-style], &[data-starting-style]": {
    scale: "0.98",
    opacity: 0,
  },
  "& .\[\*\*\:data-\[slot\=scroll-area-viewport\]\:data-has-overflow-y\:pe-1\]": {
    paddingInlineEnd: "0.25rem",
  },
  "&::before": {
    content: '""',
  },
  ".dark &::before": {
    boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
  },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
});

const panelStyle = css({
  position: "relative",
  marginInline: "-1px",
  minHeight: 0,
  borderWidth: "1px",
  borderBottomWidth: 0,
  borderTopLeftRadius: "var(--radius-xl)",
  backgroundColor: "var(--popover)",
  backgroundClip: "padding-box",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  clipPath: "inset(0 1px)",
  "&:not(:has(+ [data-slot='command-footer']))": {
    marginBottom: "-1px",
    borderBottomRightRadius: "var(--radius-2xl)",
    clipPath: "inset(0 1px 1px 1px round 0 0 calc(var(--radius-2xl) - 1px) calc(var(--radius-2xl) - 1px))",
  },
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderTopLeftRadius: "calc(var(--radius-xl) - 1px)",
  },
  "& [data-slot='scroll-area-scrollbar']": { marginTop: "0.5rem" },
});

export const CommandDialog: typeof CommandDialogPrimitive.Root =
  CommandDialogPrimitive.Root;

export const CommandDialogPortal: typeof CommandDialogPrimitive.Portal =
  CommandDialogPrimitive.Portal;

export const CommandCreateHandle: typeof CommandDialogPrimitive.createHandle =
  CommandDialogPrimitive.createHandle;

export function CommandDialogTrigger(
  props: CommandDialogPrimitive.Trigger.Props,
): React.ReactElement {
  return (
    <CommandDialogPrimitive.Trigger
      data-slot="command-dialog-trigger"
      {...props}
    />
  );
}

export function CommandDialogBackdrop({
  className,
  ...props
}: CommandDialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Backdrop
      className={cx(backdropStyle, className)}
      data-slot="command-dialog-backdrop"
      {...props}
    />
  );
}

export function CommandDialogViewport({
  className,
  ...props
}: CommandDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Viewport
      className={cx(viewportStyle, className)}
      data-slot="command-dialog-viewport"
      {...props}
    />
  );
}

export function CommandDialogPopup({
  className,
  children,
  portalProps,
  ...props
}: CommandDialogPrimitive.Popup.Props & {
  portalProps?: CommandDialogPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <CommandDialogPortal {...portalProps}>
      <CommandDialogBackdrop />
      <CommandDialogViewport>
        <CommandDialogPrimitive.Popup
          className={cx(popupStyle, className)}
          data-slot="command-dialog-popup"
          {...props}
        >
          {children}
        </CommandDialogPrimitive.Popup>
      </CommandDialogViewport>
    </CommandDialogPortal>
  );
}

export function Command({
  autoHighlight = "always",
  keepHighlight = true,
  ...props
}: React.ComponentProps<typeof Autocomplete>): React.ReactElement {
  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      inline
      keepHighlight={keepHighlight}
      open
      {...props}
    />
  );
}

export function CommandInput({
  className,
  placeholder = undefined,
  ...props
}: React.ComponentProps<typeof AutocompleteInput>): React.ReactElement {
  return (
    <div className={css({ paddingInline: "0.625rem", paddingBlock: "0.375rem" })}>
      <AutocompleteInput
        autoFocus
        className={cx(css({
          borderColor: "transparent !important",
          backgroundColor: "transparent !important",
          boxShadow: "none",
          "&::before": { display: "none" },
          "&:focus-visible": { "--ring-width": "0" },
        }), className)}
        placeholder={placeholder}
        size="lg"
        startAddon={<Icon icon={Search01Icon} />}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteList>): React.ReactElement {
  return (
    <AutocompleteList
      className={cx(css({ "&:not(:empty)": { scrollPaddingBlock: "0.5rem", padding: "0.5rem" } }), className)}
      data-slot="command-list"
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteEmpty>): React.ReactElement {
  return (
    <AutocompleteEmpty
      className={cx(css({ "&:not(:empty)": { paddingBlock: "1.5rem" } }), className)}
      data-slot="command-empty"
      {...props}
    />
  );
}

export function CommandPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cx(panelStyle, className)} {...props} />;
}

export function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroup>): React.ReactElement {
  return (
    <AutocompleteGroup
      className={className}
      data-slot="command-group"
      {...props}
    />
  );
}

export function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroupLabel>): React.ReactElement {
  return (
    <AutocompleteGroupLabel
      className={className}
      data-slot="command-group-label"
      {...props}
    />
  );
}

export const CommandCollection = AutocompleteCollection;

export function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteItem>): React.ReactElement {
  return (
    <AutocompleteItem
      className={cx(css({ paddingBlock: "0.375rem" }), className)}
      data-slot="command-item"
      {...props}
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteSeparator>): React.ReactElement {
  return (
    <AutocompleteSeparator
      className={cx(css({ marginBlock: "0.5rem" }), className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

export function CommandShortcut({
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
      data-slot="command-shortcut"
      {...props}
    />
  );
}

export function CommandFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        borderTopWidth: "1px",
        borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)",
    borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)",
        paddingInline: "1.25rem",
        paddingBlock: "0.75rem",
        color: "var(--muted-foreground)",
        fontSize: "xs",
      }), className)}
      data-slot="command-footer"
      {...props}
    />
  );
}

export { CommandDialogPrimitive };
