"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

export const AlertDialogCreateHandle: typeof AlertDialogPrimitive.createHandle =
  AlertDialogPrimitive.createHandle;
export const AlertDialog: typeof AlertDialogPrimitive.Root = AlertDialogPrimitive.Root;
export const AlertDialogPortal: typeof AlertDialogPrimitive.Portal = AlertDialogPrimitive.Portal;

export function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props): React.ReactElement {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

export function AlertDialogBackdrop({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cx(css({
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgb(0 0 0 / 0.32)",
        backdropFilter: "blur(4px)",
        transition: "all 200ms",
        "&[data-ending-style], &[data-starting-style]": { opacity: 0 },
        "@supports (-webkit-touch-callout: none)": { position: "absolute" },
      }), className)}
      data-slot="alert-dialog-backdrop"
      {...props}
    />
  );
}

export function AlertDialogViewport({
  className,
  ...props
}: AlertDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Viewport
      className={cx(css({
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "grid",
        gridTemplateRows: "1fr auto 3fr",
        justifyItems: "center",
        padding: "4",
      }), className)}
      data-slot="alert-dialog-viewport"
      {...props}
    />
  );
}

export function AlertDialogPopup({
  className,
  bottomStickOnMobile = true,
  portalProps,
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  bottomStickOnMobile?: boolean;
  portalProps?: AlertDialogPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <AlertDialogPortal {...portalProps}>
      <AlertDialogBackdrop />
      <AlertDialogViewport
        className={cx(bottomStickOnMobile && css({
          "@media (max-width: 39.999rem)": {
            gridTemplateRows: "1fr auto",
            padding: 0,
            paddingTop: "3rem",
          },
        }))}
      >
        <AlertDialogPrimitive.Popup
          className={cx(css({
            position: "relative",
            gridRowStart: 2,
            display: "flex",
            maxHeight: "100%",
            minHeight: 0,
            width: "100%",
            minWidth: 0,
            maxWidth: "32rem",
            transformOrigin: "center",
            flexDirection: "column",
            borderRadius: "2xl",
            borderWidth: "1px",
            backgroundColor: "var(--popover)",
            color: "var(--popover-foreground)",
            ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
            opacity: "calc(1 - var(--nested-dialogs))",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
            transition: "scale 200ms ease-in-out, opacity 200ms ease-in-out, translate 200ms ease-in-out",
            willChange: "transform",
            "&:before": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "calc(var(--radius-2xl) - 1px)",
              boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
            },
            "&[data-ending-style], &[data-starting-style]": { opacity: 0 },
            "@media (min-width: 40rem)": {
              transform: "scale(calc(1 - 0.1 * var(--nested-dialogs)))",
              "&[data-ending-style], &[data-starting-style]": { transform: "scale(0.98)" },
            },
            _dark: {
              backgroundClip: "border-box",
              "&:before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" },
            },
            ...(bottomStickOnMobile ? {
              "@media (max-width: 39.999rem)": {
                maxWidth: "none",
                transformOrigin: "bottom",
                borderRadius: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: "1px",
                borderBottomWidth: 0,
                "&[data-ending-style], &[data-starting-style]": { translate: "0 1rem" },
                "&:before": { display: "none", borderRadius: 0 },
              },
            } : {}),
          }), className)}
          data-slot="alert-dialog-popup"
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(css({
        display: "flex",
        flexDirection: "column",
        gap: "2",
        padding: "6",
        textAlign: "center",
        "@media (min-width: 40rem)": { textAlign: "left" },
        "@media (max-width: 39.999rem)": { paddingBottom: "4" },
      }), className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "bare" }): React.ReactElement {
  return (
    <div
      className={cx(css({
        display: "flex",
        flexDirection: "column-reverse",
        gap: "2",
        paddingX: "6",
        "@media (min-width: 40rem)": {
          flexDirection: "row",
          justifyContent: "flex-end",
          borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)",
          borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)",
        },
        ...(variant === "default" ? {
          borderTopWidth: "1px",
          backgroundColor: "color-mix(in srgb, var(--muted) 72%, transparent)",
          paddingY: "4",
        } : { paddingBottom: "6" }),
      }), className)}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      className={cx(css({ fontWeight: "bold", fontFamily: "sans", fontSize: "xl", lineHeight: 1 }), className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Description
      className={cx(css({ color: "var(--muted-foreground)", fontSize: "sm" }), className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

export function AlertDialogClose(props: AlertDialogPrimitive.Close.Props): React.ReactElement {
  return <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />;
}

export {
  AlertDialogPrimitive,
  AlertDialogBackdrop as AlertDialogOverlay,
  AlertDialogPopup as AlertDialogContent,
};
