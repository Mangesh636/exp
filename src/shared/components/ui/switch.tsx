"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { css } from "styled-system/css";

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
          borderRadius: "full",
          padding: "1px",
          outline: "none",
          transitionProperty: "background-color, box-shadow",
          transitionDuration: "200ms",
          "--thumb-size": "var(--spacing(5))",
          "&:focus-visible": {
            outline: "2px solid var(--ring)",
            outlineOffset: "2px",
          },
          "&[data-disabled]": { cursor: "not-allowed", opacity: 0.64 },
          "&[data-checked]": { backgroundColor: "var(--primary)" },
          "&[data-unchecked]": { backgroundColor: "var(--input)" },
          "@media (min-width: 40rem)": { "--thumb-size": "var(--spacing(4))" },
        }),
        className,
      ].filter(Boolean).join(" ")}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={css({
          display: "block",
          aspectRatio: "1",
          height: "100%",
          transformOrigin: "left center",
          borderRadius: "full",
          backgroundColor: "var(--background)",
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
          pointerEvents: "none",
          willChange: "transform",
          transition: "translate 150ms, border-radius 150ms, scale 100ms 100ms, transform-origin 150ms",
          "&[data-checked]": {
            transformOrigin: "var(--thumb-size) 50%",
            translate: "calc(var(--thumb-size) - 4px) 0",
          },
          "&[data-unchecked]": { translate: "0 0" },
        })}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
