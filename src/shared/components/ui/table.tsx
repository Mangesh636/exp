"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cx, css } from "../../../../styled-system/css";

import type React from "react";

export type TableVariant = "default" | "card";

export type TableProps = React.ComponentProps<"table"> & {
  variant?: TableVariant;
  render?: useRender.ComponentProps<"div">["render"];
};

const card = "&:where([data-variant=card] *)";

export function Table({ className, variant = "default", render, ...props }: TableProps): React.ReactElement {
  const defaultProps = {
    children: <table className={cx(css({ w: "full", captionSide: "bottom", fontSize: "sm", [card]: { borderCollapse: "separate", borderSpacing: "0" } }), className)} data-slot="table" {...props} />,
    className: css({ position: "relative", w: "full", overflowX: "auto" }),
    "data-slot": "table-container",
    "data-variant": variant,
  };
  return useRender({ defaultTagName: "div", props: mergeProps<"div">(defaultProps, {}), render });
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">): React.ReactElement {
  return <thead className={cx(css({ "& tr": { borderBottomWidth: "1px" } }), className)} data-slot="table-header" {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">): React.ReactElement {
  return <tbody className={cx(css({
    position: "relative",
    [card]: {
      rounded: "xl",
      boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
      _before: { content: '""', pointerEvents: "none", position: "absolute", inset: "1px", rounded: "calc(var(--radius-xl) - 1px)", boxShadow: "0 1px rgb(0 0 0 / 4%)" },
      "& tr": { border: "0" },
      "& tr td": { borderBottomWidth: "1px", bg: "card" },
      "& tr:first-child td:first-child": { borderStartStartRadius: "var(--radius-xl)" },
      "& tr:first-child td:last-child": { borderStartEndRadius: "var(--radius-xl)" },
      "& tr:last-child td:first-child": { borderEndStartRadius: "var(--radius-xl)" },
      "& tr:last-child td:last-child": { borderEndEndRadius: "var(--radius-xl)" },
      "& tr td:first-child": { borderInlineStartWidth: "1px" },
      "& tr td:last-child": { borderInlineEndWidth: "1px" },
      "& tr:first-child td": { borderTopWidth: "1px" },
      "& tr:last-child td": { borderBottomWidth: "0" },
      "& tr:hover td": { bg: "color-mix(in srgb, var(--card), var(--color-black) 2%)" },
      "& tr[data-state=selected] td": { bg: "color-mix(in srgb, var(--card), var(--color-black) 4%)" },
    },
    "&:not(:where([data-variant=card] *)) tr:last-child": { border: "0" },
    _dark: {
      [card]: {
        _before: { boxShadow: "0 -1px rgb(255 255 255 / 8%)" },
        "& tr:hover td": { bg: "color-mix(in srgb, var(--card), var(--color-white) 2%)" },
        "& tr[data-state=selected] td": { bg: "color-mix(in srgb, var(--card), var(--color-white) 4%)" },
      },
    },
  }), className)} data-slot="table-body" {...props} />;
}

export function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">): React.ReactElement {
  return <tfoot className={cx(css({
    borderTopWidth: "1px",
    [card]: { border: "0" },
    bg: "transparent",
    "&:not(:where([data-variant=card] *))": { bg: "color-mix(in srgb, var(--card), var(--color-black) 2%)" },
    fontWeight: "medium",
    "& tr:last-child": { borderBottomWidth: "0" },
    _dark: { "&:not(:where([data-variant=card] *))": { bg: "color-mix(in srgb, var(--card), var(--color-white) 2%)" } },
  }), className)} data-slot="table-footer" {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">): React.ReactElement {
  return <tr className={cx(css({
    position: "relative",
    borderBottomWidth: "1px",
    "&:not(:where([data-variant=card] *)):hover": { bg: "color-mix(in srgb, var(--background), var(--color-black) 2%)" },
    "&:not(:where([data-variant=card] *))[data-state=selected]": { bg: "color-mix(in srgb, var(--background), var(--color-black) 4%)" },
    _dark: {
      "&:not(:where([data-variant=card] *)):hover": { bg: "color-mix(in srgb, var(--background), var(--color-white) 2%)" },
      "&:not(:where([data-variant=card] *))[data-state=selected]": { bg: "color-mix(in srgb, var(--background), var(--color-white) 4%)" },
    },
  }), className)} data-slot="table-row" {...props} />;
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">): React.ReactElement {
  return <th className={cx(css({
    h: "10", whiteSpace: "nowrap", px: "2.5", textAlign: "left", verticalAlign: "middle",
    fontWeight: "medium", color: "muted.foreground", lineHeight: "1",
    "&:has([role=checkbox])": { w: "1px" },
    "&:last-child:has([role=checkbox])": { ps: "0" },
    "&:first-child:has([role=checkbox])": { pe: "0" },
  }), className)} data-slot="table-head" {...props} />;
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">): React.ReactElement {
  return <td className={cx(css({
    whiteSpace: "nowrap", bgClip: "padding-box", p: "2.5", verticalAlign: "middle", lineHeight: "1",
    '&:where([data-slot="table-footer"] *)': { py: "3.5" },
    [card]: {
      "&:first-child": { ps: "calc(0.625rem - 1px)" },
      "&:last-child": { pe: "calc(0.625rem - 1px)" },
    },
    "&:has([role=checkbox])": { w: "1px" },
    "&:last-child:has([role=checkbox])": { ps: "0" },
    "&:first-child:has([role=checkbox])": { pe: "0" },
  }), className)} data-slot="table-cell" {...props} />;
}

export function TableCaption({ className, ...props }: React.ComponentProps<"caption">): React.ReactElement {
  return <caption className={cx(css({
    mt: "4", color: "muted.foreground", fontSize: "sm",
    [card]: { my: "4" },
  }), className)} data-slot="table-caption" {...props} />;
}
