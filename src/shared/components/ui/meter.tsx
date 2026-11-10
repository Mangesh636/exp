"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { css } from "../../../../styled-system/css";

import type React from "react";

export function Meter({
  className,
  children,
  ...props
}: MeterPrimitive.Root.Props): React.ReactElement {
  return (
    <MeterPrimitive.Root
      className={[
        css({ display: "flex", width: "100%", flexDirection: "column", gap: "2" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ? (
        children
      ) : (
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      )}
    </MeterPrimitive.Root>
  );
}

export function MeterLabel({
  className,
  ...props
}: MeterPrimitive.Label.Props): React.ReactElement {
  return (
    <MeterPrimitive.Label
      className={[
        css({ fontWeight: "medium", color: "var(--foreground)", fontSize: "sm" }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="meter-label"
      {...props}
    />
  );
}

export function MeterTrack({
  className,
  ...props
}: MeterPrimitive.Track.Props): React.ReactElement {
  return (
    <MeterPrimitive.Track
      className={[
        css({
          display: "block",
          width: "100%",
          height: "0.5rem",
          overflow: "hidden",
          backgroundColor: "var(--input)",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="meter-track"
      {...props}
    />
  );
}

export function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props): React.ReactElement {
  return (
    <MeterPrimitive.Indicator
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
      data-slot="meter-indicator"
      {...props}
    />
  );
}

export function MeterValue({
  className,
  ...props
}: MeterPrimitive.Value.Props): React.ReactElement {
  return (
    <MeterPrimitive.Value
      className={[
        css({
          color: "var(--foreground)",
          fontSize: "sm",
          fontVariantNumeric: "tabular-nums",
        }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-slot="meter-value"
      {...props}
    />
  );
}

export { MeterPrimitive };
