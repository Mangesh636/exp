"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

import { Cancel01Icon } from "@/shared/components/icons/interface-icon";
import { Button } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

export const Sheet: typeof SheetPrimitive.Root = SheetPrimitive.Root;
export const SheetPortal: typeof SheetPrimitive.Portal = SheetPrimitive.Portal;

export function SheetTrigger(props: SheetPrimitive.Trigger.Props): React.ReactElement {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}
export function SheetClose(props: SheetPrimitive.Close.Props): React.ReactElement {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export function SheetBackdrop({ className, ...props }: SheetPrimitive.Backdrop.Props): React.ReactElement {
  return <SheetPrimitive.Backdrop className={cx(css({ position: "fixed", inset: "0", zIndex: "50", bg: "rgb(0 0 0 / 32%)", backdropFilter: "blur(4px)", transition: "all 200ms", "&[data-ending-style],&[data-starting-style]": { opacity: "0" }, "@supports (-webkit-touch-callout: none)": { position: "absolute" } }), className)} data-slot="sheet-backdrop" {...props} />;
}

export function SheetViewport({ className, side, variant = "default", ...props }: SheetPrimitive.Viewport.Props & { side?: "right" | "left" | "top" | "bottom"; variant?: "default" | "inset" }): React.ReactElement {
  const sideClassName = side === "bottom" ? css({ gridTemplateRows: "1fr auto", pt: "12" }) : side === "top" ? css({ gridTemplateRows: "auto 1fr", pb: "12" }) : side === "left" ? css({ display: "flex", justifyContent: "flex-start" }) : side === "right" ? css({ display: "flex", justifyContent: "flex-end" }) : undefined;
  const insetClassName = variant === "inset" ? css({ "@media (min-width: 640px)": { p: "4" } }) : undefined;
  return <SheetPrimitive.Viewport className={cx(css({ position: "fixed", inset: "0", zIndex: "50", display: "grid" }), sideClassName, insetClassName, className)} data-slot="sheet-viewport" {...props} />;
}

export function SheetPopup({ className, children, showCloseButton = true, side = "right", variant = "default", closeProps, portalProps, ...props }: SheetPrimitive.Popup.Props & { showCloseButton?: boolean; side?: "right" | "left" | "top" | "bottom"; variant?: "default" | "inset"; closeProps?: SheetPrimitive.Close.Props; portalProps?: SheetPrimitive.Portal.Props }): React.ReactElement {
  const sideClassName = side === "bottom"
    ? css({ gridRowStart: "2", borderTopWidth: "1px", "&[data-ending-style],&[data-starting-style]": { translate: "0 2rem" } })
    : side === "top"
      ? css({ borderBottomWidth: "1px", "&[data-ending-style],&[data-starting-style]": { translate: "0 -2rem" } })
      : side === "left"
        ? css({ w: "calc(100% - 3rem)", maxW: "md", borderInlineEndWidth: "1px", "&[data-ending-style],&[data-starting-style]": { translate: "-2rem 0" } })
        : css({ gridColumnStart: "2", w: "calc(100% - 3rem)", maxW: "md", borderInlineStartWidth: "1px", "&[data-ending-style],&[data-starting-style]": { translate: "2rem 0" } });
  const insetClassName = variant === "inset" ? css({
    _before: { display: "none" },
    "@media (min-width: 640px)": {
      rounded: "2xl",
      borderWidth: "1px",
      _before: { rounded: "calc(var(--radius-2xl) - 1px)" },
      "& [data-slot=sheet-footer]": {
        borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)",
        borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)",
      },
    },
  }) : undefined;

  return (
    <SheetPortal {...portalProps}>
      <SheetBackdrop />
      <SheetViewport side={side} variant={variant}>
        <SheetPrimitive.Popup
          className={cx(
            css({
              position: "relative",
              display: "flex",
              maxH: "full",
              minH: "0",
              w: "full",
              minW: "0",
              flexDirection: "column",
              bg: "popover",
              color: "popover.foreground",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 5%)",
              transition: "opacity 200ms ease-in-out, translate 200ms ease-in-out",
              willChange: "transform",
              _before: {
                content: '""',
                pointerEvents: "none",
                position: "absolute",
                inset: "0",
                boxShadow: "0 1px rgb(0 0 0 / 4%)",
              },
              "&[data-ending-style],&[data-starting-style]": { opacity: "0" },
              "@media (max-width: 639px)": { _before: { display: "none" } },
              _dark: { _before: { boxShadow: "0 -1px rgb(255 255 255 / 6%)" } },
            }),
            sideClassName,
            insetClassName,
            className,
          )}
          data-slot="sheet-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <SheetPrimitive.Close
              aria-label="Close"
              className={css({ position: "absolute", insetInlineEnd: "2", top: "2" })}
              render={<Button size="icon" variant="ghost" />}
              {...closeProps}
            >
              <Icon icon={Cancel01Icon} />
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Popup>
      </SheetViewport>
    </SheetPortal>
  );
}

export function SheetHeader({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = { className: cx(css({ display: "flex", flexDirection: "column", gap: "2", p: "6", '&:where([data-slot="sheet-popup"]:has([data-slot="sheet-panel"]) *)': { pb: "3" }, "@media (max-width: 639px)": { pb: "4" } }), className), "data-slot": "sheet-header" };
  return useRender({ defaultTagName: "div", props: mergeProps<"div">(defaultProps, props), render });
}

export function SheetFooter({ className, variant = "default", render, ...props }: useRender.ComponentProps<"div"> & { variant?: "default" | "bare" }): React.ReactElement {
  const variantStyles = variant === "default" ? { borderTopWidth: "1px", bg: "color-mix(in srgb, var(--muted) 72%, transparent)", py: "4" } : { '&:where([data-slot="sheet-popup"]:has([data-slot="sheet-panel"]) *)': { pt: "3" }, pt: "4", pb: "6" };
  const defaultProps = { className: cx(css({ display: "flex", flexDirection: "column-reverse", gap: "2", px: "6", "@media (min-width: 640px)": { flexDirection: "row", justifyContent: "flex-end" }, ...variantStyles }), className), "data-slot": "sheet-footer" };
  return useRender({ defaultTagName: "div", props: mergeProps<"div">(defaultProps, props), render });
}

export function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props): React.ReactElement {
  return <SheetPrimitive.Title className={cx(css({ fontWeight: "bold", fontFamily: "sans-serif", fontSize: "xl", lineHeight: "1" }), className)} data-slot="sheet-title" {...props} />;
}
export function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props): React.ReactElement {
  return <SheetPrimitive.Description className={cx(css({ color: "muted.foreground", fontSize: "sm" }), className)} data-slot="sheet-description" {...props} />;
}
export function SheetPanel({ className, scrollFade = true, render, ...props }: useRender.ComponentProps<"div"> & { scrollFade?: boolean }): React.ReactElement {
  const defaultProps = { className: cx(css({ p: "6", '&:where([data-slot="sheet-popup"]:has([data-slot="sheet-header"]) *)': { pt: "1" }, '&:where([data-slot="sheet-popup"]:has([data-slot="sheet-footer"]:not(.border-t)) *)': { pb: "1" } }), className), "data-slot": "sheet-panel" };
  return <ScrollArea overscrollContain scrollFade={scrollFade}>{useRender({ defaultTagName: "div", props: mergeProps<"div">(defaultProps, props), render })}</ScrollArea>;
}

export { SheetPrimitive, SheetBackdrop as SheetOverlay, SheetPopup as SheetContent };
