"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { mergeProps } from "@base-ui/react/merge-props";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useRender } from "@base-ui/react/use-render";
import { css, cx } from "styled-system/css";
import { createContext, useContext } from "react";

import type React from "react";

import {
  Cancel01Icon,
  ChevronRightIcon,
} from "@/shared/components/icons/interface-icon";
import { Button } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

type DrawerPosition = "right" | "left" | "top" | "bottom";

const DrawerContext: React.Context<{ position: DrawerPosition }> =
  createContext<{ position: DrawerPosition }>({
    position: "bottom",
  });

const directionMap: Record<
  DrawerPosition,
  DrawerPrimitive.Root.Props["swipeDirection"]
> = {
  bottom: "down",
  left: "left",
  right: "right",
  top: "up",
};

const swipeAreaBaseStyle = css({
  position: "fixed",
  zIndex: 50,
  touchAction: "none",
});

const swipeAreaPositionStyles: Record<DrawerPosition, string> = {
  bottom: css({ insetInline: 0, bottom: 0, height: "2rem" }),
  top: css({ insetInline: 0, top: 0, height: "2rem" }),
  left: css({ insetBlock: 0, left: 0, width: "2rem" }),
  right: css({ insetBlock: 0, right: 0, width: "2rem" }),
};

const backdropStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgb(0 0 0 / 0.32)",
  opacity: "calc(1 - var(--drawer-swipe-progress))",
  backdropFilter: "blur(4px)",
  transition: "opacity 450ms cubic-bezier(0.32, 0.72, 0, 1)",
  "&[data-ending-style], &[data-starting-style]": { opacity: 0 },
  "&[data-ending-style]": {
    transitionDuration: "calc(var(--drawer-swipe-strength) * 400ms)",
  },
  "&[data-swiping]": { transitionDuration: "0ms" },
  "@supports (-webkit-touch-callout: none)": { position: "absolute" },
});

const viewportBaseStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  "--bleed": "calc(var(--spacing) * 12)",
  "--inset": "0px",
  touchAction: "none",
});

const viewportPositionStyles: Record<DrawerPosition, string> = {
  bottom: css({
    display: "grid",
    gridTemplateRows: "1fr auto",
    paddingTop: "max(calc(var(--spacing) * 2), env(safe-area-inset-top, 0px))",
  }),
  top: css({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    paddingBottom: "3rem",
  }),
  left: css({ display: "flex", justifyContent: "flex-start" }),
  right: css({ display: "flex", justifyContent: "flex-end" }),
};

const viewportInsetStyle = css({
  paddingInline: "var(--inset)",
  "@media (min-width: 40rem)": { "--inset": "calc(var(--spacing) * 4)" },
});

const viewportInsetTopStyle = css({ paddingTop: "var(--inset)" });
const viewportInsetBottomStyle = css({ paddingBottom: "var(--inset)" });

const popupBaseStyle = css({
  position: "relative",
  display: "flex",
  maxHeight: "100%",
  minHeight: 0,
  width: "100%",
  minWidth: 0,
  flexDirection: "column",
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
  outline: "none",
  transitionProperty: "transform, box-shadow, height, background-color",
  transitionDuration: "450ms",
  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
  willChange: "transform",
  "--peek": "calc(var(--spacing) * 6 - 1px)",
  "--scale-base": "calc(max(0, 1 - (var(--nested-drawers) * var(--stack-step))))",
  "--scale": "clamp(0, calc(var(--scale-base) + (var(--stack-step) * var(--stack-progress))), 1)",
  "--shrink": "calc(1 - var(--scale))",
  "--stack-peek-offset": "max(0px, calc((var(--nested-drawers) - var(--stack-progress)) * var(--peek)))",
  "--stack-progress": "clamp(0, var(--drawer-swipe-progress), 1)",
  "--stack-step": "0.05",
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&::after": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    backgroundColor: "var(--popover)",
  },
  "&[data-swiping]": { userSelect: "none" },
  "&[data-nested-drawer-open]": {
    overflow: "hidden",
    backgroundColor: "color-mix(in srgb, var(--popover), black calc(2% * (var(--nested-drawers) - var(--stack-progress))))",
  },
  "&[data-ending-style], &[data-starting-style]": { boxShadow: "0 10px 15px -3px transparent" },
  "&[data-ending-style]": {
    transitionDuration: "calc(var(--drawer-swipe-strength) * 400ms)",
  },
  ".dark &::before": {
    boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
  },
  ".dark &[data-nested-drawer-open]": {
    backgroundColor: "color-mix(in srgb, var(--popover), black calc(6% * (var(--nested-drawers) - var(--stack-progress))))",
  },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
});

