"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { css, cx } from "styled-system/css";

import type React from "react";

const positionerStyle = css({
  zIndex: 50,
  height: "var(--positioner-height)",
  width: "var(--positioner-width)",
  maxWidth: "var(--available-width)",
  transitionProperty: "top, left, right, bottom, transform",
  "&[data-instant]": { transition: "none" },
});

const popupStyle = css({
  position: "relative",
  display: "flex",
  height: "var(--popup-height, auto)",
  width: "var(--popup-width, auto)",
  transformOrigin: "var(--transform-origin)",
  textWrap: "balance",
  borderWidth: "1px",
  borderColor: "var(--border)",
  borderRadius: "md",
  backgroundColor: "var(--popover)",
  backgroundClip: "padding-box",
  color: "var(--popover-foreground)",
  fontSize: "xs",
  boxShadow: "0 4px 6px -1px color-mix(in srgb, black 5%, transparent)",
  transitionProperty: "width, height, scale, opacity",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "calc(var(--radius-md) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&[data-ending-style], &[data-starting-style]": {
    scale: "0.98",
    opacity: 0,
  },
  "&[data-instant]": { transitionDuration: "0ms" },
  _dark: {
    backgroundClip: "border-box",
    "&::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
  },
});

const viewportStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "clip",
  paddingInline: "var(--viewport-inline-padding)",
  paddingBlock: "0.25rem",
  "--viewport-inline-padding": "0.5rem",
  "&[data-instant]": { transition: "none" },
  "& :is([data-current][data-ending-style], [data-current][data-starting-style], [data-previous][data-ending-style], [data-previous][data-starting-style])": {
    opacity: 0,
  },
  "& :is([data-current], [data-previous])": {
    width: "calc(var(--popup-width) - 2 * var(--viewport-inline-padding) - 2px)",
    opacity: 1,
    transitionProperty: "opacity",
  },
  "& [data-previous]": { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" },
});

export const TooltipCreateHandle: typeof TooltipPrimitive.createHandle =
  TooltipPrimitive.createHandle;

export const TooltipProvider: typeof TooltipPrimitive.Provider =
  TooltipPrimitive.Provider;

export const Tooltip: typeof TooltipPrimitive.Root = TooltipPrimitive.Root;

export function TooltipTrigger(
  props: TooltipPrimitive.Trigger.Props,
): React.ReactElement {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipPopup({
  className,
  align = "center",
  sideOffset = 4,
  side = "top",
  anchor,
  children,
  portalProps,
  ...props
}: TooltipPrimitive.Popup.Props & {
  align?: TooltipPrimitive.Positioner.Props["align"];
  side?: TooltipPrimitive.Positioner.Props["side"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
  anchor?: TooltipPrimitive.Positioner.Props["anchor"];
  portalProps?: TooltipPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Portal {...portalProps}>
      <TooltipPrimitive.Positioner
        align={align}
        anchor={anchor}
        className={positionerStyle}
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cx(popupStyle, className)}
          data-slot="tooltip-popup"
          {...props}
        >
          <TooltipPrimitive.Viewport
            className={viewportStyle}
            data-slot="tooltip-viewport"
          >
            {children}
          </TooltipPrimitive.Viewport>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipPrimitive, TooltipPopup as TooltipContent };
