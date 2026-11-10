"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type * as React from "react";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "default" | "lg" | number;
  unstyled?: boolean;
  nativeInput?: boolean;
};

export function Input({
  className,
  size = "default",
  unstyled = false,
  nativeInput = false,
  style,
  ...props
}: InputProps): React.ReactElement {
  const inputClassName = css({
    width: "100%",
    minWidth: 0,
    height: size === "sm" ? "1.875rem" : size === "lg" ? "2.375rem" : "2.125rem",
    borderRadius: "inherit",
    paddingX: size === "sm" ? "calc(var(--spacing) * 2.5 - 1px)" : "calc(var(--spacing) * 3 - 1px)",
    color: "var(--foreground)",
    lineHeight: size === "sm" ? "1.875rem" : size === "lg" ? "2.375rem" : "2.125rem",
    outline: "none",
    transition: "background-color 5000000s ease-in-out 0s",
    "&::placeholder": { color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)" },
    "@media (min-width: 40rem)": {
      height: size === "sm" ? "1.625rem" : size === "lg" ? "2.125rem" : "1.875rem",
      lineHeight: size === "sm" ? "1.625rem" : size === "lg" ? "2.125rem" : "1.875rem",
    },
    "&:-webkit-autofill": {
      WebkitTextFillColor: "var(--foreground)",
    },
    ...(props.type === "search" ? {
      "&::-webkit-search-cancel-button, &::-webkit-search-decoration, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
        appearance: "none",
      },
    } : {}),
    ...(props.type === "file" ? {
      color: "var(--muted-foreground)",
      "&::file-selector-button": {
        marginInlineEnd: "0.75rem",
        backgroundColor: "transparent",
        fontWeight: "500",
        color: "var(--foreground)",
        fontSize: "sm",
      },
    } : {}),
  });

  return (
    <span
      className={cx(
        !unstyled && css({
          position: "relative",
          display: "inline-flex",
          width: "100%",
          borderRadius: "lg",
          borderWidth: "1px",
          borderColor: "var(--input)",
          backgroundColor: "var(--background)",
          backgroundClip: "padding-box",
          fontSize: "base",
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
          transitionProperty: "box-shadow",
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "calc(var(--radius-lg) - 1px)",
          },
          "&:not(:has(:disabled)):not(:has(:focus-visible)):not(:has([aria-invalid='true'])):before": {
            boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
          },
          "&:has(:focus-visible[aria-invalid='true'])": {
            borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)",
          },
          "&:has([aria-invalid='true'])": {
            borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)",
          },
          "&:has(:focus-visible)": {
            borderColor: "var(--ring)",
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
          },
          "&:has(:autofill)": {
            backgroundColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
          },
          "&:has(:disabled)": { opacity: 0.64 },
          "&:has(:disabled, :focus-visible, [aria-invalid='true'])": { boxShadow: "none" },
          "@media (min-width: 40rem)": { fontSize: "sm" },
          _dark: {
            backgroundClip: "border-box",
            backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
            "&:has(:autofill)": {
              backgroundColor: "color-mix(in srgb, var(--foreground) 8%, transparent)",
            },
            "&:has([aria-invalid='true'])": {
              boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)",
            },
            "&:not(:has(:disabled)):not(:has(:focus-visible)):not(:has([aria-invalid='true'])):before": {
              boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
            },
          },
        }),
        className,
      ) || undefined}
      data-size={size}
      data-slot="input-control"
    >
      {nativeInput ? (
        <input
          className={inputClassName}
          data-slot="input"
          size={typeof size === "number" ? size : undefined}
          style={typeof style === "function" ? undefined : style}
          {...props}
        />
      ) : (
        <InputPrimitive
          className={inputClassName}
          data-slot="input"
          size={typeof size === "number" ? size : undefined}
          style={style}
          {...props}
        />
      )}
    </span>
  );
}

export { InputPrimitive };
