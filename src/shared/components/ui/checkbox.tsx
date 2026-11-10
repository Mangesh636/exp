"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { css, cx } from "../../../../styled-system/css";

import type React from "react";

export function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      className={cx(
        css({
          position: "relative",
          display: "inline-flex",
          width: "1.125rem",
          height: "1.125rem",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "lg",
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
            borderRadius: "3px",
            pointerEvents: "none",
          },
          "&:not([data-disabled]):not([data-checked]):not([aria-invalid='true']):before": {
            boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
          },
          "&:focus-visible": {
            boxShadow: "0 0 0 2px var(--ring), 0 0 0 3px var(--background)",
          },
          "&[aria-invalid='true']": {
            borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)",
          },
          "&:focus-visible[aria-invalid='true']": {
            borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
            boxShadow: "0 0 0 2px color-mix(in srgb, var(--destructive) 48%, transparent), 0 0 0 3px var(--background)",
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
            "&[aria-invalid='true']": {
              boxShadow: "0 0 0 2px color-mix(in srgb, var(--destructive) 24%, transparent)",
            },
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
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={css({
          position: "absolute",
          inset: "-1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "lg",
          color: "var(--primary-foreground)",
          "&[data-unchecked]": { display: "none" },
          "&[data-checked]": { backgroundColor: "var(--primary)" },
          "&[data-indeterminate]": { color: "var(--foreground)" },
        })}
        data-slot="checkbox-indicator"
        render={(
          props: React.ComponentProps<"span">,
          state: CheckboxPrimitive.Indicator.State,
        ) => (
          <span {...props}>
            {state.indeterminate ? (
              <svg
                aria-hidden="true"
                className={css({ width: "0.875rem", height: "0.875rem", "@media (min-width: 40rem)": { width: "0.75rem", height: "0.75rem" } })}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.252 12h13.496" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className={css({ width: "0.875rem", height: "0.875rem", "@media (min-width: 40rem)": { width: "0.75rem", height: "0.75rem" } })}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
              </svg>
            )}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxPrimitive };
