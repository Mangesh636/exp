"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

const AVATAR_GROUP_CUT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E\")";

const avatarStyle = css({
  position: "relative",
  isolation: "isolate",
  display: "inline-flex",
  width: "var(--avatar-size, 2rem)",
  height: "var(--avatar-size, 2rem)",
  flexShrink: 0,
  userSelect: "none",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: "full",
  verticalAlign: "middle",
  fontWeight: "medium",
  fontSize: "calc(var(--avatar-size, 2rem) * 0.375)",
  lineHeight: 1,
});

export function Avatar({
  className,
  ...props
}: AvatarPrimitive.Root.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      className={cx(avatarStyle, className)}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cx(
        css({
          position: "absolute",
          inset: 0,
          zIndex: 10,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          objectFit: "cover",
          "&[data-error], &[data-loading]": { visibility: "hidden" },
        }),
        className,
      )}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cx(
        css({
          position: "absolute",
          inset: 0,
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "inherit",
          backgroundColor: "var(--border)",
        }),
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  topmost?: "first" | "last";
}

const avatarGroupBase = css({
  display: "flex",
  width: "fit-content",
  alignItems: "center",
  "--avatar-group-size": "var(--avatar-size, 2rem)",
  "--avatar-group-gap": "var(--avatar-gap, calc(var(--avatar-group-size) / 16))",
  "--avatar-group-overlap": "var(--avatar-overlap, calc(var(--avatar-group-size) * 0.3))",
  "--avatar-group-cut-end": "calc(var(--avatar-group-size) * 1.5 - var(--avatar-group-overlap))",
  "--avatar-group-cut-radius": "calc(var(--avatar-group-size) / 2 + var(--avatar-group-gap))",
  "--avatar-group-cut-start": "calc(var(--avatar-group-overlap) - var(--avatar-group-size) / 2)",
  "--avatar-group-mask-position": "0 0, calc(var(--avatar-group-cut-x) - var(--avatar-group-cut-radius)) 50%",
  "--avatar-group-mask-size": "100% 100%, calc(var(--avatar-group-cut-radius) * 2) calc(var(--avatar-group-cut-radius) * 2)",
  "--avatar-group-mask": "none",
  "--avatar-group-nudge": "var(--avatar-nudge, calc((var(--avatar-group-overlap) + var(--avatar-group-gap)) * 0.3))",
  "& > *:not(:first-child)": {
    marginInlineStart: "calc(var(--avatar-group-overlap) * -1)",
  },
  "@supports (mask-composite: subtract)": {
    "--avatar-group-mask": "var(--avatar-group-cut-image), var(--avatar-group-cut-image)",
  },
});

const avatarGroupFirst = css({
  "& > *:not(:first-child)": {
    maskImage: "var(--avatar-group-mask)",
    maskComposite: "subtract",
    maskPosition: "var(--avatar-group-mask-position)",
    maskRepeat: "no-repeat",
    maskSize: "var(--avatar-group-mask-size)",
    "--avatar-group-cut-x": "var(--avatar-group-cut-start)",
    "& [data-slot='avatar-fallback']": {
      paddingInlineStart: "calc(var(--avatar-group-nudge) * 2)",
    },
    "@supports (mask-composite: subtract)": { borderRadius: 0 },
  },
  "&:dir(rtl) > *:not(:first-child)": {
    "--avatar-group-cut-x": "var(--avatar-group-cut-end)",
  },
});

const avatarGroupLast = css({
  "& > *:not(:last-child)": {
    maskImage: "var(--avatar-group-mask)",
    maskComposite: "subtract",
    maskPosition: "var(--avatar-group-mask-position)",
    maskRepeat: "no-repeat",
    maskSize: "var(--avatar-group-mask-size)",
    "--avatar-group-cut-x": "var(--avatar-group-cut-end)",
    "& [data-slot='avatar-fallback']": {
      paddingInlineEnd: "calc(var(--avatar-group-nudge) * 2)",
    },
    "@supports (mask-composite: subtract)": { borderRadius: 0 },
  },
  "&:dir(rtl) > *:not(:last-child)": {
    "--avatar-group-cut-x": "var(--avatar-group-cut-start)",
  },
});

export function AvatarGroup({
  className,
  style,
  topmost = "first",
  ...props
}: AvatarGroupProps): React.ReactElement {
  return (
    <div
      className={cx(
        avatarGroupBase,
        topmost === "first" ? avatarGroupFirst : avatarGroupLast,
        className,
      )}
      data-slot="avatar-group"
      data-topmost={topmost}
      style={
        {
          "--avatar-group-cut-image": AVATAR_GROUP_CUT,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export function AvatarGroupCount({
  children,
  className,
  ...props
}: AvatarPrimitive.Root.Props): React.ReactElement {
  return (
    <Avatar
      className={cx(css({ color: "var(--muted-foreground)" }), className)}
      data-slot="avatar-group-count"
      {...props}
    >
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  );
}

export { AvatarPrimitive };
