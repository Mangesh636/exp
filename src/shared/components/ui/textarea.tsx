"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import { cx, css } from "styled-system/css";

import type * as React from "react";

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> &
  React.RefAttributes<HTMLTextAreaElement> & {
    size?: "sm" | "default" | "lg" | number;
    unstyled?: boolean;
  };

export function Textarea({ className, size = "default", unstyled = false, ref, ...props }: TextareaProps): React.ReactElement {
  return (
    <span
      className={cx(
        !unstyled && css({
          position: "relative", display: "inline-grid", w: "full", rounded: "lg",
          borderWidth: "1px", borderColor: "input", bg: "background",
          backgroundClip: "padding-box", fontSize: "md",
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
          transition: "box-shadow 150ms",
          _before: { content: '""', pointerEvents: "none", position: "absolute", inset: "0", rounded: "calc(var(--radius-lg) - 1px)" },
          "&:has(:focus-visible):has([aria-invalid])": {
            borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)",
          },
          "&:has([aria-invalid])": { borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)" },
          "&:has(:focus-visible)": {
            borderColor: "ring",
            boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
          },
          "&:has(:disabled)": { opacity: "0.64" },
          "&:has(:disabled,:focus-visible,[aria-invalid])": { boxShadow: "none" },
          "&:not(:has(:disabled)):not(:has(:focus-visible)):not(:has([aria-invalid]))::before": { boxShadow: "0 1px rgb(0 0 0 / 4%)" },
          "@media (min-width: 640px)": { fontSize: "sm" },
          _dark: {
            bg: "color-mix(in srgb, var(--input) 32%, transparent)",
            "&:has(:focus-visible):has([aria-invalid])": { boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)" },
            "&:not(:has(:disabled)):not(:has(:focus-visible)):not(:has([aria-invalid]))::before": { boxShadow: "0 -1px rgb(255 255 255 / 6%)" },
          },
        }),
        className,
      ) || undefined}
      data-size={size}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        ref={ref}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className={css({
              fieldSizing: "content", minH: "17.5", w: "full", rounded: "inherit",
              px: "calc(0.75rem - 1px)", py: "calc(0.375rem - 1px)",
              color: "foreground", outline: "none",
              "&::placeholder": { color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)" },
              "@media (max-width: 639px)": { minH: "20.5" },
              ...(size === "sm" ? { minH: "16.5", px: "calc(0.625rem - 1px)", py: "calc(0.25rem - 1px)" } : {}),
              ...(size === "lg" ? { minH: "18.5", py: "calc(0.5rem - 1px)" } : {}),
            })}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  );
}

export { FieldPrimitive };
