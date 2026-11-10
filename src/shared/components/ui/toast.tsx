"use client";

import { Toast } from "@base-ui/react/toast";
import { cx, css } from "styled-system/css";

import type React from "react";

import {
  Alert01Icon,
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  LoaderIcon,
} from "@/shared/components/icons/interface-icon";
import { buttonVariants } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";

const TOAST_ICONS = {
  error: AlertCircleIcon,
  info: InformationCircleIcon,
  loading: LoaderIcon,
  success: CheckmarkCircle01Icon,
  warning: Alert01Icon,
} as const;

type SwipeDirection = "up" | "down" | "left" | "right";

type ToastData = {
  rootProps?: Omit<
    React.ComponentProps<typeof Toast.Root>,
    "children" | "className" | "swipeDirection" | "toast"
  >;
  tooltipStyle?: boolean;
};

function getSwipeDirection(position: ToastPosition): SwipeDirection[] {
  const verticalDirection: SwipeDirection = position.startsWith("top") ? "up" : "down";
  if (position.includes("center")) return [verticalDirection];
  if (position.includes("left")) return ["left", verticalDirection];
  return ["right", verticalDirection];
}

const replayAnimationStyles = {
  errorEven: css({ animation: "toast-error-even 0.28s cubic-bezier(0.5, 1, 0.89, 1)", "@media (prefers-reduced-motion: reduce)": { animation: "none" } }),
  errorOdd: css({ animation: "toast-error-odd 0.28s cubic-bezier(0.5, 1, 0.89, 1)", "@media (prefers-reduced-motion: reduce)": { animation: "none" } }),
  successEven: css({ animation: "toast-success-even 0.32s cubic-bezier(0.5, 1, 0.89, 1)", "@media (prefers-reduced-motion: reduce)": { animation: "none" } }),
  successOdd: css({ animation: "toast-success-odd 0.32s cubic-bezier(0.5, 1, 0.89, 1)", "@media (prefers-reduced-motion: reduce)": { animation: "none" } }),
};

function upsertReplayClassName(toast: { type?: string; updateKey?: number }): string | undefined {
  const key = toast.updateKey ?? 0;
  if (key <= 0) return undefined;
  const even = key % 2 === 0;
  if (toast.type === "error") return even ? replayAnimationStyles.errorEven : replayAnimationStyles.errorOdd;
  return even ? replayAnimationStyles.successEven : replayAnimationStyles.successOdd;
}

const toastViewportStyles = css({
  position: "fixed",
  zIndex: "60",
  mx: "auto",
  display: "flex",
  w: "calc(100% - var(--toast-inset) * 2)",
  maxW: "22.5rem",
  "--toast-inset": "1rem",
  "@media (min-width: 640px)": { "--toast-inset": "2rem" },
  "&[data-position*=top]": { top: "var(--toast-inset)" },
  "&[data-position*=bottom]": { bottom: "var(--toast-inset)" },
  "&[data-position*=left]": { left: "var(--toast-inset)" },
  "&[data-position*=right]": { right: "var(--toast-inset)" },
  "&[data-position*=center]": { left: "50%", translate: "-50% 0" },
});

