"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

const toolbarStyle = css({
  position: "relative",
  display: "flex",
  gap: "0.5rem",
  borderRadius: "xl",
  borderWidth: "1px",
  borderColor: "var(--border)",
  backgroundColor: "var(--card)",
  backgroundClip: "padding-box",
  padding: "0.25rem",
  color: "var(--card-foreground)",
  _dark: { backgroundClip: "border-box" },
});

const groupStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

const separatorStyle = css({
  flexShrink: 0,
  backgroundColor: "var(--border)",
  "&[data-orientation='horizontal']": {
    marginBlock: "0.125rem",
    height: "1px",
    width: "100%",
  },
  "&[data-orientation='vertical']": {
    marginBlock: "0.375rem",
    width: "1px",
    "&:not([class^='h-']):not([class*='_h-'])": {
      alignSelf: "stretch",
    },
  },
});

export function Toolbar({
  className,
  ...props
}: ToolbarPrimitive.Root.Props): React.ReactElement {
  return (
    <ToolbarPrimitive.Root
      className={cx(toolbarStyle, className)}
      data-slot="toolbar"
      {...props}
    />
  );
}

export function ToolbarButton({
  className,
  ...props
}: ToolbarPrimitive.Button.Props): React.ReactElement {
  return (
    <ToolbarPrimitive.Button
      className={className}
      data-slot="toolbar-button"
      {...props}
    />
  );
}

export function ToolbarLink({
  className,
  ...props
}: ToolbarPrimitive.Link.Props): React.ReactElement {
  return (
    <ToolbarPrimitive.Link
      className={className}
      data-slot="toolbar-link"
      {...props}
    />
  );
}

export function ToolbarInput({
  className,
  ...props
}: ToolbarPrimitive.Input.Props): React.ReactElement {
  return (
    <ToolbarPrimitive.Input
      className={className}
      data-slot="toolbar-input"
      {...props}
    />
  );
}

export function ToolbarGroup({
  className,
  ...props
}: ToolbarPrimitive.Group.Props): React.ReactElement {
  return (
    <ToolbarPrimitive.Group
      className={cx(groupStyle, className)}
      data-slot="toolbar-group"
      {...props}
    />
  );
}

export function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props): React.ReactElement {
  return (
    <ToolbarPrimitive.Separator
      className={cx(separatorStyle, className)}
      data-slot="toolbar-separator"
      {...props}
    />
  );
}

export { ToolbarPrimitive };
