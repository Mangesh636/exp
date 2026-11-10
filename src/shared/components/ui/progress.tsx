"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { css } from "styled-system/css";

import type React from "react";

export function Progress({
  className,
  children,
  ...props
}: ProgressPrimitive.Root.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Root
      className={[
        css({ display: "flex", width: "100%", flexDirection: "column", gap: "2" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="progress"
      {...props}
    >
      {children ? (
        children
      ) : (
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  );
}

export function ProgressLabel({
  className,
  ...props
}: ProgressPrimitive.Label.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Label
      className={[
        css({ fontWeight: "medium", fontSize: "sm" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="progress-label"
      {...props}
    />
  );
}

export function ProgressTrack({
  className,
  ...props
}: ProgressPrimitive.Track.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Track
      className={[
        css({
          display: "block",
          width: "100%",
          height: "0.375rem",
          overflow: "hidden",
          borderRadius: "full",
          backgroundColor: "var(--input)",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="progress-track"
      {...props}
    />
  );
}

export function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Indicator
      className={[
        css({
          backgroundColor: "var(--primary)",
          transitionProperty: "all",
          transitionDuration: "500ms",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="progress-indicator"
      {...props}
    />
  );
}

export function ProgressValue({
  className,
  ...props
}: ProgressPrimitive.Value.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Value
      className={[
        css({ fontSize: "sm", fontVariantNumeric: "tabular-nums" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { ProgressPrimitive };
