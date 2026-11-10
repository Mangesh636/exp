import { css, cx } from "../../../../styled-system/css";

import type * as React from "react";

export function Frame({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: "2xl",
          backgroundColor: "color-mix(in srgb, var(--muted) 72%, transparent)",
          padding: "1",
          "& > [data-slot='frame-panel'] + [data-slot='frame-panel']": {
            marginTop: "1",
          },
        }),
        className,
      )}
      data-slot="frame"
      {...props}
    />
  );
}

export function FramePanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          position: "relative",
          borderRadius: "xl",
          borderWidth: "1px",
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          backgroundClip: "padding-box",
          padding: "5",
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "calc(var(--radius-xl) - 1px)",
            boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
          },
          _dark: {
            "&:before": {
              boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
            },
          },
        }),
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  );
}

export function FrameHeader({
  className,
  ...props
}: React.ComponentProps<"header">): React.ReactElement {
  return (
    <header
      className={cx(css({ display: "flex", flexDirection: "column", paddingX: "5", paddingY: "4" }), className)}
      data-slot="frame-panel-header"
      {...props}
    />
  );
}

export function FrameTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(css({ fontWeight: "semibold", fontSize: "sm" }), className)}
      data-slot="frame-panel-title"
      {...props}
    />
  );
}

export function FrameDescription({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(css({ color: "var(--muted-foreground)", fontSize: "sm" }), className)}
      data-slot="frame-panel-description"
      {...props}
    />
  );
}

export function FrameFooter({
  className,
  ...props
}: React.ComponentProps<"footer">): React.ReactElement {
  return (
    <footer
      className={cx(css({ paddingX: "5", paddingY: "4" }), className)}
      data-slot="frame-panel-footer"
      {...props}
    />
  );
}
