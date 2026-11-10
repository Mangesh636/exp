"use client";

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import { css, cx } from "../../../../styled-system/css";

import type * as React from "react";

import { Separator } from "@/shared/components/ui/separator";

const rootStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  "&[data-disabled]": {
    opacity: 0.64,
    "& [data-slot='otp-field-input']": {
      boxShadow: "none",
      "&::before": { boxShadow: "none !important" },
    },
  },
});

const inputStyle = css({
  position: "relative",
  width: "2.25rem",
  height: "2.25rem",
  minWidth: 0,
  borderWidth: "1px",
  borderColor: "var(--input)",
  borderRadius: "lg",
  backgroundColor: "var(--background)",
  backgroundClip: "padding-box",
  textAlign: "center",
  fontSize: "base",
  lineHeight: "2.25rem",
  color: "var(--foreground)",
  boxShadow: "0 1px 2px color-mix(in srgb, black 5%, transparent)",
  outline: "none",
  transitionProperty: "box-shadow",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "calc(var(--radius-lg) - 1px)",
  },
  "&:not(:focus-visible):not([aria-invalid])::before": {
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&:focus-visible": {
    zIndex: 10,
    borderColor: "var(--ring)",
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
  },
  "&[aria-invalid]": {
    borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)",
    boxShadow: "none",
    "&:focus-visible": {
      borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
      boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)",
    },
  },
  "[data-slot='otp-field'][data-size='lg'] &": {
    width: "2.5rem",
    height: "2.5rem",
    fontSize: "lg",
    lineHeight: "2.5rem",
  },
  "@media (min-width: 40rem)": {
    width: "2rem",
    height: "2rem",
    fontSize: "sm",
    lineHeight: "2rem",
    "[data-slot='otp-field'][data-size='lg'] &": {
      width: "2.25rem",
      height: "2.25rem",
      fontSize: "base",
      lineHeight: "2.25rem",
    },
  },
  _dark: {
    backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
    "&:not(:focus-visible):not([aria-invalid])::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
    "&[aria-invalid]:focus-visible": {
      boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)",
    },
  },
});

const separatorStyle = css({
  borderRadius: "full",
  backgroundColor: "var(--input)",
  "&[data-orientation='horizontal']": { height: "0.125rem", width: "0.75rem" },
});

export function OTPField({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: "default" | "lg";
}): React.ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cx(rootStyle, className)}
      data-size={size}
      data-slot="otp-field"
      {...props}
    />
  );
}

export function OTPFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Input>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Input
      className={cx(inputStyle, className)}
      data-slot="otp-field-input"
      spellCheck={false}
      {...props}
    />
  );
}

export function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Separator
      render={
        <Separator
          className={cx(separatorStyle, className)}
          orientation="horizontal"
          {...props}
        />
      }
    />
  );
}

export { OTPFieldPrimitive };
