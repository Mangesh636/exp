"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cx } from "styled-system/css";
import * as React from "react";

export type SegmentedControlSize = "default" | "lg" | "sm";

export const segmentedControlItemSizeClassNames: Record<
  SegmentedControlSize,
  string
> = {
  default: css({
    height: "2.125rem",
    paddingInline: "calc(var(--spacing) * 2.5 - 1px)",
    "@media (min-width: 40rem)": { height: "1.875rem" },
  }),
  lg: css({
    height: "2.375rem",
    paddingInline: "calc(var(--spacing) * 3 - 1px)",
    "@media (min-width: 40rem)": { height: "2.125rem" },
  }),
  sm: css({
    height: "1.875rem",
    paddingInline: "calc(var(--spacing) * 2 - 1px)",
    "@media (min-width: 40rem)": { height: "1.625rem" },
  }),
};

export const segmentedControlItemLayoutClassName = css({
  gap: "1.5",
  "& svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& svg:not([class*='size-'])": {
    width: "1.125rem",
    height: "1.125rem",
    "@media (min-width: 40rem)": { width: "1rem", height: "1rem" },
  },
  "& svg": {
    pointerEvents: "none",
    marginInline: "-0.125rem",
    flexShrink: 0,
  },
});

export const segmentedControlIndicatorSurfaceClassName = css({
  borderRadius: "md",
  backgroundColor: "var(--background)",
  boxShadow: "0 1px 2px color-mix(in srgb, black 5%, transparent)",
  _dark: { backgroundColor: "var(--input)" },
});

const rootStyle = css({
  position: "relative",
  zIndex: 0,
  display: "flex",
  width: "fit-content",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.125rem",
  borderRadius: "lg",
  backgroundColor: "var(--muted)",
  padding: "0.125rem",
});

const itemStyle = css({
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
  cursor: "pointer",
  userSelect: "none",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  borderWidth: "1px",
  borderColor: "transparent",
  borderRadius: "md",
  fontWeight: "medium",
  fontSize: "base",
  color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)",
  outline: "2px solid transparent",
  transitionProperty: "color, outline-color",
  "&:hover": { backgroundColor: "transparent", color: "var(--muted-foreground)" },
  "&:focus-visible": { outlineColor: "var(--ring)" },
  "&:disabled,&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-checked],&[aria-current='page'],&[data-pressed]": {
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    boxShadow: "0 1px 2px color-mix(in srgb, black 5%, transparent)",
  },
  _dark: {
    "&[data-checked],&[aria-current='page'],&[data-pressed]": {
      backgroundColor: "var(--input)",
    },
  },
  "&:has(>[data-slot='segmented-control-indicator']:not([hidden]))": {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  "@media (min-width: 40rem)": { fontSize: "sm" },
});

const indicatorStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: -1,
  height: "var(--active-item-height)",
  width: "var(--active-item-width)",
  translate: "var(--active-item-left) var(--active-item-top)",
  transitionProperty: "width, height, translate",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease-in-out",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
});

const SegmentedControlContext: React.Context<SegmentedControlSize> =
  React.createContext<SegmentedControlSize>("default");

export function SegmentedControl({
  className,
  children,
  render,
  size = "default",
  ...props
}: useRender.ComponentProps<"div"> & {
  size?: SegmentedControlSize;
}): React.ReactElement {
  const defaultProps = {
    children: (
      <>
        {children}
        <SegmentedControlIndicator />
      </>
    ),
    className: cx(rootStyle, className),
    "data-size": size,
    "data-slot": "segmented-control",
  };

  const element = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });

  return (
    <SegmentedControlContext.Provider value={size}>
      {element}
    </SegmentedControlContext.Provider>
  );
}

