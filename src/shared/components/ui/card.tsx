"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cx } from "styled-system/css";

import type React from "react";

const cardSurface = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRadius: "2xl",
  borderWidth: "1px",
  backgroundColor: "var(--card)",
  color: "var(--card-foreground)",
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  "&:before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "calc(var(--radius-2xl) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  _dark: {
    "&:before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" },
  },
} as const;

function renderSlot(
  className: string | undefined,
  slot: string,
  props: useRender.ComponentProps<"div">,
  styles: Parameters<typeof css>[0],
): React.ReactElement {
  const defaultProps = {
    className: cx(css(styles), className),
    "data-slot": slot,
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: props.render,
  });
}

export function Card({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card", { ...props, render }, cardSurface);
}

export function CardFrame({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-frame", { ...props, render }, {
    ...cardSurface,
    "--clip-bottom": "-1rem",
    "--clip-top": "-1rem",
    "&:before": {
      ...cardSurface["&:before"],
      backgroundColor: "color-mix(in srgb, var(--muted) 72%, transparent)",
    },
    "&:has([data-slot='table-container'])": { overflow: "hidden" },
    "& > [data-slot='card']": {
      margin: "-1px",
      backgroundClip: "padding-box",
      boxShadow: "none",
      "&:before": { display: "none" },
      clipPath: "inset(var(--clip-top) 1px var(--clip-bottom) 1px round calc(var(--radius-2xl) - 1px))",
      "&:first-child": { "--clip-top": "1px" },
      "&:last-child": { "--clip-bottom": "1px" },
      "&:not(:first-child)": { borderTopLeftRadius: "var(--radius-xl)", borderTopRightRadius: "var(--radius-xl)" },
      "&:not(:last-child)": { borderBottomLeftRadius: "var(--radius-xl)", borderBottomRightRadius: "var(--radius-xl)" },
    },
    "& > [data-slot='table-container']": { margin: "-1px", width: "calc(100% + 2px)" },
    _dark: {
      "&:before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" },
    },
  });
}

export function CardFrameHeader({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-frame-header", { ...props, render }, {
    position: "relative",
    display: "grid",
    gridTemplateRows: "auto auto",
    gridAutoRows: "min-content",
    flexDirection: "column",
    alignItems: "flex-start",
    columnGap: "4",
    paddingX: "6",
    paddingY: "4",
    "&:has([data-slot='card-frame-action'])": { gridTemplateColumns: "1fr auto" },
  });
}

export function CardFrameTitle({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-frame-title", { ...props, render }, { alignSelf: "center", fontWeight: "semibold", fontSize: "sm" });
}

export function CardFrameDescription({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-frame-description", { ...props, render }, { alignSelf: "center", color: "var(--muted-foreground)", fontSize: "sm" });
}

export function CardFrameAction({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-frame-action", { ...props, render }, {
    gridColumnStart: 2,
    display: "inline-flex",
    "&:nth-child(3)": {
      gridRow: "span 2",
      gridRowStart: 1,
      alignSelf: "center",
      justifySelf: "end",
    },
  });
}

export function CardFrameFooter({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-frame-footer", { ...props, render }, { paddingX: "6", paddingY: "4" });
}

export function CardHeader({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-header", { ...props, render }, {
    display: "grid",
    gridAutoRows: "min-content",
    gridTemplateRows: "auto auto",
    alignItems: "start",
    gap: "1.5",
    padding: "6",
    "&:has([data-slot='card-action'])": { gridTemplateColumns: "1fr auto" },
    ":where([data-slot='card']:has(> [data-slot='card-panel'])) &": { paddingBottom: "4" },
  });
}

export function CardTitle({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-title", { ...props, render }, { fontFamily: "sans", fontWeight: "semibold", fontSize: "lg", lineHeight: 1 });
}

export function CardDescription({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-description", { ...props, render }, { color: "var(--muted-foreground)", fontSize: "sm" });
}

export function CardAction({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-action", { ...props, render }, {
    gridColumnStart: 2,
    gridRow: "span 2",
    gridRowStart: 1,
    display: "inline-flex",
    alignSelf: "start",
    justifySelf: "end",
  });
}

export function CardPanel({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-panel", { ...props, render }, {
    flex: "1",
    padding: "6",
    ":where([data-slot='card']:has(> [data-slot='card-header']:not(.border-b))) &": { paddingTop: 0 },
    ":where([data-slot='card']:has(> [data-slot='card-footer']:not(.border-t))) &": { paddingBottom: 0 },
  });
}

export function CardFooter({ className, render, ...props }: useRender.ComponentProps<"div">): React.ReactElement {
  return renderSlot(className, "card-footer", { ...props, render }, {
    display: "flex",
    alignItems: "center",
    padding: "6",
    ":where([data-slot='card']:has(> [data-slot='card-panel'])) &": { paddingTop: "4" },
  });
}

export { CardPanel as CardContent };
