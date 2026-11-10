"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cx, css } from "styled-system/css";
import * as React from "react";

import {
  type SegmentedControlSize,
  segmentedControlIndicatorSurfaceClassName,
  segmentedControlItemLayoutClassName,
  segmentedControlItemSizeClassNames,
} from "@/shared/components/ui/segmented-control";

type TabsVariant = "default" | "underline";
type TabsSize = SegmentedControlSize;

const TabsListContext: React.Context<TabsSize> = React.createContext<TabsSize>("default");

export function Tabs({ className, ...props }: TabsPrimitive.Root.Props): React.ReactElement {
  return <TabsPrimitive.Root className={cx(css({
    display: "flex", flexDirection: "column", gap: "2",
    "&[data-orientation=vertical]": { flexDirection: "row" },
  }), className)} data-slot="tabs" {...props} />;
}

export function TabsList({ variant = "default", size = "default", className, children, ...props }: TabsPrimitive.List.Props & {
  size?: TabsSize;
  variant?: TabsVariant;
}): React.ReactElement {
  const variantClassName = variant === "default"
    ? css({ rounded: "lg", bg: "muted", p: "0.5", color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)" })
    : css({
        "&[data-orientation=vertical]": { px: "1" },
        "&[data-orientation=horizontal]": { py: "1" },
        "& > [data-slot=tabs-tab]:hover": { bg: "accent" },
      });

  return <TabsPrimitive.List className={cx(css({
    position: "relative", zIndex: "0", display: "flex", w: "fit", alignItems: "center",
    justifyContent: "center", columnGap: "0.125rem", color: "muted.foreground",
    "&[data-orientation=vertical]": { flexDirection: "column" },
  }), variantClassName, className)} data-size={size} data-slot="tabs-list" {...props}>
    <TabsListContext.Provider value={size}>{children}</TabsListContext.Provider>
    <TabsPrimitive.Indicator className={cx(css({
      position: "absolute", bottom: "0", left: "0",
      h: "var(--active-tab-height)", w: "var(--active-tab-width)",
      translate: "var(--active-tab-left) calc(var(--active-tab-bottom) * -1)",
      transition: "width 200ms ease-in-out, translate 200ms ease-in-out",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    }), variant === "underline"
      ? css({
          zIndex: "10", bg: "primary",
          "&[data-orientation=horizontal]": { h: "0.5", translateY: "1px" },
          "&[data-orientation=vertical]": { w: "0.5", translateX: "-1px" },
        })
      : cx(css({ zIndex: "-1" }), segmentedControlIndicatorSurfaceClassName))} data-slot="tab-indicator" />
  </TabsPrimitive.List>;
}

export function TabsTab({ className, size, ...props }: TabsPrimitive.Tab.Props & { size?: TabsSize }): React.ReactElement {
  const contextSize: TabsSize = React.useContext(TabsListContext);
  const resolvedSize: TabsSize = size ?? contextSize;

  return <TabsPrimitive.Tab className={cx(css({
    position: "relative", display: "flex", flexShrink: "0", flexGrow: "1",
    cursor: "pointer", alignItems: "center", justifyContent: "center",
    whiteSpace: "nowrap", rounded: "md", borderWidth: "1px", borderColor: "transparent",
    fontWeight: "medium", fontSize: "md", outline: "none",
    transition: "color 150ms, background-color 150ms, box-shadow 150ms",
    "&:hover": { color: "muted.foreground" },
    "&:focus-visible": { boxShadow: "0 0 0 2px var(--ring)" },
    "&[data-disabled]": { pointerEvents: "none", opacity: "0.64" },
    "&[data-orientation=vertical]": { w: "full", justifyContent: "flex-start" },
    "&[data-active]": { color: "foreground" },
    "@media (min-width: 640px)": { fontSize: "sm" },
  }), segmentedControlItemLayoutClassName, segmentedControlItemSizeClassNames[resolvedSize], className)} data-size={resolvedSize} data-slot="tabs-tab" {...props} />;
}

export function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props): React.ReactElement {
  return <TabsPrimitive.Panel className={cx(css({ flex: "1", outline: "none" }), className)} data-slot="tabs-content" {...props} />;
}

export {
  TabsPrimitive,
  TabsTab as TabsTrigger,
  TabsPanel as TabsContent,
  type TabsSize,
  type TabsVariant,
};
