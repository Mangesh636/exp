"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { css } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type React from "react";

import { ChevronDownIcon } from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

const itemStyle = css({
  borderBottomWidth: "1px",
  "&:last-child": { borderBottomWidth: 0 },
});

const triggerStyle = css({
  display: "flex",
  width: "100%",
  flex: 1,
  cursor: "pointer",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
  borderRadius: "md",
  paddingY: "1rem",
  textAlign: "left",
  fontWeight: "medium",
  fontSize: "sm",
  outline: "none",
  transitionProperty: "all",
  "&:focus-visible": {
    outline: "none",
    boxShadow: "0 0 0 3px var(--ring)",
  },
  "&:disabled": { pointerEvents: "none", opacity: 0.64 },
  "&[data-panel-open] [data-slot='accordion-indicator']": {
    transform: "rotate(180deg)",
  },
});

const indicatorStyle = css({
  pointerEvents: "none",
  width: "1rem",
  height: "1rem",
  flexShrink: 0,
  transform: "translateY(0.125rem)",
  opacity: 0.8,
  transitionProperty: "transform",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease-in-out",
});

const panelStyle = css({
  height: "var(--accordion-panel-height)",
  overflow: "hidden",
  color: "var(--muted-foreground)",
  fontSize: "sm",
  transitionProperty: "height",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease-in-out",
  "&[data-ending-style], &[data-starting-style]": { height: 0 },
});

export function Accordion(
  props: AccordionPrimitive.Root.Props,
): React.ReactElement {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      className={cx(itemStyle, className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Header className={css({ display: "flex" })}>
      <AccordionPrimitive.Trigger
        className={cx(triggerStyle, className)}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <Icon
          icon={ChevronDownIcon}
          className={indicatorStyle}
          data-slot="accordion-indicator"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Panel
      className={panelStyle}
      data-slot="accordion-panel"
      {...props}
    >
      <div className={cx(css({ paddingTop: 0, paddingBottom: "1rem" }), className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { AccordionPrimitive, AccordionPanel as AccordionContent };
