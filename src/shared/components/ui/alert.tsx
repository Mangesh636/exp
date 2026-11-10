import { cva, css, cx } from "../../../../styled-system/css";

import type React from "react";

const alertVariants = cva({
  base: {
    position: "relative",
    display: "grid",
    width: "100%",
    alignItems: "start",
    columnGap: "2",
    rowGap: "0.125rem",
    borderRadius: "xl",
    borderWidth: "1px",
    paddingX: "3.5",
    paddingY: "3",
    color: "var(--card-foreground)",
    fontSize: "sm",
    "&:has(> svg)": { columnGap: "2", gridTemplateColumns: "calc(var(--spacing) * 4) 1fr" },
    "&:has(> svg):has([data-slot='alert-action'])": {
      gridTemplateColumns: "calc(var(--spacing) * 4) 1fr auto",
    },
    "&:has([data-slot='alert-action']):not(:has(> svg))": {
      gridTemplateColumns: "1fr auto",
    },
    "& > svg": { width: "1rem", height: "1lh" },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "transparent",
        "& > svg": { color: "var(--muted-foreground)" },
        _dark: { backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)" },
      },
      error: {
        borderColor: "color-mix(in srgb, var(--destructive) 32%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--destructive) 4%, transparent)",
        "& > svg": { color: "var(--destructive)" },
      },
      info: {
        borderColor: "color-mix(in srgb, var(--info) 32%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--info) 4%, transparent)",
        "& > svg": { color: "var(--info)" },
      },
      success: {
        borderColor: "color-mix(in srgb, var(--success) 32%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--success) 4%, transparent)",
        "& > svg": { color: "var(--success)" },
      },
      warning: {
        borderColor: "color-mix(in srgb, var(--warning) 32%, transparent)",
        backgroundColor: "color-mix(in srgb, var(--warning) 4%, transparent)",
        "& > svg": { color: "var(--warning)" },
      },
    },
  },
  defaultVariants: { variant: "default" },
});

type AlertVariant = "default" | "error" | "info" | "success" | "warning";

export function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & { variant?: AlertVariant }): React.ReactElement {
  return (
    <div
      className={cx(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(css({ fontWeight: "medium", "&:is(svg ~ *)": { gridColumnStart: 2 } }), className)}
      data-slot="alert-title"
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          flexDirection: "column",
          gap: "2.5",
          color: "var(--muted-foreground)",
          "&:is(svg ~ *)": { gridColumnStart: 2 },
        }),
        className,
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

export function AlertAction({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          gap: "1",
          "@media (max-width: 39.999rem)": {
            gridColumnStart: 2,
            marginTop: "2",
          },
          "@media (min-width: 40rem)": {
            gridRowStart: 1,
            gridRowEnd: 3,
            alignSelf: "center",
            "&:is([data-slot='alert-description'] ~ *)": { gridColumnStart: 2 },
            "&:is([data-slot='alert-title'] ~ *)": { gridColumnStart: 2 },
            "&:is(svg ~ *)": { gridColumnStart: 2 },
            "&:is(svg ~ [data-slot='alert-description'] ~ *)": { gridColumnStart: 3 },
            "&:is(svg ~ [data-slot='alert-title'] ~ *)": { gridColumnStart: 3 },
          },
        }),
        className,
      )}
      data-slot="alert-action"
      {...props}
    />
  );
}
