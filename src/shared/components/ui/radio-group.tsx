"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { css } from "styled-system/css";

import type React from "react";

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={[css({ display: "flex", flexDirection: "column", gap: "3" }), className].filter(Boolean).join(" ")}
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
          width: "4",
          height: "4",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          borderWidth: "1px",
          borderColor: "var(--input)",
          backgroundColor: "var(--background)",
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
          "&:focus-visible": {
            outline: "2px solid var(--ring)",
            outlineOffset: "2px",
          },
          "&[data-disabled]": { cursor: "not-allowed", opacity: 0.64 },
          "&[data-checked]": { boxShadow: "none" },
          _dark: { backgroundColor: "var(--input)" },
        }),
        className,
      ].filter(Boolean).join(" ")}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className={css({
          position: "absolute",
          inset: "-1px",
          display: "flex",
          width: "4",
          height: "4",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "full",
          backgroundColor: "var(--primary)",
          "&:before": {
            content: '""',
            width: "1.5",
            height: "1.5",
            borderRadius: "full",
            backgroundColor: "var(--primary-foreground)",
          },
          "&[data-unchecked]": { display: "none" },
        })}
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive, Radio as RadioGroupItem };
