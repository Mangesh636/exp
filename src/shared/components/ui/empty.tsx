import { cva, css, cx } from "../../../../styled-system/css";

import type React from "react";

const emptyMediaVariants = cva({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      pointerEvents: "none",
      flexShrink: 0,
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "transparent",
      },
      icon: {
        position: "relative",
        display: "flex",
        width: "2.25rem",
        height: "2.25rem",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "md",
        borderWidth: "1px",
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
        backgroundClip: "padding-box",
        color: "var(--foreground)",
        boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "calc(var(--radius-md) - 1px)",
          boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
        },
        "& svg:not([class*='size-'])": {
          width: "1.125rem",
          height: "1.125rem",
        },
        _dark: {
          backgroundClip: "border-box",
          "&:before": {
            boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type EmptyMediaVariant = "default" | "icon";

export function Empty({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          minWidth: 0,
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6",
          paddingX: "6",
          paddingY: "12",
          textAlign: "center",
          textWrap: "balance",
          "@media (min-width: 48rem)": { paddingY: "20" },
        }),
        className,
      )}
      data-slot="empty"
      {...props}
    />
  );
}

export function EmptyHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          maxWidth: "sm",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }),
        className,
      )}
      data-slot="empty-header"
      {...props}
    />
  );
}

export function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: EmptyMediaVariant;
}): React.ReactElement {
  const mediaClass = emptyMediaVariants({ variant });

  return (
    <div
      className={cx(css({ position: "relative", marginBottom: "6" }), className)}
      data-slot="empty-media"
      data-variant={variant}
      {...props}
    >
      {variant === "icon" && (
        <>
          <div
            aria-hidden="true"
            className={cx(
              mediaClass,
              css({
                position: "absolute",
                bottom: "1px",
                transformOrigin: "bottom left",
                translate: "-0.125rem 0",
                rotate: "-10deg",
                scale: "0.84",
                boxShadow: "none",
                pointerEvents: "none",
              }),
              className,
            )}
          />
          <div
            aria-hidden="true"
            className={cx(
              mediaClass,
              css({
                position: "absolute",
                bottom: "1px",
                transformOrigin: "bottom right",
                translate: "0.125rem 0",
                rotate: "10deg",
                scale: "0.84",
                boxShadow: "none",
                pointerEvents: "none",
              }),
              className,
            )}
          />
        </>
      )}
      <div className={cx(mediaClass, className)} {...props} />
    </div>
  );
}

export function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          fontWeight: "bold",
          fontFamily: "sans",
          fontSize: "xl",
        }),
        className,
      )}
      data-slot="empty-title"
      {...props}
    />
  );
}

export function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          color: "var(--muted-foreground)",
          fontSize: "sm",
          "& > a": {
            textDecorationLine: "underline",
            textUnderlineOffset: "4px",
          },
          "& > a:hover": { color: "var(--primary)" },
          "[data-slot='empty-title'] + &": { marginTop: "1" },
        }),
        className,
      )}
      data-slot="empty-description"
      {...props}
    />
  );
}

export function EmptyContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          width: "100%",
          minWidth: 0,
          maxWidth: "sm",
          flexDirection: "column",
          alignItems: "center",
          gap: "4",
          textWrap: "balance",
          fontSize: "sm",
        }),
        className,
      )}
      data-slot="empty-content"
      {...props}
    />
  );
}
