"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { css } from "styled-system/css";

import type React from "react";

export function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldPrimitive.Root
      className={[
        css({ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="field"
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props): React.ReactElement {
  return (
    <FieldPrimitive.Label
      className={[
        css({
          display: "inline-flex",
          alignItems: "center",
          gap: "2",
          fontWeight: "medium",
          fontSize: { base: "base", sm: "sm" },
          lineHeight: { base: "1.125rem", sm: "1rem" },
          color: "var(--foreground)",
          "&[data-disabled]": { opacity: 0.64 },
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="field-label"
      {...props}
    />
  );
}

export function FieldItem({
  className,
  ...props
}: FieldPrimitive.Item.Props): React.ReactElement {
  return (
    <FieldPrimitive.Item
      className={[
        css({ display: "flex" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="field-item"
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props): React.ReactElement {
  return (
    <FieldPrimitive.Description
      className={[
        css({ color: "var(--muted-foreground)", fontSize: "xs" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="field-description"
      {...props}
    />
  );
}

export function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props): React.ReactElement {
  return (
    <FieldPrimitive.Error
      className={[
        css({ color: "var(--destructive-foreground)", fontSize: "xs" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="field-error"
      {...props}
    />
  );
}

export const FieldControl: typeof FieldPrimitive.Control =
  FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity =
  FieldPrimitive.Validity;

export { FieldPrimitive };
