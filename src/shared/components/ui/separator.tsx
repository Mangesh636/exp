import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { css } from "styled-system/css";

import type React from "react";

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props): React.ReactElement {
  return (
    <SeparatorPrimitive
      className={[
        css({
          flexShrink: 0,
          backgroundColor: "var(--border)",
          "&[data-orientation=horizontal]": {
            height: "1px",
            width: "100%",
          },
          "&[data-orientation=vertical]": {
            width: "1px",
            alignSelf: "stretch",
          },
          "&[data-orientation=vertical]:not([class^='h-']):not([class*=' h-'])": {
            alignSelf: "stretch",
          },
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
}

export { SeparatorPrimitive };
