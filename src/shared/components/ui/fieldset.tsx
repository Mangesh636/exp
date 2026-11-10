"use client";

import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { css } from "styled-system/css";

import type React from "react";

export function Fieldset({
  className,
  ...props
}: FieldsetPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldsetPrimitive.Root
      className={className}
      data-slot="fieldset"
      {...props}
    />
  );
}

export function FieldsetLegend({
  className,
  ...props
}: FieldsetPrimitive.Legend.Props): React.ReactElement {
  return (
    <FieldsetPrimitive.Legend
      className={[
        css({
          fontWeight: "semibold",
          color: "var(--foreground)",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="fieldset-legend"
      {...props}
    />
  );
}

export { FieldsetPrimitive };