const popupPositionStyles: Record<DrawerPosition, string> = {
  bottom: css({
    transform: "translateY(calc(var(--keyboard-snap-offset) + var(--drawer-swipe-movement-y)))",
    gridRowStart: 2,
    marginBottom: "calc(-1 * max(0px, calc(var(--keyboard-snap-offset) + clamp(0, 1, var(--keyboard-snap-offset) / 1px) * var(--drawer-swipe-movement-y, 0px))))",
    borderTopWidth: "1px",
    paddingBottom: "max(0px, calc(max(env(safe-area-inset-bottom, 0px), var(--drawer-keyboard-inset, 0px)) + var(--keyboard-snap-offset) + clamp(0, 1, var(--keyboard-snap-offset) / 1px) * var(--drawer-swipe-movement-y, 0px)))",
    "--keyboard-snap-offset": "max(0px, calc(var(--drawer-snap-point-offset, 0px) - var(--drawer-keyboard-inset, 0px)))",
    "&[data-ending-style], &[data-starting-style]": {
      transform: "translateY(calc(100% + env(safe-area-inset-bottom, 0px) + var(--inset)))",
      marginBottom: 0,
      paddingBottom: 0,
    },
    "&:not([data-starting-style]):not([data-ending-style])": {
      transitionProperty: "transform, box-shadow, height, background-color, margin, padding",
    },
    "&::after": {
      insetInline: 0,
      top: "100%",
      height: "var(--bleed)",
    },
    "&:has([data-slot='drawer-bar'])": { paddingTop: "0.5rem" },
  }),
  top: css({
    transform: "translateY(var(--drawer-swipe-movement-y))",
    borderBottomWidth: "1px",
    "&[data-starting-style], &[data-ending-style]": {
      transform: "translateY(calc(-100% - var(--inset)))",
    },
    "&::after": {
      insetInline: 0,
      bottom: "100%",
      height: "var(--bleed)",
    },
    "&:has([data-slot='drawer-bar'])": { paddingBottom: "0.5rem" },
  }),
  left: css({
    transform: "translateX(var(--drawer-swipe-movement-x))",
    width: "calc(100% - var(--spacing) * 12)",
    maxWidth: "28rem",
    borderInlineEndWidth: "1px",
    "&[data-starting-style], &[data-ending-style]": {
      transform: "translateX(calc(-100% - var(--inset)))",
    },
    "&::after": {
      insetBlock: 0,
      insetInlineEnd: "100%",
      width: "var(--bleed)",
    },
    "&:has([data-slot='drawer-bar'])": { paddingInlineEnd: "0.5rem" },
  }),
  right: css({
    transform: "translateX(var(--drawer-swipe-movement-x))",
    gridColumnStart: 2,
    width: "calc(100% - var(--spacing) * 12)",
    maxWidth: "28rem",
    borderInlineStartWidth: "1px",
    "&[data-starting-style], &[data-ending-style]": {
      transform: "translateX(calc(100% + var(--inset)))",
    },
    "&::after": {
      insetBlock: 0,
      insetInlineStart: "100%",
      width: "var(--bleed)",
    },
    "&:has([data-slot='drawer-bar'])": { paddingInlineStart: "0.5rem" },
  }),
};

