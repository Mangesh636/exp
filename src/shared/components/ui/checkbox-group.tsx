"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { css } from "styled-system/css";

import type React from "react";

export function CheckboxGroup({
  className,
  ...props
}: CheckboxGroupPrimitive.Props): React.ReactElement {
  return (
    <CheckboxGroupPrimitive
      className={[
        css({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "3",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export { CheckboxGroupPrimitive };
