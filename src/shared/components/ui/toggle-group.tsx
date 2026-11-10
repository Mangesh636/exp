"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";
import * as React from "react";

import type { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { Separator } from "@/shared/components/ui/separator";
import {
  Toggle as ToggleComponent,
  type ToggleVariantProps,
} from "@/shared/components/ui/toggle";

export const ToggleGroupContext: React.Context<ToggleVariantProps> =
  React.createContext<ToggleVariantProps>({
    size: "default",
    variant: "default",
  });

export function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props & ToggleVariantProps): React.ReactElement {
  const orientationStyles = orientation === "horizontal"
    ? css({
        "& > *": { "@media (pointer: coarse)": { "&::after": { minW: "auto" } } },
      })
    : css({
        flexDirection: "column",
        "& > *": { "@media (pointer: coarse)": { "&::after": { minH: "auto" } } },
      });

  const variantStyles = variant === "default"
    ? css({ gap: "0.125rem" })
    : orientation === "horizontal"
      ? css({
          "& > :not(:first-child)": { borderStartStartRadius: "0", borderEndStartRadius: "0", borderInlineStartWidth: "0" },
          "& > :not(:last-child)": { borderStartEndRadius: "0", borderEndEndRadius: "0", borderInlineEndWidth: "0" },
          "& > :not(:first-child):not([data-slot=separator])::before": { insetInlineStart: "-0.5px" },
          "& > :not(:last-child):not([data-slot=separator])::before": { insetInlineEnd: "-0.5px" },
        })
      : css({
          "& > :not(:first-child)": { borderStartStartRadius: "0", borderStartEndRadius: "0", borderTopWidth: "0" },
          "& > :not(:last-child)": { borderEndStartRadius: "0", borderEndEndRadius: "0", borderBottomWidth: "0" },
          "& > :not(:first-child):not([data-slot=separator])::before": { top: "-0.5px" },
          "& > :not(:last-child):not([data-slot=separator])::before": { bottom: "-0.5px" },
          "& > [data-slot=toggle]:not(:last-child)::before": { display: "none" },
          "& > :last-child::before": { display: "none", _dark: { display: "none" } },
          "& > :first-child::before": { _dark: { display: "block" } },
        });

  return (
    <ToggleGroupPrimitive
      className={cx(css({
        display: "flex",
        w: "fit",
        "& > *:focus-visible": { zIndex: "10" },
        _dark: {
          "& > [data-slot=separator]:has(+ [data-slot=toggle]:hover)::before": { bg: "color-mix(in srgb, var(--input) 64%, transparent)" },
          "& > [data-slot=separator]:has(+ [data-slot=toggle][data-pressed])::before": { bg: "input" },
          "& > [data-slot=toggle]:hover + [data-slot=separator]::before": { bg: "color-mix(in srgb, var(--input) 64%, transparent)" },
          "& > [data-slot=toggle][data-pressed] + [data-slot=separator]::before": { bg: "input" },
        },
      }), orientationStyles, variantStyles, className)}
      data-size={size}
      data-slot="toggle-group"
      data-variant={variant}
      orientation={orientation}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ size, variant }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

export function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & ToggleVariantProps): React.ReactElement {
  const context = React.useContext(ToggleGroupContext);
  const resolvedVariant = context.variant || variant;
  const resolvedSize = context.size || size;

  return (
    <ToggleComponent
      className={className}
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      size={resolvedSize}
      variant={resolvedVariant}
      {...props}
    >
      {children}
    </ToggleComponent>
  );
}

export function ToggleGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: {
  className?: string;
} & React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <Separator
      className={cx(css({
        pointerEvents: "none",
        position: "relative",
        bg: "input",
        _before: { content: '""', position: "absolute", inset: "0" },
        _dark: { _before: { bg: "color-mix(in srgb, var(--input) 32%, transparent)" } },
      }), className)}
      orientation={orientation}
      {...props}
    />
  );
}

export { ToggleGroupPrimitive };
