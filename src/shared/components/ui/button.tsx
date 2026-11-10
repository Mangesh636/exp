"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cva, cx, type RecipeVariantProps } from "styled-system/css";

import type * as React from "react";

import { Spinner } from "@/shared/components/ui/spinner";

export const buttonVariants = cva({
  base: {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    whiteSpace: "nowrap",
    borderRadius: "lg",
    borderWidth: "1px",
    fontWeight: "medium",
    fontSize: "base",
    outline: "none",
    transitionProperty: "box-shadow",
    "&:before": {
      content: '""',
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      borderRadius: "calc(var(--radius-lg) - 1px)",
    },
    "&:focus-visible": {
      boxShadow: "0 0 0 2px var(--ring), 0 0 0 3px var(--background)",
    },
    "&:disabled": { pointerEvents: "none", opacity: 0.64 },
    "&[data-loading]": { userSelect: "none", color: "transparent" },
    "& > svg:not([class*='opacity-'])": { opacity: 0.8 },
    "& > svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
    "& > svg": { pointerEvents: "none", marginX: "-0.125rem", flexShrink: 0 },
    "@media (min-width: 40rem)": {
      fontSize: "sm",
      "& > svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },
    "@media (pointer: coarse)": {
      "&:after": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "100%",
        minHeight: "44px",
        minWidth: "44px",
      },
    },
  },
  variants: {
    size: {
      default: { height: "2.25rem", paddingX: "calc(var(--spacing) * 3 - 1px)", "@media (min-width: 40rem)": { height: "2rem" } },
      icon: { width: "2.25rem", height: "2.25rem", padding: 0, "@media (min-width: 40rem)": { width: "2rem", height: "2rem" } },
      "icon-lg": { width: "2.5rem", height: "2.5rem", padding: 0, "@media (min-width: 40rem)": { width: "2.25rem", height: "2.25rem" } },
      "icon-sm": { width: "2rem", height: "2rem", padding: 0, "@media (min-width: 40rem)": { width: "1.75rem", height: "1.75rem" } },
      "icon-xl": { width: "2.75rem", height: "2.75rem", padding: 0, "& > svg:not([class*='size-'])": { width: "1.25rem", height: "1.25rem" }, "@media (min-width: 40rem)": { width: "2.5rem", height: "2.5rem", "& > svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" } } },
      "icon-xs": { width: "1.75rem", height: "1.75rem", padding: 0, borderRadius: "md", "&:before": { borderRadius: "calc(var(--radius-md) - 1px)" }, "@media (min-width: 40rem)": { width: "1.5rem", height: "1.5rem" } },
      lg: { height: "2.5rem", paddingX: "calc(var(--spacing) * 3.5 - 1px)", "@media (min-width: 40rem)": { height: "2.25rem" } },
      sm: { height: "2rem", gap: "1.5", paddingX: "calc(var(--spacing) * 2.5 - 1px)", "@media (min-width: 40rem)": { height: "1.75rem" } },
      xl: { height: "2.75rem", paddingX: "calc(var(--spacing) * 4 - 1px)", fontSize: "lg", "& > svg:not([class*='size-'])": { width: "1.25rem", height: "1.25rem" }, "@media (min-width: 40rem)": { height: "2.5rem", fontSize: "base", "& > svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" } } },
      xs: { height: "1.75rem", gap: "1", borderRadius: "md", paddingX: "calc(var(--spacing) * 2 - 1px)", fontSize: "sm", "&:before": { borderRadius: "calc(var(--radius-md) - 1px)" }, "@media (min-width: 40rem)": { height: "1.5rem", fontSize: "xs" } },
    },
    variant: {
      default: {
        borderColor: "var(--primary)", backgroundColor: "var(--primary)", color: "var(--primary-foreground)",
        boxShadow: "0 1px 2px color-mix(in srgb, var(--primary) 24%, transparent)",
        "&:not(:disabled)": { boxShadow: "inset 0 1px 0 color-mix(in srgb, white 16%, transparent), 0 1px 2px color-mix(in srgb, var(--primary) 24%, transparent)" },
        "&:hover, &[data-pressed]": { backgroundColor: "color-mix(in srgb, var(--primary) 90%, transparent)" },
        "&:active, &[data-pressed]": { boxShadow: "inset 0 1px 0 color-mix(in srgb, black 8%, transparent)" },
        "&:disabled, &:active, &[data-pressed]": { boxShadow: "none" },
        "& [data-slot='button-loading-indicator']": { color: "var(--primary-foreground)" },
      },
      destructive: {
        borderColor: "var(--destructive)", backgroundColor: "var(--destructive)", color: "white",
        boxShadow: "0 1px 2px color-mix(in srgb, var(--destructive) 24%, transparent)",
        "&:not(:disabled)": { boxShadow: "inset 0 1px 0 color-mix(in srgb, white 16%, transparent), 0 1px 2px color-mix(in srgb, var(--destructive) 24%, transparent)" },
        "&:hover, &[data-pressed]": { backgroundColor: "color-mix(in srgb, var(--destructive) 90%, transparent)" },
        "&:active, &[data-pressed]": { boxShadow: "inset 0 1px 0 color-mix(in srgb, black 8%, transparent)" },
        "&:disabled, &:active, &[data-pressed]": { boxShadow: "none" },
        "& [data-slot='button-loading-indicator']": { color: "white" },
      },
      "destructive-outline": {
        borderColor: "var(--input)", backgroundColor: "var(--popover)", color: "var(--destructive-foreground)",
        boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
        "&:not(:disabled):not(:active):not([data-pressed]):before": { boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)" },
        "&:hover, &[data-pressed]": { borderColor: "color-mix(in srgb, var(--destructive) 32%, transparent)", backgroundColor: "color-mix(in srgb, var(--destructive) 4%, transparent)" },
        "& [data-slot='button-loading-indicator']": { color: "var(--foreground)" },
        "&:disabled, &:active, &[data-pressed]": { boxShadow: "none" },
        _dark: { backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)", "&:not(:disabled):before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 2%, transparent)" }, "&:not(:disabled):not(:active):not([data-pressed]):before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" } },
      },
      ghost: { borderColor: "transparent", color: "var(--foreground)", "&:hover, &[data-pressed]": { backgroundColor: "var(--accent)" }, "& [data-slot='button-loading-indicator']": { color: "var(--foreground)" } },
      link: { borderColor: "transparent", color: "var(--foreground)", textUnderlineOffset: "4px", "&:hover, &[data-pressed]": { textDecorationLine: "underline" }, "& [data-slot='button-loading-indicator']": { color: "var(--foreground)" } },
      outline: {
        borderColor: "var(--input)", backgroundColor: "var(--popover)", color: "var(--foreground)", boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
        "&:not(:disabled):not(:active):not([data-pressed]):before": { boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)" },
        "&:hover, &[data-pressed]": { backgroundColor: "color-mix(in srgb, var(--accent) 50%, transparent)" },
        "& [data-slot='button-loading-indicator']": { color: "var(--foreground)" },
        "&:disabled, &:active, &[data-pressed]": { boxShadow: "none" },
        _dark: { backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)", "&:hover, &[data-pressed]": { backgroundColor: "color-mix(in srgb, var(--input) 64%, transparent)" }, "&:not(:disabled):before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 2%, transparent)" }, "&:not(:disabled):not(:active):not([data-pressed]):before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" } },
      },
      secondary: { borderColor: "transparent", backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", "&:hover, &[data-pressed]": { backgroundColor: "color-mix(in srgb, var(--secondary) 90%, transparent)" }, "&:active, &[data-pressed]": { backgroundColor: "color-mix(in srgb, var(--secondary) 80%, transparent)" }, "& [data-slot='button-loading-indicator']": { color: "var(--secondary-foreground)" } },
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export interface ButtonProps
  extends useRender.ComponentProps<"button">,
    RecipeVariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  disabled: disabledProp,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled: boolean = Boolean(loading || disabledProp);
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        {children}
        {loading && (
          <Spinner
            className={css({ position: "absolute", pointerEvents: "none" })}
            data-slot="button-loading-indicator"
          />
        )}
      </>
    ),
    className: cx(buttonVariants({ size, variant }), className),
    "aria-disabled": loading || undefined,
    "data-loading": loading ? "" : undefined,
    "data-slot": "button",
    disabled: isDisabled,
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
