"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { css, cx } from "styled-system/css";

import type React from "react";

const rootStyle = css({
  width: "100%",
  height: "100%",
  minHeight: 0,
});

const viewportStyle = css({
  height: "100%",
  borderRadius: "inherit",
  outline: "none",
  transitionProperty: "box-shadow",
  "&:focus-visible": {
    boxShadow:
      "0 0 0 2px var(--ring), 0 0 0 3px var(--background)",
  },
  "&[data-has-overflow-y][data-overscroll-contain]": {
    overscrollBehaviorY: "contain",
  },
  "&[data-has-overflow-x][data-overscroll-contain]": {
    overscrollBehaviorX: "contain",
  },
  "&[data-has-overflow-y][data-scrollbar-gutter]": {
    paddingInlineEnd: "0.625rem",
  },
  "&[data-has-overflow-x][data-scrollbar-gutter]": {
    paddingBottom: "0.625rem",
  },
});

const fadeStyle = css({
  maskImage: [
    "linear-gradient(to bottom, transparent, black min(1.5rem, var(--scroll-area-overflow-y-start)), black calc(100% - min(1.5rem, var(--scroll-area-overflow-y-end))), transparent)",
    "linear-gradient(to right, transparent, black min(1.5rem, var(--scroll-area-overflow-x-start)), black calc(100% - min(1.5rem, var(--scroll-area-overflow-x-end))), transparent)",
  ].join(", "),
  maskComposite: "intersect",
});

const scrollbarStyle = css({
  margin: "0.25rem",
  display: "flex",
  opacity: 0,
  transitionProperty: "opacity",
  transitionDuration: "300ms",
  transitionDelay: "300ms",
  "&[data-orientation='horizontal']": {
    height: "0.375rem",
    flexDirection: "column",
  },
  "&[data-orientation='vertical']": { width: "0.375rem" },
  "&[data-hovering],&[data-scrolling]": {
    opacity: 1,
    transitionDelay: "0ms",
    transitionDuration: "100ms",
  },
});

const thumbStyle = css({
  position: "relative",
  display: "flex",
  flex: "1",
  borderRadius: "full",
  backgroundColor: "color-mix(in srgb, var(--foreground) 20%, transparent)",
});

export function ScrollArea({
  className,
  children,
  scrollFade = false,
  scrollbarGutter = false,
  fill = false,
  clampContentMinWidth = true,
  overscrollContain = false,
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  scrollFade?: boolean;
  scrollbarGutter?: boolean;
  fill?: boolean;
  clampContentMinWidth?: boolean;
  overscrollContain?: boolean;
}): React.ReactElement {
  return (
    <ScrollAreaPrimitive.Root
      className={cx(rootStyle, className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cx(
          viewportStyle,
          overscrollContain && css({
            "&[data-has-overflow-y]": { overscrollBehaviorY: "contain" },
            "&[data-has-overflow-x]": { overscrollBehaviorX: "contain" },
          }),
          scrollFade && fadeStyle,
          scrollbarGutter && css({
            "&[data-has-overflow-y]": { paddingInlineEnd: "0.625rem" },
            "&[data-has-overflow-x]": { paddingBottom: "0.625rem" },
          }),
        )}
        data-slot="scroll-area-viewport"
      >
        <ScrollAreaPrimitive.Content
          className={fill ? css({ width: "100%", height: "100%" }) : undefined}
          data-slot="scroll-area-content"
          style={clampContentMinWidth ? { minWidth: 0 } : undefined}
        >
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props): React.ReactElement {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cx(scrollbarStyle, className)}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={thumbStyle}
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollAreaPrimitive };
