"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, cx } from "styled-system/css";

import type React from "react";

const badgeVariants = cva({
  base: {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: "1",
    whiteSpace: "nowrap",
    borderRadius: "sm",
    borderWidth: "1px",
    borderColor: "transparent",
    fontWeight: "medium",
    outline: "none",
    transitionProperty: "box-shadow",
    "&:focus-visible": {
      boxShadow: "0 0 0 1px var(--background), 0 0 0 3px var(--ring)",
    },
    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.64,
    },
    "& svg:not([class*='opacity-'])": { opacity: 0.8 },
    "& svg:not([class*='size-'])": {
      width: "0.875rem",
      height: "0.875rem",
      "@media (min-width: 40rem)": {
        width: "0.75rem",
        height: "0.75rem",
      },
    },
    "& svg": {
      pointerEvents: "none",
      flexShrink: 0,
    },
    "&:is(button, a)": {
      cursor: "pointer",
    },
    "@media (pointer: coarse)": {
      "&:is(button, a)::after": {
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
      default: {
        height: "1.375rem",
        minWidth: "1.375rem",
        paddingX: "3px",
        fontSize: "sm",
        "@media (min-width: 40rem)": {
          height: "1.125rem",
          minWidth: "1.125rem",
          fontSize: "xs",
        },
      },
      lg: {
        height: "1.625rem",
        minWidth: "1.625rem",
        paddingX: "5px",
        fontSize: "base",
        "@media (min-width: 40rem)": {
          height: "1.375rem",
          minWidth: "1.375rem",
          fontSize: "sm",
        },
      },
      sm: {
        height: "1.25rem",
        minWidth: "1.25rem",
        borderRadius: "0.25rem",
        paddingX: "3px",
        fontSize: "xs",
        "@media (min-width: 40rem)": {
          height: "1rem",
          minWidth: "1rem",
          fontSize: "0.625rem",
        },
      },
    },
    variant: {
      default: {
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
        "&:is(button, a):hover": {
          backgroundColor: "color-mix(in srgb, var(--primary) 90%, transparent)",
        },
      },
      destructive: {
        backgroundColor: "var(--destructive)",
        color: "white",
        "&:is(button, a):hover": {
          backgroundColor: "color-mix(in srgb, var(--destructive) 90%, transparent)",
        },
      },
      error: {
        backgroundColor: "color-mix(in srgb, var(--destructive) 8%, transparent)",
        color: "var(--destructive-foreground)",
        _dark: {
          backgroundColor: "color-mix(in srgb, var(--destructive) 16%, transparent)",
        },
      },
      info: {
        backgroundColor: "color-mix(in srgb, var(--info) 8%, transparent)",
        color: "var(--info-foreground)",
        _dark: {
          backgroundColor: "color-mix(in srgb, var(--info) 16%, transparent)",
        },
      },
      outline: {
        borderColor: "var(--input)",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        _dark: {
          backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
        },
        "&:is(button, a):hover": {
          backgroundColor: "color-mix(in srgb, var(--accent) 50%, transparent)",
        },
        _dark: {
          backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
          "&:is(button, a):hover": {
            backgroundColor: "color-mix(in srgb, var(--input) 48%, transparent)",
          },
        },
      },
      secondary: {
        backgroundColor: "var(--secondary)",
        color: "var(--secondary-foreground)",
        "&:is(button, a):hover": {
          backgroundColor: "color-mix(in srgb, var(--secondary) 90%, transparent)",
        },
      },
      success: {
        backgroundColor: "color-mix(in srgb, var(--success) 8%, transparent)",
        color: "var(--success-foreground)",
        _dark: {
          backgroundColor: "color-mix(in srgb, var(--success) 16%, transparent)",
        },
      },
      warning: {
        backgroundColor: "color-mix(in srgb, var(--warning) 8%, transparent)",
        color: "var(--warning-foreground)",
        _dark: {
          backgroundColor: "color-mix(in srgb, var(--warning) 16%, transparent)",
        },
      },
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

type BadgeVariant = "default" | "destructive" | "error" | "info" | "outline" | "secondary" | "success" | "warning";
type BadgeSize = "default" | "lg" | "sm";

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  className,
  variant,
  size,
  render,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cx(badgeVariants({ size, variant }), className),
    "data-slot": "badge",
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}
