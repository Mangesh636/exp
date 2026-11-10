"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, cx } from "styled-system/css";

import type React from "react";

export type ToggleSize = "default" | "lg" | "sm";
export type ToggleVariant = "default" | "outline";
export type ToggleVariantProps = {
  size?: ToggleSize;
  variant?: ToggleVariant;
};

export const toggleVariants = cva({
  base: {
    position: "relative",
    display: "inline-flex",
    flexShrink: "0",
    cursor: "pointer",
    userSelect: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    whiteSpace: "nowrap",
    rounded: "lg",
    borderWidth: "1px",
    fontWeight: "medium",
    fontSize: "md",
    color: "foreground",
    outline: "none",
    transition: "box-shadow 150ms",
    _before: {
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      inset: "0",
      rounded: "calc(var(--radius-lg) - 1px)",
    },
    "&:hover": { bg: "accent" },
    "&:focus-visible": {
      boxShadow: "0 0 0 2px var(--ring), 0 0 0 3px var(--background)",
    },
    "&:disabled": { pointerEvents: "none", opacity: "0.64" },
    "&[data-pressed]": { bg: "color-mix(in srgb, var(--input) 64%, transparent)", color: "accent.foreground" },
    "& svg:not([class*=opacity-])": { opacity: "0.8" },
    "& svg:not([class*=size-])": { width: "1.125rem", height: "1.125rem" },
    "& svg": { pointerEvents: "none", mx: "-0.125rem", flexShrink: "0" },
    "@media (pointer: coarse)": {
      "&::after": { content: '""', position: "absolute", size: "full", minH: "2.75rem", minW: "2.75rem" },
    },
    "@media (min-width: 640px)": {
      fontSize: "sm",
      "& svg:not([class*=size-])": { width: "1rem", height: "1rem" },
    },
  },
  variants: {
    size: {
      default: { h: "2.25rem", minW: "2.25rem", px: "calc(0.5rem - 1px)", "@media (min-width: 640px)": { h: "2rem", minW: "2rem" } },
      lg: { h: "2.5rem", minW: "2.5rem", px: "calc(0.625rem - 1px)", "@media (min-width: 640px)": { h: "2.25rem", minW: "2.25rem" } },
      sm: { h: "2rem", minW: "2rem", px: "calc(0.375rem - 1px)", "@media (min-width: 640px)": { h: "1.75rem", minW: "1.75rem" } },
    },
    variant: {
      default: { borderColor: "transparent" },
      outline: {
        borderColor: "input",
        bg: "background",
        backgroundClip: "padding-box",
        boxShadow: "0 1px 2px rgb(0 0 0 / 5%)",
        "&:not(:disabled):not(:active):not([data-pressed])::before": { boxShadow: "0 1px rgb(0 0 0 / 4%)" },
        _dark: {
          bg: "color-mix(in srgb, var(--input) 32%, transparent)",
          "&[data-pressed]": { bg: "input" },
          "&:hover": { bg: "color-mix(in srgb, var(--input) 64%, transparent)" },
          "&:not(:disabled):not(:active):not([data-pressed])::before": { boxShadow: "0 -1px rgb(255 255 255 / 6%)" },
          "&:not(:disabled):not([data-pressed])::before": { boxShadow: "0 -1px rgb(255 255 255 / 2%)" },
        },
        "&:is(:disabled,:active,[data-pressed])": { boxShadow: "none" },
      },
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & ToggleVariantProps): React.ReactElement {
  return (
    <TogglePrimitive
      className={cx(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}

export { TogglePrimitive };
