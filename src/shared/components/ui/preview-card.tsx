"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { css, cx } from "styled-system/css";

import type React from "react";

export const PreviewCard: typeof PreviewCardPrimitive.Root =
  PreviewCardPrimitive.Root;

const positionerStyle = css({ zIndex: 50 });

const popupStyle = css({
  position: "relative",
  display: "flex",
  width: "16rem",
  transformOrigin: "var(--transform-origin)",
  borderWidth: "1px",
  borderColor: "var(--border)",
  borderRadius: "lg",
  backgroundColor: "var(--popover)",
  backgroundClip: "padding-box",
  padding: "1rem",
  color: "var(--popover-foreground)",
  fontSize: "sm",
  textWrap: "balance",
  boxShadow: "0 10px 15px -3px color-mix(in srgb, black 5%, transparent)",
  transitionProperty: "scale, opacity",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "calc(var(--radius-lg) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&[data-ending-style],&[data-starting-style]": { scale: "0.98", opacity: 0 },
  _dark: {
    backgroundClip: "border-box",
    "&::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
  },
});

export function PreviewCardTrigger({
  ...props
}: PreviewCardPrimitive.Trigger.Props): React.ReactElement {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  );
}

export function PreviewCardPopup({
  className,
  children,
  align = "center",
  sideOffset = 4,
  anchor,
  portalProps,
  ...props
}: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
  anchor?: PreviewCardPrimitive.Positioner.Props["anchor"];
  portalProps?: PreviewCardPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <PreviewCardPrimitive.Portal {...portalProps}>
      <PreviewCardPrimitive.Positioner
        align={align}
        anchor={anchor}
        className={positionerStyle}
        data-slot="preview-card-positioner"
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          className={cx(popupStyle, className)}
          data-slot="preview-card-content"
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export {
  PreviewCardPrimitive,
  PreviewCard as HoverCard,
  PreviewCardTrigger as HoverCardTrigger,
  PreviewCardPopup as HoverCardContent,
};
