"use client";

import { type DateLib, DayPicker } from "@daypicker/react";
import { css, cx } from "styled-system/css";

import type * as React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UnfoldMoreIcon,
} from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

const buttonClassNames = css({
  position: "relative",
  display: "flex",
  width: "var(--cell-size)",
  height: "var(--cell-size)",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "lg",
  color: "var(--foreground)",
  fontSize: "base",
  "&:not([data-selected]):hover": { backgroundColor: "var(--accent)" },
  "&:disabled": { pointerEvents: "none", opacity: 0.64 },
  "& svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", flexShrink: 0 },
  "@media (min-width: 40rem)": {
    fontSize: "sm",
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

const dayButtonClassNames = css({
  pointerEvents: "auto",
  ":where([data-disabled]) &": { pointerEvents: "none" },
  ":where(.range-middle) &": { borderRadius: 0 },
  ":where(.range-end:not(.range-start)) &": {
    borderStartEndRadius: 0,
    borderEndEndRadius: 0,
  },
  ":where(.range-start:not(.range-end)) &": {
    borderStartStartRadius: 0,
    borderEndStartRadius: 0,
  },
  ":where(.range-middle[data-selected]) &": {
    backgroundColor: "var(--accent)",
    color: "var(--foreground)",
  },
  ":where([data-selected]) &": {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
  },
  ":where([data-disabled], [data-outside]) &": {
    color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)",
  },
  ":where([data-selected][data-outside]) &": {
    color: "var(--primary-foreground)",
  },
  ":where([data-disabled]) &": { textDecorationLine: "line-through" },
  outline: "none",
  ":where([data-selected]:not(.range-middle)) &": {
    transitionProperty: "border-radius, box-shadow",
  },
  "&:focus-visible": {
    zIndex: 1,
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent)",
  },
});

const defaultClassNames = {
  button_next: buttonClassNames,
  button_previous: buttonClassNames,
  caption_label: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: "medium",
    fontSize: "base",
    "@media (min-width: 40rem)": { fontSize: "sm" },
  }),
  day: css({
    width: "var(--cell-size)",
    height: "var(--cell-size)",
    paddingY: "1px",
    fontSize: "sm",
  }),
  day_button: cx(buttonClassNames, dayButtonClassNames),
  dropdown: css({
    position: "absolute",
    inset: 0,
    backgroundColor: "var(--popover)",
    opacity: 0,
  }),
  dropdown_root: css({
    position: "relative",
    height: "2.25rem",
    borderWidth: "1px",
    borderColor: "var(--input)",
    borderRadius: "lg",
    paddingInline: "calc(var(--spacing) * 3 - 1px)",
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
    "&:has(:focus)": {
      borderColor: "var(--ring)",
      boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent)",
    },
    "& svg:not([class*='opacity-'])": { opacity: 0.8 },
    "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
    "& svg": { pointerEvents: "none", marginInlineEnd: "-0.25rem" },
    "@media (min-width: 40rem)": {
      height: "2rem",
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },
  }),
  dropdowns: css({
    display: "flex",
    width: "100%",
    height: "var(--cell-size)",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    fontSize: "base",
    "& > * span": { fontWeight: "medium" },
    "@media (min-width: 40rem)": { fontSize: "sm" },
  }),
  hidden: css({ visibility: "hidden" }),
  month: css({ width: "100%" }),
  month_caption: css({
    position: "relative",
    zIndex: 2,
    display: "flex",
    height: "var(--cell-size)",
    alignItems: "center",
    justifyContent: "center",
    marginInline: "var(--cell-size)",
    marginBottom: "0.25rem",
    paddingX: "0.25rem",
  }),
  months: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    "@media (min-width: 40rem)": { flexDirection: "row" },
  }),
  nav: css({
    position: "absolute",
    top: 0,
    zIndex: 1,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  }),
  outside: css({
    color: "var(--muted-foreground)",
    "&[data-selected]": {
      backgroundColor: "color-mix(in srgb, var(--accent) 50%, transparent)",
      color: "var(--muted-foreground)",
    },
  }),
  range_end: "range-end",
  range_middle: "range-middle",
  range_start: "range-start",
  today: css({
    "& > *::after": {
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      bottom: "0.25rem",
      insetInlineStart: "50%",
      zIndex: 1,
      width: "3px",
      height: "3px",
      transform: "translateX(-50%)",
      borderRadius: "full",
      backgroundColor: "var(--primary)",
    },
    "&[data-selected]:not(.range-middle) > *::after": {
      backgroundColor: "var(--background)",
    },
    "&[data-disabled] > *::after": {
      backgroundColor: "color-mix(in srgb, var(--foreground) 30%, transparent)",
    },
  }),
  week_number: css({
    width: "var(--cell-size)",
    height: "var(--cell-size)",
    padding: 0,
    fontWeight: "medium",
    fontSize: "xs",
    color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)",
  }),
  weekday: css({
    width: "var(--cell-size)",
    height: "var(--cell-size)",
    padding: 0,
    fontWeight: "medium",
    fontSize: "xs",
    color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)",
  }),
};

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  mode = "single",
  ...props
}: React.ComponentProps<typeof DayPicker>): React.ReactElement {
  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames,
  ).reduce(
    (acc, key) => {
      const userClass = classNames?.[key as keyof typeof classNames];
      const baseClass =
        defaultClassNames[key as keyof typeof defaultClassNames];

      acc[key as keyof typeof defaultClassNames] = userClass
        ? cx(baseClass, userClass)
        : baseClass;

      return acc;
    },
    { ...defaultClassNames } as typeof defaultClassNames,
  );

  const defaultComponents = {
    Chevron: ({
      className,
      orientation,
      ...props
    }: {
      className?: string;
      orientation?: "left" | "right" | "up" | "down";
    }): React.ReactElement => {
      if (orientation === "left") {
        return (
          <Icon
            icon={ChevronLeftIcon}
            className={cx(className, css({
              ":where([dir='rtl']) &": { transform: "rotate(180deg)" },
            }))}
            {...props}
            aria-hidden="true"
          />
        );
      }

      if (orientation === "right") {
        return (
          <Icon
            icon={ChevronRightIcon}
            className={cx(className, css({
              ":where([dir='rtl']) &": { transform: "rotate(180deg)" },
            }))}
            {...props}
            aria-hidden="true"
          />
        );
      }

      return (
        <Icon
          icon={UnfoldMoreIcon}
          className={className}
          {...props}
          aria-hidden="true"
        />
      );
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  const dayPickerProps = {
    className: cx(
      css({
        width: "fit-content",
        "--cell-size": "2.5rem",
        "@media (min-width: 40rem)": { "--cell-size": "2.25rem" },
      }),
      className,
    ),
    classNames: mergedClassNames,
    components: mergedComponents,
    "data-slot": "calendar",
    formatters: {
      formatMonthDropdown: (month: Date, dateLib: DateLib) =>
        dateLib.format(month, "LLL"),
    } as React.ComponentProps<typeof DayPicker>["formatters"],
    mode,
    showOutsideDays,
    ...props,
  };

  return (
    <DayPicker
      {...(dayPickerProps as React.ComponentProps<typeof DayPicker>)}
    />
  );
}