const popupRoundedStyles: Record<DrawerPosition, string> = {
  bottom: css({ borderTopLeftRadius: "var(--radius-2xl)", borderTopRightRadius: "var(--radius-2xl)" }),
  top: css({
    borderBottomLeftRadius: "var(--radius-2xl)",
    borderBottomRightRadius: "var(--radius-2xl)",
    "& [data-slot='drawer-footer']": {
      borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)",
      borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)",
    },
  }),
  left: css({
    borderTopRightRadius: "var(--radius-2xl)",
    borderBottomRightRadius: "var(--radius-2xl)",
    "& [data-slot='drawer-footer']": { borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)" },
  }),
  right: css({
    borderTopLeftRadius: "var(--radius-2xl)",
    borderBottomLeftRadius: "var(--radius-2xl)",
    "& [data-slot='drawer-footer']": { borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)" },
  }),
};

const popupDefaultBeforeStyles: Record<DrawerPosition, string> = {
  bottom: css({ "&::before": { borderTopLeftRadius: "calc(var(--radius-2xl) - 1px)", borderTopRightRadius: "calc(var(--radius-2xl) - 1px)" } }),
  top: css({ "&::before": { borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)", borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)" } }),
  left: css({ "&::before": { borderTopRightRadius: "calc(var(--radius-2xl) - 1px)", borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)" } }),
  right: css({ "&::before": { borderTopLeftRadius: "calc(var(--radius-2xl) - 1px)", borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)" } }),
};

const popupInsetStyle = css({
  "&::before": { display: "none" },
  "@media (min-width: 40rem)": {
    borderRadius: "var(--radius-2xl)",
    borderWidth: "1px",
    "&::after": { backgroundColor: "transparent" },
    "&::before": { display: "block", borderRadius: "calc(var(--radius-2xl) - 1px)" },
    "& [data-slot='drawer-footer']": {
      borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)",
      borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)",
    },
  },
});

const popupVerticalSizeStyle = css({
  height: "var(--drawer-height, auto)",
  "--height": "max(0px, var(--drawer-frontmost-height, var(--drawer-height)))",
  "&[data-nested-drawer-open]": { height: "var(--height)" },
});

const popupNestedTransforms: Record<DrawerPosition, string> = {
  bottom: css({
    transformOrigin: "50% calc(100% - var(--inset))",
    "&[data-nested-drawer-open]": {
      transform: "translateY(calc(var(--drawer-swipe-movement-y) - var(--stack-peek-offset) - (var(--shrink) * var(--height)))) scale(var(--scale))",
    },
  }),
  top: css({
    transformOrigin: "50% var(--inset)",
    "&[data-nested-drawer-open]": {
      transform: "translateY(calc(var(--drawer-swipe-movement-y) + var(--stack-peek-offset) + (var(--shrink) * var(--height)))) scale(var(--scale))",
    },
  }),
  left: css({
    transformOrigin: "right",
    "&[data-nested-drawer-open]": {
      transform: "translateX(calc(var(--drawer-swipe-movement-x) + var(--stack-peek-offset))) scale(var(--scale))",
    },
  }),
  right: css({
    transformOrigin: "left",
    "&[data-nested-drawer-open]": {
      transform: "translateX(calc(var(--drawer-swipe-movement-x) - var(--stack-peek-offset))) scale(var(--scale))",
    },
  }),
};

const closeButtonStyle = css({
  position: "absolute",
  insetInlineEnd: "0.5rem",
  top: "0.5rem",
  zIndex: 1,
});

const headerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1.5rem",
  ":where([data-slot='drawer-popup']:has([data-slot='drawer-panel'])) &": {
    paddingBottom: "0.75rem",
  },
  "@media (max-width: 39.999rem)": { paddingBottom: "1rem" },
});

