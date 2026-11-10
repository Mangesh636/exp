"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { css } from "../../../../styled-system/css";

import type React from "react";

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={[css({ display: "flex", flexDirection: "column", gap: "3" }), className]
        .filter(Boolean)
        .join(" ")}
      data-slot="radio-group"
      {...props}
    />
  );
}

export function Radio({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={[
        css({
          position: "relative",
          display: "inline-flex",
          width: "4.5",
          height: "4.5",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          borderWidth: "1px",
          borderColor: "var(--input)",
          backgroundColor: "var(--background)",
          backgroundClip: "padding-box",
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
          outline: "none",
          transitionProperty: "box-shadow",
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "full",
            pointerEvents: "none",
          },
          "&:not([data-disabled]):not([data-checked]):not([aria-invalid='true']):before": {
            boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
          },
          "&:focus-visible": {
            boxShadow: "0 0 0 1px var(--background), 0 0 0 3px var(--ring)",
          },
          "&[aria-invalid='true']": { borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)" },
          "&:focus-visible[aria-invalid='true']": {
            borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
            boxShadow: "0 0 0 1px var(--background), 0 0 0 3px color-mix(in srgb, var(--destructive) 48%, transparent)",
          },
          "&[data-disabled]": { cursor: "not-allowed", opacity: 0.64 },
          "&[data-disabled], &[data-checked], &[aria-invalid='true']": {
            boxShadow: "none",
          },
          _dark: {
            backgroundClip: "border-box",
            "&:not([data-checked])": {
              backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
            },
            "&:focus-visible[aria-invalid='true']": {
              boxShadow: "0 0 0 1px var(--background), 0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)",
            },
          },
          "&:not([data-checked])[aria-invalid='true']": {
            borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)",
          },
          _dark: {
            "&:not([data-disabled]):not([data-checked]):not([aria-invalid='true']):before": {
              boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
            },
          },
          "@media (min-width: 40rem)": {
            width: "1rem",
            height: "1rem",
          },
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className={css({
          position: "absolute",
          inset: "-1px",
          display: "flex",
          width: "1.125rem",
          height: "1.125rem",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          "&:before": {
            content: '""',
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "full",
            backgroundColor: "var(--primary-foreground)",
          },
          "&[data-unchecked]": { display: "none" },
          "&[data-checked]": { backgroundColor: "var(--primary)" },
          "@media (min-width: 40rem)": {
            width: "1rem",
            height: "1rem",
            "&:before": { width: "0.375rem", height: "0.375rem" },
          },
        })}
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive, Radio as RadioGroupItem };