const toastRootStyles = css({
  position: "absolute",
  zIndex: "calc(9999 - var(--toast-index))",
  h: "var(--toast-calc-height)",
  w: "full",
  userSelect: "none",
  rounded: "lg",
  borderWidth: "1px",
  color: "popover.foreground",
  bg: "color-mix(in srgb, var(--popover), var(--color-black) calc(1% * max(0, var(--toast-index, 0))))",
  backgroundClip: "padding-box",
  boxShadow: "0 1px 2px rgb(0 0 0 / 5%)",
  transition: "transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s, height 0.15s, background-color 0.5s",
  "--toast-calc-height": "var(--toast-frontmost-height, var(--toast-height))",
  "--toast-gap": "0.75rem",
  "--toast-peek": "0.75rem",
  "--toast-scale": "calc(max(0, 1 - (var(--toast-index) * 0.1)))",
  "--toast-shrink": "calc(1 - var(--toast-scale))",
  _before: {
    content: '""', pointerEvents: "none", position: "absolute", inset: "0",
    rounded: "calc(var(--radius-lg) - 1px)", boxShadow: "0 1px rgb(0 0 0 / 4%)",
  },
  _after: {
    content: '""', position: "absolute", left: "0",
    h: "calc(var(--toast-gap) + 1px)", w: "full",
  },
  "&[data-position*=top]": {
    right: "auto", top: "0", bottom: "auto",
    transformOrigin: "50% calc(50% - 50% * min(var(--toast-index, 0), 1))",
    "--toast-calc-offset-y": "calc(var(--toast-offset-y) + var(--toast-index) * var(--toast-gap) + var(--toast-swipe-movement-y))",
    transform: "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) + (var(--toast-index) * var(--toast-peek)) + (var(--toast-shrink) * var(--toast-calc-height)))) scale(var(--toast-scale))",
    "&::after": { top: "100%" },
    "&[data-starting-style]": { "@media (prefers-reduced-motion: no-preference)": { transform: "translateY(calc(-100% - var(--toast-inset)))" } },
    "&[data-ending-style]:not([data-limited]):not([data-swipe-direction])": { "@media (prefers-reduced-motion: no-preference)": { transform: "translateY(calc(-100% - var(--toast-inset)))" } },
  },
  "&[data-position*=bottom]": {
    top: "auto", bottom: "0",
    transformOrigin: "50% calc(50% + 50% * min(var(--toast-index, 0), 1))",
    "--toast-calc-offset-y": "calc(var(--toast-offset-y) * -1 + var(--toast-index) * var(--toast-gap) * -1 + var(--toast-swipe-movement-y))",
    transform: "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * var(--toast-peek)) - (var(--toast-shrink) * var(--toast-calc-height)))) scale(var(--toast-scale))",
    "&::after": { bottom: "100%" },
    "&[data-starting-style]": { "@media (prefers-reduced-motion: no-preference)": { transform: "translateY(calc(100% + var(--toast-inset)))" } },
    "&[data-ending-style]:not([data-limited]):not([data-swipe-direction])": { "@media (prefers-reduced-motion: no-preference)": { transform: "translateY(calc(100% + var(--toast-inset)))" } },
  },
  "&[data-position*=right]": { right: "0", left: "auto" },
  "&[data-position*=left]": { right: "auto", left: "0" },
  "&[data-position*=center]": { right: "0", left: "0" },
  "&[data-limited]": { opacity: "0" },
  "&[data-expanded]": { h: "var(--toast-height)", bg: "popover" },
  "&[data-expanded][data-position]": { transform: "translateX(var(--toast-swipe-movement-x)) translateY(var(--toast-calc-offset-y))" },
  "&[data-ending-style]": { opacity: "0" },
  "@media (prefers-reduced-motion: reduce)": {
    "&[data-starting-style]": { opacity: "0" },
    transition: "opacity 0.5s, height 0.15s, background-color 0.5s",
  },
  "&[data-ending-style][data-swipe-direction=left]": { transform: "translateX(calc(var(--toast-swipe-movement-x) - 100% - var(--toast-inset))) translateY(var(--toast-calc-offset-y))" },
  "&[data-ending-style][data-swipe-direction=right]": { transform: "translateX(calc(var(--toast-swipe-movement-x) + 100% + var(--toast-inset))) translateY(var(--toast-calc-offset-y))" },
  "&[data-ending-style][data-swipe-direction=up]": { transform: "translateY(calc(var(--toast-swipe-movement-y) - 100% - var(--toast-inset)))" },
  "&[data-ending-style][data-swipe-direction=down]": { transform: "translateY(calc(var(--toast-swipe-movement-y) + 100% + var(--toast-inset)))" },
  "&[data-expanded][data-ending-style][data-swipe-direction=left]": { transform: "translateX(calc(var(--toast-swipe-movement-x) - 100% - var(--toast-inset))) translateY(var(--toast-calc-offset-y))" },
  "&[data-expanded][data-ending-style][data-swipe-direction=right]": { transform: "translateX(calc(var(--toast-swipe-movement-x) + 100% + var(--toast-inset))) translateY(var(--toast-calc-offset-y))" },
  "&[data-expanded][data-ending-style][data-swipe-direction=up]": { transform: "translateY(calc(var(--toast-swipe-movement-y) - 100% - var(--toast-inset)))" },
  "&[data-expanded][data-ending-style][data-swipe-direction=down]": { transform: "translateY(calc(var(--toast-swipe-movement-y) + 100% + var(--toast-inset)))" },
  _dark: {
    bg: "color-mix(in srgb, var(--popover), var(--color-black) calc(6% * max(0, var(--toast-index, 0))))",
    "&[data-expanded]": { bg: "popover" },
    _before: { boxShadow: "0 -1px rgb(255 255 255 / 6%)" },
  },
});

