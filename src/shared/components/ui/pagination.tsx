"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cx } from "../../../../styled-system/css";

import type * as React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "@/shared/components/icons/interface-icon";
import { type Button, buttonVariants } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";

const paginationStyle = css({
  marginInline: "auto",
  display: "flex",
  width: "100%",
  justifyContent: "center",
});

const contentStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1",
});

const previousNextStyle = css({
  "@media (max-width: 39.99rem)": {
    aspectRatio: "1",
    padding: 0,
  },
});

const previousIconStyle = css({
  "@media (min-width: 40rem)": { marginInlineStart: "-0.25rem" },
});

const nextIconStyle = css({
  "@media (min-width: 40rem)": { marginInlineEnd: "-0.25rem" },
});

const previousNextLabelStyle = css({
  "@media (max-width: 39.99rem)": { display: "none" },
});

const screenReaderOnlyStyle = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
});

const ellipsisStyle = css({
  display: "flex",
  minWidth: "1.75rem",
  justifyContent: "center",
  "& svg": {
    width: "1.25rem",
    height: "1.25rem",
    "@media (min-width: 40rem)": { width: "1rem", height: "1rem" },
  },
});

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">): React.ReactElement {
  return (
    <nav
      aria-label="pagination"
      className={cx(paginationStyle, className)}
      data-slot="pagination"
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">): React.ReactElement {
  return (
    <ul
      className={cx(contentStyle, className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

export function PaginationItem({
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return <li data-slot="pagination-item" {...props} />;
}

export type PaginationLinkProps = {
  isActive?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & useRender.ComponentProps<"a">;

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  render,
  ...props
}: PaginationLinkProps): React.ReactElement {
  const defaultProps = {
    "aria-current": isActive ? ("page" as const) : undefined,
    className: render
      ? className
      : cx(
          buttonVariants({
            size,
            variant: isActive ? "outline" : "ghost",
          }),
          className,
        ),
    "data-active": isActive,
    "data-slot": "pagination-link",
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>): React.ReactElement {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cx(previousNextStyle, className)}
      size="default"
      {...props}
    >
      <Icon icon={ChevronLeftIcon} className={previousIconStyle} />
      <span className={previousNextLabelStyle}>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>): React.ReactElement {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cx(previousNextStyle, className)}
      size="default"
      {...props}
    >
      <span className={previousNextLabelStyle}>Next</span>
      <Icon icon={ChevronRightIcon} className={nextIconStyle} />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-hidden
      className={cx(ellipsisStyle, className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <Icon icon={MoreHorizontalIcon} />
      <span className={screenReaderOnlyStyle}>More pages</span>
    </span>
  );
}