const footerBaseStyle = css({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "0.5rem",
  paddingInline: "1.5rem",
    "@media (min-width: 40rem)": {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const footerDefaultStyle = css({
  borderTopWidth: "1px",
  backgroundColor: "color-mix(in srgb, var(--muted) 72%, transparent)",
  paddingTop: "1rem",
  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + var(--spacing) * 4)",
});

const footerBareStyle = css({
  paddingTop: "1rem",
  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + var(--spacing) * 6)",
  ":where([data-slot='drawer-popup']:has([data-slot='drawer-panel'])) &": {
    paddingTop: "0.75rem",
  },
});

const titleStyle = css({
  fontFamily: "var(--font-sans)",
  fontSize: "1.25rem",
  fontWeight: "bold",
  lineHeight: 1,
});

const descriptionStyle = css({
  color: "var(--muted-foreground)",
  fontSize: "0.875rem",
});

const panelStyle = css({
  padding: "1.5rem",
  ":where([data-slot='drawer-popup']:has([data-slot='drawer-header'])) &": {
    paddingTop: "0.25rem",
  },
  ":where([data-slot='drawer-popup']:has([data-slot='drawer-footer']:not(.border-t))) &": {
    paddingBottom: "0.25rem",
  },
});

const panelScrollStyle = css({
  touchAction: "auto",
  "& [data-slot='scroll-area-viewport']": { paddingBottom: "0 !important" },
});

const barBaseStyle = css({
  position: "absolute",
  display: "flex",
  touchAction: "none",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.75rem",
  "&::before": {
    content: '""',
    borderRadius: "9999px",
    backgroundColor: "var(--input)",
  },
});

const barOrientationStyles = {
  horizontal: css({ insetBlock: 0, "&::before": { height: "3rem", width: "0.25rem" } }),
  vertical: css({ insetInline: 0, "&::before": { height: "0.25rem", width: "3rem" } }),
};

const menuStyle = css({ margin: "-0.5rem", display: "flex", flexDirection: "column" });

const menuItemStyle = css({
  display: "flex",
  minHeight: "2.25rem",
  width: "100%",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "var(--radius-sm)",
  paddingInline: "0.5rem",
  paddingBlock: "0.25rem",
  color: "var(--foreground)",
  fontSize: "1rem",
  outline: "none",
  "&:hover": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "&:disabled, &[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-variant='destructive']": { color: "var(--destructive-foreground)" },
  "& > svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& > svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& > svg": { pointerEvents: "none", marginInline: "-0.125rem", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    minHeight: "2rem",
    fontSize: "0.875rem",
    "& > svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

const menuGridItemStyle = css({
  display: "grid",
  minHeight: "2.25rem",
  width: "100%",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "var(--radius-sm)",
  paddingInline: "0.5rem",
  paddingBlock: "0.25rem",
  color: "var(--foreground)",
  fontSize: "1rem",
  outline: "none",
  "&:hover": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "& svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", marginInline: "-0.125rem", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    minHeight: "2rem",
    fontSize: "0.875rem",
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

const menuCheckboxIndicatorStyle = css({
  position: "relative",
  gridColumnStart: 2,
  display: "inline-flex",
  height: "calc(var(--thumb-size) + 2px)",
  width: "calc(var(--thumb-size) * 2 - 2px)",
  flexShrink: 0,
  alignItems: "center",
  borderRadius: "9999px",
  padding: "1px",
  outline: "none",
  boxShadow: "inset 0 1px 0 color-mix(in srgb, black 4%, transparent)",
  transition: "background-color 200ms, box-shadow 200ms",
  "--thumb-size": "1rem",
  "&:focus-visible": {
    boxShadow: "0 0 0 2px var(--ring), 0 0 0 3px var(--background)",
  },
  "&[data-checked]": { backgroundColor: "var(--primary)" },
  "&[data-unchecked]": { backgroundColor: "var(--input)" },
  "&[data-disabled]": { opacity: 0.64 },
  "@media (min-width: 40rem)": { "--thumb-size": "0.75rem" },
});

const menuSwitchThumbStyle = css({
  pointerEvents: "none",
  display: "block",
  aspectRatio: "1",
  height: "100%",
  transformOrigin: "left center",
  borderRadius: "var(--thumb-size)",
  backgroundColor: "var(--background)",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  willChange: "transform",
  transition: "translate 150ms, border-radius 150ms, scale 100ms 100ms, transform-origin 150ms",
  ":where([data-slot='drawer-menu-checkbox-item'][data-checked]) &": {
    transformOrigin: "var(--thumb-size) 50%",
    translate: "calc(var(--thumb-size) - 4px) 0",
  },
  ":where([data-slot='drawer-menu-checkbox-item']:active:not([data-disabled])) &": {
    scale: "1.1 1",
    borderRadius: "var(--thumb-size) / calc(var(--thumb-size) * 1.1)",
  },
  ":where([dir='rtl']) &": { transformOrigin: "right center" },
  ":where([dir='rtl'] [data-slot='drawer-menu-checkbox-item'][data-checked]) &": {
    transformOrigin: "left center",
    translate: "calc((var(--thumb-size) - 4px) * -1) 0",
  },
});

const menuSeparatorStyle = css({
  marginInline: "0.5rem",
  marginBlock: "0.25rem",
  height: "1px",
  backgroundColor: "var(--border)",
});

const menuGroupStyle = css({ display: "flex", flexDirection: "column" });

const menuGroupLabelStyle = css({
  paddingInline: "0.5rem",
  paddingBlock: "0.375rem",
  fontWeight: "medium",
  color: "var(--muted-foreground)",
  fontSize: "0.75rem",
});

const menuTriggerStyle = css({
  display: "flex",
  minHeight: "2.25rem",
  width: "100%",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "var(--radius-sm)",
  paddingInline: "0.5rem",
  paddingBlock: "0.25rem",
  color: "var(--foreground)",
  fontSize: "1rem",
  outline: "none",
  "&:hover": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "& svg:not(:last-child)": { marginInline: "-0.125rem" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    minHeight: "2rem",
    fontSize: "0.875rem",
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

const menuRadioGroupStyle = css({ display: "flex", flexDirection: "column" });

const menuRadioItemStyle = css({
  display: "grid",
  gridTemplateColumns: "1rem minmax(0, 1fr)",
  minHeight: "2.25rem",
  width: "100%",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "var(--radius-sm)",
  paddingInlineStart: "0.5rem",
  paddingInlineEnd: "1rem",
  paddingBlock: "0.25rem",
  color: "var(--foreground)",
  fontSize: "1rem",
  outline: "none",
  "&:hover": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "& svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", marginInline: "-0.125rem", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    minHeight: "2rem",
    fontSize: "0.875rem",
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

export const DrawerCreateHandle: typeof DrawerPrimitive.createHandle =
  DrawerPrimitive.createHandle;

export function Drawer({
  swipeDirection,
  position = "bottom",
  ...props
}: DrawerPrimitive.Root.Props & {
  position?: DrawerPosition;
}): React.ReactElement {
  return (
    <DrawerContext.Provider value={{ position }}>
      <DrawerPrimitive.Root
        swipeDirection={swipeDirection ?? directionMap[position]}
        {...props}
      />
    </DrawerContext.Provider>
  );
}

export const DrawerPortal: typeof DrawerPrimitive.Portal =
  DrawerPrimitive.Portal;

export function DrawerTrigger(
  props: DrawerPrimitive.Trigger.Props,
): React.ReactElement {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerClose(
  props: DrawerPrimitive.Close.Props,
): React.ReactElement {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerSwipeArea({
  className,
  position: positionProp,
  ...props
}: DrawerPrimitive.SwipeArea.Props & {
  position?: DrawerPosition;
}): React.ReactElement {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPrimitive.SwipeArea
      className={cx(swipeAreaBaseStyle, swipeAreaPositionStyles[position], className)}
      data-slot="drawer-swipe-area"
      {...props}
    />
  );
}

export function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Backdrop
      className={cx(backdropStyle, className)}
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

export function DrawerViewport({
  className,
  position,
  variant = "default",
  ...props
}: DrawerPrimitive.Viewport.Props & {
  position?: DrawerPosition;
  variant?: "default" | "straight" | "inset";
}): React.ReactElement {
  return (
    <DrawerPrimitive.Viewport
      className={cx(
        viewportBaseStyle,
        position ? viewportPositionStyles[position] : undefined,
        variant === "inset" ? viewportInsetStyle : undefined,
        variant === "inset" && position !== "bottom" ? viewportInsetTopStyle : undefined,
        variant === "inset" && position !== "top" ? viewportInsetBottomStyle : undefined,
        className,
      )}
      data-slot="drawer-viewport"
      {...props}
    />
  );
}

export function DrawerPopup({
  className,
  children,
  showCloseButton = false,
  position: positionProp,
  variant = "default",
  showBar = false,
  portalProps,
  ...props
}: DrawerPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  position?: DrawerPosition;
  variant?: "default" | "straight" | "inset";
  showBar?: boolean;
  portalProps?: DrawerPrimitive.Portal.Props;
}): React.ReactElement {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  const popup = (
    <DrawerPortal {...portalProps}>
      <DrawerBackdrop />
      <DrawerViewport position={position} variant={variant}>
        <DrawerPrimitive.Popup
          className={cx(
            popupBaseStyle,
            popupPositionStyles[position],
            variant !== "straight" ? popupRoundedStyles[position] : undefined,
            variant === "default" ? popupDefaultBeforeStyles[position] : undefined,
            variant === "inset" ? popupInsetStyle : undefined,
            (position === "bottom" || position === "top") ? popupVerticalSizeStyle : undefined,
            variant === "straight" ? css({ "--stack-step": "0" }) : undefined,
            popupNestedTransforms[position],
            className,
          )}
          data-slot="drawer-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DrawerPrimitive.Close
              aria-label="Close"
              className={closeButtonStyle}
              render={<Button size="icon" variant="ghost" />}
            >
              <Icon icon={Cancel01Icon} />
            </DrawerPrimitive.Close>
          )}
          {showBar && <DrawerBar />}
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  );

  return position === "bottom" ? (
    <DrawerPrimitive.VirtualKeyboardProvider>
      {popup}
    </DrawerPrimitive.VirtualKeyboardProvider>
  ) : (
    popup
  );
}

export function DrawerHeader({
  className,
  allowSelection = false,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  allowSelection?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cx(headerStyle, !allowSelection ? css({ cursor: "default" }) : undefined, className),
    "data-slot": "drawer-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });
}

export function DrawerFooter({
  className,
  variant = "default",
  allowSelection = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
  allowSelection?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cx(
      footerBaseStyle,
      !allowSelection ? css({ cursor: "default" }) : undefined,
      variant === "default" ? footerDefaultStyle : footerBareStyle,
      className,
    ),
    "data-slot": "drawer-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });
}

export function DrawerTitle({
  className,
  ...props
}: DrawerPrimitive.Title.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Title
      className={cx(titleStyle, className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Description
      className={cx(descriptionStyle, className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

export function DrawerPanel({
  className,
  scrollFade = true,
  scrollable = true,
  allowSelection = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
  scrollable?: boolean;
  allowSelection?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cx(
      panelStyle,
      !allowSelection ? css({ cursor: "default" }) : undefined,
      className,
    ),
    "data-slot": "drawer-panel",
  };

  const content = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });

  if (scrollable) {
    // The popup reserves keyboard space; extra viewport padding would overflow the panel.
    return (
      <ScrollArea
        className={panelScrollStyle}
        overscrollContain
        scrollFade={scrollFade}
      >
        {content}
      </ScrollArea>
    );
  }

  return content;
}

export function DrawerBar({
  className,
  position: positionProp,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  position?: DrawerPosition;
}): React.ReactElement {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  const horizontal = position === "left" || position === "right";
  const defaultProps = {
    "aria-hidden": true as const,
    className: cx(
      barBaseStyle,
      horizontal ? barOrientationStyles.horizontal : barOrientationStyles.vertical,
      position === "top" ? css({ bottom: 0 }) : undefined,
      position === "bottom" ? css({ top: 0 }) : undefined,
      position === "left" ? css({ right: 0 }) : undefined,
      position === "right" ? css({ left: 0 }) : undefined,
      className,
    ),
    "data-slot": "drawer-bar",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export const DrawerContent: typeof DrawerPrimitive.Content =
  DrawerPrimitive.Content;

export function DrawerMenu({
  className,
  render,
  ...props
}: useRender.ComponentProps<"nav">): React.ReactElement {
  const defaultProps = {
    className: cx(menuStyle, className),
    "data-slot": "drawer-menu",
  };

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  });
}

export function DrawerMenuItem({
  className,
  variant = "default",
  render,
  disabled,
  ...props
}: useRender.ComponentProps<"button"> & {
  variant?: "default" | "destructive";
}): React.ReactElement {
  const defaultProps = {
    className: cx(menuItemStyle, className),
    "data-slot": "drawer-menu-item",
    "data-variant": variant,
    disabled,
    type: "button" as const,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export function DrawerMenuSeparator({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cx(menuSeparatorStyle, className),
    "data-slot": "drawer-menu-separator",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DrawerMenuGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cx(menuGroupStyle, className),
    "data-slot": "drawer-menu-group",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DrawerMenuGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cx(menuGroupLabelStyle, className),
    "data-slot": "drawer-menu-group-label",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DrawerMenuTrigger({
  className,
  children,
  ...props
}: DrawerPrimitive.Trigger.Props): React.ReactElement {
  return (
    <DrawerTrigger
      className={cx(menuTriggerStyle, className)}
      data-slot="drawer-menu-trigger"
      {...props}
    >
      {children}
      <Icon icon={ChevronRightIcon} className={css({ marginInlineStart: "auto", marginInlineEnd: "-0.125rem", opacity: 0.8 })} />
    </DrawerTrigger>
  );
}

export function DrawerMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  variant = "default",
  disabled,
  render,
  ...props
}: CheckboxPrimitive.Root.Props & {
  variant?: "default" | "switch";
  render?: React.ReactElement;
}): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      className={cx(
        menuGridItemStyle,
        css(
          variant === "switch"
            ? { gridTemplateColumns: "minmax(0, 1fr) auto", gap: "1rem", paddingInlineEnd: "0.375rem" }
            : { gridTemplateColumns: "1rem minmax(0, 1fr)", paddingInlineEnd: "1rem" },
        ),
        className,
      )}
      data-slot="drawer-menu-checkbox-item"
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      render={render}
      {...props}
    >
      {variant === "switch" ? (
        <>
          <span className={css({ overflowWrap: "anywhere", gridColumnStart: 1, minWidth: 0 })}>{children}</span>
          <CheckboxPrimitive.Indicator
            className={menuCheckboxIndicatorStyle}
            keepMounted
          >
            <span className={menuSwitchThumbStyle} />
          </CheckboxPrimitive.Indicator>
        </>
      ) : (
        <>
          <CheckboxPrimitive.Indicator className={css({ gridColumnStart: 1 })}>
            <svg
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Checkbox</title>
              <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
            </svg>
          </CheckboxPrimitive.Indicator>
          <span className={css({ overflowWrap: "anywhere", gridColumnStart: 2, minWidth: 0 })}>{children}</span>
        </>
      )}
    </CheckboxPrimitive.Root>
  );
}

export function DrawerMenuRadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cx(menuRadioGroupStyle, className)}
      data-slot="drawer-menu-radio-group"
      {...props}
    />
  );
}

export function DrawerMenuRadioItem({
  className,
  children,
  value,
  disabled,
  render,
  ...props
}: RadioPrimitive.Root.Props & {
  value: string;
  render?: React.ReactElement;
}): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cx(menuRadioItemStyle, className)}
      data-slot="drawer-menu-radio-item"
      disabled={disabled}
      render={render}
      value={value}
      {...props}
    >
      <RadioPrimitive.Indicator className={css({ gridColumnStart: 1 })}>
        <svg
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Radio Button</title>
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      </RadioPrimitive.Indicator>
      <span className={css({ overflowWrap: "anywhere", gridColumnStart: 2, minWidth: 0 })}>{children}</span>
    </RadioPrimitive.Root>
  );
}

export { DrawerPrimitive };
