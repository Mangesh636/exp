"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

export function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={[
        css({
          display: "inline-flex",
          height: "calc(var(--thumb-size) + 2px)",
          width: "calc(var(--thumb-size) * 2 - 2px)",
          flexShrink: 0,
          alignItems: "center",
          padding: "1px",
          borderRadius: "full",
          outline: "none",
          transitionProperty: "background-color, box-shadow",
          transitionDuration: "200ms",
          "--thumb-size": "1.25rem",
          "&:focus-visible": {
            boxShadow: "0 0 0 1px var(--background), 0 0 0 3px var(--ring)",
          },
          "&[data-disabled]": { cursor: "not-allowed", opacity: 0.64 },
          "&[data-checked]": { backgroundColor: "var(--primary)" },
          "&[data-unchecked]": { backgroundColor: "var(--input)" },
          "@media (min-width: 40rem)": { "--thumb-size": "1rem" },
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={css({
          display: "block",
          aspectRatio: "1",
          height: "100%",
          flexShrink: 0,
          borderRadius: "var(--thumb-size)",
          backgroundColor: "var(--background)",
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
          pointerEvents: "none",
          willChange: "transform",
          transformOrigin: "left center",
          transition:
            "translate 150ms, border-radius 150ms, scale 100ms 100ms, transform-origin 150ms",
          "&[data-checked]": {
            transformOrigin: "var(--thumb-size) 50%",
            translate: "calc(var(--thumb-size) - 4px) 0",
          },
          _activeLabel: {
            scale: "1.1 1",
            borderRadius: "var(--thumb-size) / calc(var(--thumb-size) * 1.1)",
          },
          _directionRtl: {
            transformOrigin: "right center",
            "&[data-checked]": {
              transformOrigin: "left center",
              translate: "calc((var(--thumb-size) - 4px) * -1) 0",
            },
          },
        })}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