export function SegmentedControlItem({
  className,
  render,
  size,
  ...props
}: useRender.ComponentProps<"button"> & {
  size?: SegmentedControlSize;
}): React.ReactElement {
  const contextSize = React.useContext(SegmentedControlContext);
  const resolvedSize = size ?? contextSize;

  const defaultProps = {
    className: cx(
      itemStyle,
      segmentedControlItemLayoutClassName,
      segmentedControlItemSizeClassNames[resolvedSize],
      className,
    ),
    "data-size": resolvedSize,
    "data-slot": "segmented-control-item",
    ...(render ? {} : { type: "button" as const }),
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

const activeItemSelector =
  ':scope > [data-checked], :scope > [aria-current="page"], :scope > [data-pressed]';

const observedAttributes: string[] = [
  "data-checked",
  "aria-current",
  "data-pressed",
];

const MAX_LAYOUT_ROUNDING_ERROR = 2;

interface ActiveItemRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

function isSameRect(
  a: ActiveItemRect | null,
  b: ActiveItemRect | null,
): boolean {
  return (
    a?.left === b?.left &&
    a?.top === b?.top &&
    a?.width === b?.width &&
    a?.height === b?.height
  );
}

function getCssSize(element: HTMLElement): { height: number; width: number } {
  const style = getComputedStyle(element);
  const width = Number.parseFloat(style.width) || 0;
  const height = Number.parseFloat(style.height) || 0;
  if (
    Math.round(width) !== element.offsetWidth ||
    Math.round(height) !== element.offsetHeight
  ) {
    return { height: element.offsetHeight, width: element.offsetWidth };
  }
  return { height, width };
}

function measureItem(item: HTMLElement, root: HTMLElement): ActiveItemRect {
  const { width, height } = getCssSize(item);
  const rootSize = getCssSize(root);
  const itemRect = item.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  const scaleX = rootSize.width > 0 ? rootRect.width / rootSize.width : 1;
  const scaleY = rootSize.height > 0 ? rootRect.height / rootSize.height : 1;

  const rectLeft =
    (itemRect.left - rootRect.left) / scaleX -
    root.clientLeft +
    root.scrollLeft;
  const rectTop =
    (itemRect.top - rootRect.top) / scaleY - root.clientTop + root.scrollTop;

  const isUndistorted =
    Math.abs(rectLeft - item.offsetLeft) <= MAX_LAYOUT_ROUNDING_ERROR &&
    Math.abs(rectTop - item.offsetTop) <= MAX_LAYOUT_ROUNDING_ERROR;

  return {
    height,
    left: isUndistorted ? rectLeft : item.offsetLeft,
    top: isUndistorted ? rectTop : item.offsetTop,
    width,
  };
}

function SegmentedControlIndicator(): React.ReactElement {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [rect, setRect] = React.useState<ActiveItemRect | null>(null);

  React.useLayoutEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) {
      return;
    }

    const update = (): void => {
      const item = root.querySelector<HTMLElement>(activeItemSelector);
      const next = item ? measureItem(item, root) : null;
      setRect((previous) => (isSameRect(previous, next) ? previous : next));
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    const mutationObserver = new MutationObserver((records) => {
      if (records.some((record) => record.type === "childList")) {
        observeItems();
      }
      update();
    });
    const observeItems = (): void => {
      resizeObserver.disconnect();
      resizeObserver.observe(root);
      for (const child of root.children) {
        resizeObserver.observe(child);
        mutationObserver.observe(child, {
          attributeFilter: observedAttributes,
          attributes: true,
        });
      }
    };
    mutationObserver.observe(root, { childList: true });
    observeItems();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className={cx(indicatorStyle, segmentedControlIndicatorSurfaceClassName)}
      data-slot="segmented-control-indicator"
      hidden={!rect}
      ref={ref}
      style={
        {
          "--active-item-height": `${rect?.height ?? 0}px`,
          "--active-item-left": `${rect?.left ?? 0}px`,
          "--active-item-top": `${rect?.top ?? 0}px`,
          "--active-item-width": `${rect?.width ?? 0}px`,
        } as React.CSSProperties
      }
    />
  );
}