const toastContentStyles = css({
  pointerEvents: "auto", display: "flex", alignItems: "center", justifyContent: "space-between",
  gap: "0.375rem", overflow: "hidden", px: "0.875rem", py: "0.75rem", fontSize: "sm",
  transition: "opacity 250ms",
  "&[data-behind]:not([data-expanded])": { pointerEvents: "none", opacity: "0" },
  "&[data-expanded]": { opacity: "1" },
});

const toastIconStyles = css({
  "& > svg": { h: "1lh", w: "1rem" },
  "& svg": { pointerEvents: "none", flexShrink: "0" },
});

const toastIconColorStyles = css({
  "&:where([data-type=loading] *)": { animation: "spin 1s linear infinite", opacity: "0.8" },
  "&:where([data-type=error] *)": { color: "destructive" },
  "&:where([data-type=info] *)": { color: "info" },
  "&:where([data-type=success] *)": { color: "success" },
  "&:where([data-type=warning] *)": { color: "warning" },
});

const anchoredToastStyles = css({
  position: "relative", textWrap: "balance", borderWidth: "1px", bg: "popover",
  backgroundClip: "padding-box", color: "popover.foreground", fontSize: "xs",
  transition: "scale 150ms, opacity 150ms",
  _before: { content: '""', pointerEvents: "none", position: "absolute", inset: "0", boxShadow: "0 1px rgb(0 0 0 / 4%)" },
  "&[data-ending-style], &[data-starting-style]": {
    opacity: "0",
    "@media (prefers-reduced-motion: no-preference)": { scale: "0.98" },
  },
  _dark: { _before: { boxShadow: "0 -1px rgb(255 255 255 / 6%)" } },
});

