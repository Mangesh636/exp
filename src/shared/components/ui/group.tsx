"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css, cva, cx, type RecipeVariantProps } from "../../../../styled-system/css";

import type * as React from "react";

import { Separator } from "@/shared/components/ui/separator";

export const groupVariants = cva({
  base: {
    display: "flex",
    width: "fit-content",
    "& > *:focus-visible": { zIndex: 1 },
    "&:has(> [data-slot='group'])": { gap: "2" },
    "& > *:has(:focus-visible)": { zIndex: 1 },
    _dark: {
      "& > [data-slot='separator']:has(~ button:hover):not(:has(~ [data-slot='separator'] ~ [data-slot]:hover))::before, & > [data-slot='separator']:has(~ [data-slot][data-pressed]):not(:has(~ [data-slot='separator'] ~ [data-slot][data-pressed]))::before": {
        backgroundColor: "color-mix(in srgb, var(--input) 64%, transparent)",
      },
      "& > button:hover ~ [data-slot='separator']:not([data-slot]:hover ~ [data-slot='separator'] ~ [data-slot='separator'])::before, & > [data-slot][data-pressed] ~ [data-slot='separator']:not([data-slot][data-pressed] ~ [data-slot='separator'] ~ [data-slot='separator'])::before": {
        backgroundColor: "color-mix(in srgb, var(--input) 64%, transparent)",
      },
    },
  },
  variants: {
    orientation: {
      horizontal: {
        "& > *": {
          "@media (pointer: coarse)": {
            "&::after": { minWidth: "auto" },
          },
        },
        "& > [data-slot]:has(~ [data-slot])": {
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
          borderInlineEndWidth: 0,
          "&:not([data-slot='separator'])::before": { insetInlineEnd: "-0.5px" },
          "&::before": { borderEndStartRadius: 0, borderEndEndRadius: 0 },
        },
        "& > [data-slot] ~ [data-slot]:not([data-slot='separator'])::before": {
          insetInlineStart: "-0.5px",
        },
        "& > [data-slot] ~ [data-slot]": {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
          borderInlineStartWidth: 0,
          "&::before": { borderStartStartRadius: 0, borderEndStartRadius: 0 },
        },
      },
      vertical: {
        flexDirection: "column",
        "& > *": {
          "@media (pointer: coarse)": {
            "&::after": { minHeight: "auto" },
          },
        },
        "& > [data-slot]:has(~ [data-slot])": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomWidth: 0,
          "&:not([data-slot='separator'])::before": {
            bottom: "-0.5px",
            display: "none",
          },
          "&::before": { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        },
        _dark: {
          "& > *:last-child::before": { display: "none" },
          "& > *:first-child::before": { display: "block" },
        },
        "& > [data-slot] ~ [data-slot]:not([data-slot='separator'])::before": {
          top: "-0.5px",
        },
        "& > [data-slot] ~ [data-slot]": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopWidth: 0,
          "&::before": { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
        },
      },
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export function Group({
  className,
  orientation,
  children,
  ...props
}: {
  className?: string;
  orientation?: RecipeVariantProps<typeof groupVariants>["orientation"];
  children: React.ReactNode;
} & React.ComponentProps<"div">): React.ReactElement {
  return (
    // biome-ignore lint/a11y/useSemanticElements: A div with role="group" is intentional for this reusable component.
    <div
      className={cx(groupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="group"
      role="group"
      {...props}
    >
      {children}
    </div>
  );
}

const groupTextStyle = css({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: "2",
  whiteSpace: "nowrap",
  borderRadius: "lg",
  borderWidth: "1px",
  borderColor: "var(--input)",
  backgroundColor: "var(--muted)",
  backgroundClip: "padding-box",
  paddingInline: "calc(var(--spacing) * 3 - 1px)",
  fontSize: { base: "base", sm: "sm" },
  color: "var(--muted-foreground)",
  boxShadow: "0 1px 2px color-mix(in srgb, black 5%, transparent)",
  outline: "none",
  transitionProperty: "box-shadow",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "calc(var(--radius-lg) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 6%, transparent)",
  },
  _dark: {
    backgroundClip: "border-box",
    backgroundColor: "color-mix(in srgb, var(--input) 64%, transparent)",
    "&::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
  },
  "& svg:not([class*='size-'])": {
    width: "1.125rem",
    height: "1.125rem",
  },
  "& svg": { marginInline: "-0.125rem", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

export function GroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cx(groupTextStyle, className),
    "data-slot": "group-text",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render,
  });
}

const groupSeparatorStyle = css({
  pointerEvents: "none",
  position: "relative",
  zIndex: 2,
  backgroundColor: "var(--input)",
  "&::before": { position: "absolute", inset: 0, content: '""' },
  _dark: {
    "&::before": {
      backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
    },
  },
  "&:has(+ [data-slot='input-control']:focus-within, + [data-slot='input-group']:focus-within, + [data-slot='select-trigger']:focus-visible + *, + [data-slot='number-field']:focus-within)": {
    translate: "1px 0",
    backgroundColor: "var(--ring)",
  },
  "&:is([data-slot='input-control']:focus-within + &, [data-slot='input-group']:focus-within + &, [data-slot='select-trigger']:focus-visible + * + &, [data-slot='number-field']:focus-within + &, [data-slot='number-field']:focus-within + input + &)": {
    backgroundColor: "var(--ring)",
    translate: "-1px 0",
  },
});

export function GroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: {
  className?: string;
} & React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <Separator
      className={cx(groupSeparatorStyle, className)}
      orientation={orientation}
      {...props}
    />
  );
}

export {
  Group as ButtonGroup,
  GroupText as ButtonGroupText,
  GroupSeparator as ButtonGroupSeparator,
};
