"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cx, css } from "styled-system/css";
import * as React from "react";

export function Slider({ className, getAriaLabel, children, defaultValue, value, min = 0, max = 100, ...props }: SliderPrimitive.Root.Props & Pick<SliderPrimitive.Thumb.Props, "getAriaLabel">): React.ReactElement {
  const _values = React.useMemo(() => {
    if (value !== undefined) return Array.isArray(value) ? value : [value];
    if (defaultValue !== undefined) return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return [min];
  }, [value, defaultValue, min]);

  return <SliderPrimitive.Root className={cx(css({ "&[data-orientation=horizontal]": { w: "full" } }), className)} defaultValue={defaultValue} max={max} min={min} thumbAlignment="edge" value={value} {...props}>
    {children}
    <SliderPrimitive.Control className={css({ display: "flex", touchAction: "none", userSelect: "none", "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 }, "&[data-orientation=vertical]": { h: "full", minH: "44", flexDirection: "column" }, "&[data-orientation=horizontal]": { w: "full", minW: "44" } })} data-slot="slider-control">
      <SliderPrimitive.Track className={css({ position: "relative", flexGrow: "1", userSelect: "none", _before: { content: '""', position: "absolute", rounded: "full", bg: "input" }, "&[data-orientation=horizontal]": { h: "1", w: "full", _before: { insetInline: "0.125rem", top: "0", bottom: "0" } }, "&[data-orientation=vertical]": { h: "full", w: "1", _before: { insetInline: "0", top: "0.125rem", bottom: "0.125rem" } } })} data-slot="slider-track">
        <SliderPrimitive.Indicator className={css({ rounded: "full", bg: "primary", userSelect: "none", "&[data-orientation=horizontal]": { ms: "0.5" }, "&[data-orientation=vertical]": { mb: "0.5" } })} data-slot="slider-indicator" />
        {Array.from({ length: _values.length }, (_, index) => <SliderPrimitive.Thumb className={css({ display: "block", w: "5", h: "5", flexShrink: 0, userSelect: "none", rounded: "full", borderWidth: "1px", borderColor: "input", bg: "white", boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)", outline: "none", transition: "box-shadow 150ms, scale 150ms", _before: { content: '""', position: "absolute", inset: "0", rounded: "full", boxShadow: "0 1px rgb(0 0 0 / 4%)" }, "&:has(:focus-visible)": { boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)" }, "&[data-dragging]": { scale: "1.2" }, "&:is(:has(*:focus-visible),[data-dragging])": { boxShadow: "none" }, _dark: { borderColor: "background", "&:has(:focus-visible)": { boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 48%, transparent)" } }, "@media (min-width: 640px)": { w: "4", h: "4" } })} data-slot="slider-thumb" getAriaLabel={getAriaLabel} index={index} key={String(index)} />)}
      </SliderPrimitive.Track>
    </SliderPrimitive.Control>
  </SliderPrimitive.Root>;
}

export function SliderValue({ className, ...props }: SliderPrimitive.Value.Props): React.ReactElement {
  return <SliderPrimitive.Value className={cx(css({ display: "flex", justifyContent: "flex-end", fontSize: "sm" }), className)} data-slot="slider-value" {...props} />;
}

export { SliderPrimitive };
