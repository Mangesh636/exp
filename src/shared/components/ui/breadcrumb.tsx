"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cx } from "styled-system/css";

import type * as React from "react";

import {
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

export function Breadcrumb({
  ...props
}: React.ComponentProps<"nav">): React.ReactElement {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

export function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">): React.ReactElement {
  return (
    <ol
      className={cx(
        css({
          display: "flex",
          flexWrap: "wrap",
          overflowWrap: "break-word",
          alignItems: "center",
          gap: "1.5",
          color: "var(--muted-foreground)",
          fontSize: "sm",
          "@media (min-width: 40rem)": { gap: "2.5" },
        }),
        className,
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return (
    <li
      className={cx(css({ display: "inline-flex", alignItems: "center", gap: "1.5" }), className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

export function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">): React.ReactElement {
  const defaultProps = {
    className: cx(
      css({
        transitionProperty: "color",
        "&:hover": { color: "var(--foreground)" },
      }),
      className,
    ),
    "data-slot": "breadcrumb-link",
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-current="page"
      className={cx(css({ fontWeight: "normal", color: "var(--foreground)" }), className)}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return (
    <li
      aria-hidden="true"
      className={cx(
        css({ opacity: 0.8, "& > svg": { width: "1rem", height: "1rem" } }),
        className,
      )}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <Icon icon={ChevronRightIcon} />}
    </li>
  );
}

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-hidden="true"
      className={className}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <Icon icon={MoreHorizontalIcon} className={css({ width: "1rem", height: "1rem" })} />
      <span className={css({ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0 })}>More</span>
    </span>
  );
}
