"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

import { Cancel01Icon } from "@/shared/components/icons/interface-icon";
import { Button } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

const backdropStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgb(0 0 0 / 0.32)",
  backdropFilter: "blur(4px)",
  transition: "all 200ms",
  "&[data-ending-style], &[data-starting-style]": { opacity: 0 },
  "@supports (-webkit-touch-callout: none)": { position: "absolute" },
});

const viewportStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "grid",
  gridTemplateRows: "1fr auto 3fr",
  justifyItems: "center",
  padding: "1rem",
});

const mobileViewportStyle = css({
  "@media (max-width: 39.999rem)": {
    gridTemplateRows: "1fr auto",
    padding: 0,
    paddingTop: "3rem",
  },
});

const popupStyle = css({
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
  borderWidth: "1px",
  borderRadius: "1rem",
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  opacity: "calc(1 - var(--nested-dialogs))",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
  outline: "none",
  transition: "scale 200ms ease-in-out, opacity 200ms ease-in-out, translate 200ms ease-in-out",
  willChange: "transform",
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--radius-2xl) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&[data-ending-style], &[data-starting-style]": { opacity: 0 },
  "@media (prefers-reduced-motion: reduce)": { transition: "opacity 200ms ease-in-out" },
  "@media (min-width: 40rem)": {
    scale: "calc(1 - 0.1 * var(--nested-dialogs))",
    "&[data-ending-style], &[data-starting-style]": {
      "@media (prefers-reduced-motion: no-preference)": { scale: "0.98" },
    },
  },
  ".dark &::before": {
    boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
  },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
});

const mobilePopupStyle = css({
  "@media (max-width: 39.999rem)": {
    maxWidth: "none",
    transformOrigin: "bottom",
    borderRadius: 0,
    borderInlineWidth: 0,
    borderTopWidth: "1px",
    borderBottomWidth: 0,
    "&[data-ending-style], &[data-starting-style]": {
      "@media (prefers-reduced-motion: no-preference)": { translate: "0 1rem" },
    },
    "&::before": { display: "none", borderRadius: 0 },
  },
});

const headerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1.5rem",
  ":where([data-slot='dialog-popup']:has([data-slot='dialog-panel'])) &": {
    paddingBottom: "0.75rem",
  },
  "@media (max-width: 39.999rem)": { paddingBottom: "1rem" },
});

const footerStyle = css({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "0.5rem",
  paddingInline: "1.5rem",
  "@media (min-width: 40rem)": {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomLeftRadius: "calc(var(--radius-2xl) - 1px)",
    borderBottomRightRadius: "calc(var(--radius-2xl) - 1px)",
  },
});

const footerDefaultStyle = css({
  borderTopWidth: "1px",
  backgroundColor: "color-mix(in srgb, var(--muted) 72%, transparent)",
  paddingBlock: "1rem",
});

const footerBareStyle = css({
  paddingTop: "1rem",
  paddingBottom: "1.5rem",
  ":where([data-slot='dialog-popup']:has([data-slot='dialog-panel'])) &": {
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
  ":where([data-slot='dialog-popup']:has([data-slot='dialog-header'])) &": {
    paddingTop: "0.25rem",
  },
  ":where([data-slot='dialog-popup']:has([data-slot='dialog-footer']:not(.border-t))) &": {
    paddingBottom: "0.25rem",
  },
});

export const DialogCreateHandle: typeof DialogPrimitive.createHandle =
  DialogPrimitive.createHandle;

export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;

export const DialogPortal: typeof DialogPrimitive.Portal =
  DialogPrimitive.Portal;

export function DialogTrigger(
  props: DialogPrimitive.Trigger.Props,
): React.ReactElement {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogClose(
  props: DialogPrimitive.Close.Props,
): React.ReactElement {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <DialogPrimitive.Backdrop
      className={cx(backdropStyle, className)}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

export function DialogViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <DialogPrimitive.Viewport
      className={cx(viewportStyle, className)}
      data-slot="dialog-viewport"
      {...props}
    />
  );
}

export function DialogPopup({
  className,
  children,
  showCloseButton = true,
  bottomStickOnMobile = true,
  closeProps,
  portalProps,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  bottomStickOnMobile?: boolean;
  closeProps?: DialogPrimitive.Close.Props;
  portalProps?: DialogPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <DialogPortal {...portalProps}>
      <DialogBackdrop />
      <DialogViewport className={bottomStickOnMobile ? mobileViewportStyle : undefined}>
        <DialogPrimitive.Popup
          className={cx(
            popupStyle,
            bottomStickOnMobile ? mobilePopupStyle : undefined,
            className,
          )}
          data-slot="dialog-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className={css({ position: "absolute", insetInlineEnd: "0.5rem", top: "0.5rem" })}
              render={<Button size="icon" variant="ghost" />}
              {...closeProps}
            >
              <Icon icon={Cancel01Icon} />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  );
}

export function DialogHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cx(headerStyle, className),
    "data-slot": "dialog-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DialogFooter({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
}): React.ReactElement {
  const defaultProps = {
    className: cx(
      footerStyle,
      variant === "default" ? footerDefaultStyle : footerBareStyle,
      className,
    ),
    "data-slot": "dialog-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props): React.ReactElement {
  return (
    <DialogPrimitive.Title
      className={cx(titleStyle, className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props): React.ReactElement {
  return (
    <DialogPrimitive.Description
      className={cx(descriptionStyle, className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export function DialogPanel({
  className,
  scrollFade = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cx(panelStyle, className),
    "data-slot": "dialog-panel",
  };

  return (
    <ScrollArea overscrollContain scrollFade={scrollFade}>
      {useRender({
        defaultTagName: "div",
        props: mergeProps<"div">(defaultProps, props),
        render,
      })}
    </ScrollArea>
  );
}

export {
  DialogPrimitive,
  DialogBackdrop as DialogOverlay,
  DialogPopup as DialogContent,
};
