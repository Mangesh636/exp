import { css } from "styled-system/css";

import type * as React from "react";

export function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={[
        css({
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1",
          minWidth: "5",
          height: "5",
          paddingX: "1",
          borderRadius: "lg",
          backgroundColor: "var(--muted)",
          color: "var(--muted-foreground)",
          fontFamily: "sans",
          fontSize: "xs",
          fontWeight: "medium",
          pointerEvents: "none",
          userSelect: "none",
          "& svg:not([class*='size-'])": {
            width: "3",
            height: "3",
          },
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="kbd"
      {...props}
    />
  );
}

export function KbdGroup({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={[
        css({
          display: "inline-flex",
          alignItems: "center",
          gap: "1",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="kbd-group"
      {...props}
    />
  );
}
