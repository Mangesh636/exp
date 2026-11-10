"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { css, cx } from "../../../../styled-system/css";

import type React from "react";

export const PopoverCreateHandle: typeof PopoverPrimitive.createHandle =
  PopoverPrimitive.createHandle;

export const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root;

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
  borderWidth: "1px",
  borderColor: "var(--border)",
  borderRadius: "lg",
  backgroundColor: "var(--popover)",
  backgroundClip: "padding-box",
  color: "var(--popover-foreground)",
  boxShadow: "0 10px 15px -3px color-mix(in srgb, black 5%, transparent)",
  outline: "none",
  transitionProperty: "width, height, scale, opacity",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "calc(var(--radius-lg) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&:has([data-slot='calendar'])": {
    borderRadius: "xl",
    "&::before": { borderRadius: "calc(var(--radius-xl) - 1px)" },
  },
  "&[data-starting-style]": { scale: "0.98", opacity: 0 },
  "&:focus": { outline: "none" },
  _dark: {
    backgroundClip: "border-box",
    "&::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
  },
});

const tooltipPopupStyle = css({
  width: "fit-content",
  borderRadius: "md",
  fontSize: "xs",
  boxShadow: "0 4px 6px -1px color-mix(in srgb, black 5%, transparent)",
  "&::before": { borderRadius: "calc(var(--radius-md) - 1px)" },
});

const viewportStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  maxHeight: "var(--available-height)",
  overflow: "clip",
  paddingInline: "var(--viewport-inline-padding)",
  paddingBlock: "1rem",
  "--viewport-inline-padding": "1rem",
  "&:has([data-slot='calendar'])": { padding: "0.5rem" },
  "&[data-instant]": { transition: "none" },
  "& :is([data-current][data-ending-style],[data-current][data-starting-style],[data-previous][data-ending-style],[data-previous][data-starting-style])": {
    opacity: 0,
  },
  "& :is([data-current],[data-previous])": {
    width: "calc(var(--popup-width) - 2 * var(--viewport-inline-padding) - 2px)",
    opacity: 1,
    transitionProperty: "opacity",
  },
  "&:not([data-transitioning])": { overflowY: "auto" },
});

const tooltipViewportStyle = css({
  paddingBlock: "0.25rem",
  "--viewport-inline-padding": "0.5rem",
});

const titleStyle = css({
  fontSize: "lg",
  fontWeight: "semibold",
  lineHeight: 1,
});

const descriptionStyle = css({
  fontSize: "sm",
  color: "var(--muted-foreground)",
});

export function PopoverTrigger({
  className,
  children,
  ...props
}: PopoverPrimitive.Trigger.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Trigger
      className={className}
      data-slot="popover-trigger"
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
}

export function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  tooltipStyle = false,
  anchor,
  portalProps,
  ...props
}: PopoverPrimitive.Popup.Props & {
  portalProps?: PopoverPrimitive.Portal.Props;
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  tooltipStyle?: boolean;
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
}): React.ReactElement {
  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={positionerStyle}
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cx(popupStyle, tooltipStyle && tooltipPopupStyle, className)}
          data-slot="popover-popup"
          {...props}
        >
          <PopoverPrimitive.Viewport
            className={cx(
              viewportStyle,
              tooltipStyle && tooltipViewportStyle,
            )}
            data-slot="popover-viewport"
          >
            {children}
          </PopoverPrimitive.Viewport>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverClose({
  ...props
}: PopoverPrimitive.Close.Props): React.ReactElement {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export function PopoverTitle({
  className,
  ...props
}: PopoverPrimitive.Title.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Title
      className={cx(titleStyle, className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

export function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Description
      className={cx(descriptionStyle, className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

export { PopoverPrimitive, PopoverPopup as PopoverContent };
