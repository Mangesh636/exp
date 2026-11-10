"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { css } from "styled-system/css";

import type React from "react";

export function Collapsible({
  ...props
}: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      className={className}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export function CollapsiblePanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      className={[
        css({
          height: "var(--collapsible-panel-height)",
          overflow: "hidden",
          transitionProperty: "height",
          transitionDuration: "200ms",
          "&[data-ending-style], &[data-starting-style]": { height: "0" },
        }),
        className,
      ].filter(Boolean).join(" ")}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { CollapsiblePrimitive, CollapsiblePanel as CollapsibleContent };
