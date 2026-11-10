"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { css } from "styled-system/css";

import type React from "react";

export function Label({
  className,
  render,
  ...props
}: useRender.ComponentProps<"label">): React.ReactElement {
  const defaultProps = {
    className: [
      css({
        display: "inline-flex",
        alignItems: "center",
        gap: "2",
        fontWeight: "medium",
        color: "var(--foreground)",
        fontSize: { base: "base", sm: "sm" },
        lineHeight: { base: "4.5", sm: "4" },
      }),
      className,
    ]
      .filter(Boolean)
      .join(" "),
    "data-slot": "label",
  };

  return useRender({
    defaultTagName: "label",
    props: mergeProps<"label">(defaultProps, props),
    render,
  });
}
