import { css } from "../../../../styled-system/css";

import type React from "react";

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={[
        css({
          animation: "skeleton 2s -1s infinite linear",
          borderRadius: "sm",
          backgroundColor: "var(--muted)",
          backgroundImage:
            "linear-gradient(120deg, transparent 40%, var(--skeleton-highlight), transparent 60%)",
          backgroundPosition: "0 0",
          backgroundSize: "200% 100%",
          backgroundAttachment: "fixed",
          "--skeleton-highlight": "color-mix(in srgb, white 64%, transparent)",
          _dark: {
            "--skeleton-highlight": "color-mix(in srgb, white 4%, transparent)",
          },
        }),
        className,
      ].filter(Boolean).join(" ")}
      data-slot="skeleton"
      {...props}
    />
  );
}