function Toasts({ position, portalProps }: {
  position: ToastPosition;
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}): React.ReactElement {
  const { toasts } = Toast.useToastManager();
  const swipeDirection = getSwipeDirection(position);

  return (
    <Toast.Portal data-slot="toast-portal" {...portalProps}>
      <Toast.Viewport className={toastViewportStyles} data-position={position} data-slot="toast-viewport">
        {toasts.map((toast) => {
          const ToastIcon = toast.type ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] : null;
          const toastData = toast.data as ToastData | undefined;
          return (
            <Toast.Root
              key={toast.id}
              className={cx(toastRootStyles, upsertReplayClassName(toast))}
              {...toastData?.rootProps}
              data-position={position}
              swipeDirection={swipeDirection}
              toast={toast}
            >
              <Toast.Content className={toastContentStyles}>
                <div className={css({ display: "flex", gap: "2" })}>
                  {ToastIcon && (
                    <div className={toastIconStyles} data-slot="toast-icon">
                      <Icon icon={ToastIcon} className={toastIconColorStyles} />
                    </div>
                  )}
                  <div className={css({ display: "flex", flexDirection: "column", gap: "0.125rem" })}>
                    <Toast.Title className={css({ fontWeight: "medium" })} data-slot="toast-title" />
                    <Toast.Description className={css({ color: "muted.foreground" })} data-slot="toast-description" />
                  </div>
                </div>
                {toast.actionProps && (
                  <Toast.Action className={buttonVariants({ size: "xs" })} data-slot="toast-action">
                    {toast.actionProps.children}
                  </Toast.Action>
                )}
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function AnchoredToasts({ portalProps }: {
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}): React.ReactElement {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal data-slot="toast-portal-anchored" {...portalProps}>
      <Toast.Viewport className={css({ outline: "none" })} data-slot="toast-viewport-anchored">
        {toasts.map((toast) => {
          const ToastIcon = toast.type ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] : null;
          const toastData = toast.data as ToastData | undefined;
          const tooltipStyle = toastData?.tooltipStyle ?? false;
          const positionerProps = toast.positionerProps;
          if (!positionerProps?.anchor) return null;

          return (
            <Toast.Positioner
              key={toast.id}
              className={css({ zIndex: "60", maxW: "min(16rem, var(--available-width))" })}
              data-slot="toast-positioner"
              sideOffset={positionerProps.sideOffset ?? 4}
              toast={toast}
            >
              <Toast.Root
                className={cx(
                  anchoredToastStyles,
                  tooltipStyle
                    ? css({ rounded: "md", boxShadow: "0 1px 2px rgb(0 0 0 / 5%)", _before: { rounded: "calc(var(--radius-md) - 1px)" } })
                    : css({ rounded: "lg", boxShadow: "0 1px 2px rgb(0 0 0 / 5%)", _before: { rounded: "calc(var(--radius-lg) - 1px)" } }),
                  upsertReplayClassName(toast),
                )}
                {...toastData?.rootProps}
                data-slot="toast-popup"
                toast={toast}
              >
                {tooltipStyle ? (
                  <Toast.Content className={css({ pointerEvents: "auto", px: "2", py: "1" })}>
                    <Toast.Title data-slot="toast-title" />
                  </Toast.Content>
                ) : (
                  <Toast.Content className={cx(toastContentStyles, css({ py: "0.75rem" }))}>
                    <div className={css({ display: "flex", gap: "2" })}>
                      {ToastIcon && (
                        <div className={toastIconStyles} data-slot="toast-icon">
                          <Icon icon={ToastIcon} className={toastIconColorStyles} />
                        </div>
                      )}
                      <div className={css({ display: "flex", flexDirection: "column", gap: "0.125rem" })}>
                        <Toast.Title className={css({ fontWeight: "medium" })} data-slot="toast-title" />
                        <Toast.Description className={css({ color: "muted.foreground" })} data-slot="toast-description" />
                      </div>
                    </div>
                    {toast.actionProps && (
                      <Toast.Action className={buttonVariants({ size: "xs" })} data-slot="toast-action">
                        {toast.actionProps.children}
                      </Toast.Action>
                    )}
                  </Toast.Content>
                )}
              </Toast.Root>
            </Toast.Positioner>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export const toastManager: ReturnType<typeof Toast.createToastManager> = Toast.createToastManager();
export const anchoredToastManager: ReturnType<typeof Toast.createToastManager> = Toast.createToastManager();

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProviderProps extends Toast.Provider.Props {
  position?: ToastPosition;
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  portalProps,
  ...props
}: ToastProviderProps): React.ReactElement {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <Toasts portalProps={portalProps} position={position} />
    </Toast.Provider>
  );
}

export interface AnchoredToastProviderProps extends Toast.Provider.Props {
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}

export function AnchoredToastProvider({
  children,
  portalProps,
  ...props
}: AnchoredToastProviderProps): React.ReactElement {
  return (
    <Toast.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <AnchoredToasts portalProps={portalProps} />
    </Toast.Provider>
  );
}

export { Toast as ToastPrimitive };
