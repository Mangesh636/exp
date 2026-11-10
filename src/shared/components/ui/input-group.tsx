"use client";

import { css, cva, type RecipeVariantProps } from "../../../../styled-system/css";
import { cx } from "@/shared/lib/cx";

import type * as React from "react";

import { Input, type InputProps } from "@/shared/components/ui/input";
import { Textarea, type TextareaProps } from "@/shared/components/ui/textarea";

const inputGroupAddonVariants = cva({
  base: {
    display: "flex", height: "auto", cursor: "text", userSelect: "none",
    alignItems: "center", justifyContent: "center", gap: "2",
    "& > kbd": { borderRadius: "calc(var(--radius) - 5px)" },
    "& svg": { marginInline: "-0.125rem" },
    "&:not(:has(button))": { "& svg:not([class*='opacity-'])": { opacity: 0.8 } },
    _inputGroupControl: { "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" } },
    "@media (min-width: 40rem)": {
      _inputGroupControl: { "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" } },
    },
  },
  variants: {
    align: {
      "block-end": {
        order: 1, width: "100%", justifyContent: "flex-start",
        paddingInline: "calc(var(--spacing) * 3 - 1px)",
        paddingBottom: "calc(var(--spacing) * 3 - 1px)",
        "&:is(.border-t)": { paddingTop: "calc(var(--spacing) * 3 - 1px)" },
        "[data-size='sm'] + &": { paddingInline: "calc(var(--spacing) * 2.5 - 1px)" },
      },
      "block-start": {
        order: -1, width: "100%", justifyContent: "flex-start",
        paddingInline: "calc(var(--spacing) * 3 - 1px)",
        paddingTop: "calc(var(--spacing) * 3 - 1px)",
        "&:is(.border-b)": { paddingBottom: "calc(var(--spacing) * 3 - 1px)" },
        "[data-size='sm'] + &": { paddingInline: "calc(var(--spacing) * 2.5 - 1px)" },
      },
      "inline-end": {
        order: 1, paddingInlineEnd: "calc(var(--spacing) * 3 - 1px)",
        "&:has(> :last-child[data-slot='badge'])": { marginInlineEnd: "-0.375rem" },
        "&:has(> button)": { marginInlineEnd: "-0.5rem" },
        "&:has(> kbd:last-child)": { marginInlineEnd: "-0.35rem" },
        "[data-size='sm'] + &": { paddingInlineEnd: "calc(var(--spacing) * 2.5 - 1px)" },
      },
      "inline-start": {
        order: -1, paddingInlineStart: "calc(var(--spacing) * 3 - 1px)",
        "&:has(> :last-child[data-slot='badge'])": { marginInlineStart: "-0.375rem" },
        "&:has(> button)": { marginInlineStart: "-0.5rem" },
        "&:has(> kbd:last-child)": { marginInlineStart: "-0.35rem" },
        "[data-size='sm'] + &": { paddingInlineStart: "calc(var(--spacing) * 2.5 - 1px)" },
      },
    },
  },
  defaultVariants: { align: "inline-start" },
});

const inputGroupStyle = css({
  position: "relative", display: "inline-flex", width: "100%", minWidth: 0,
  alignItems: "center", borderRadius: "lg", borderWidth: "1px",
  borderColor: "var(--input)", backgroundColor: "var(--background)",
  color: "var(--foreground)", fontSize: "base",
  boxShadow: "0 1px 2px color-mix(in srgb, black 5%, transparent)",
  outlineColor: "color-mix(in srgb, var(--ring) 24%, transparent)",
  transitionProperty: "box-shadow",
  "&::before": {
    content: '""', position: "absolute", pointerEvents: "none", inset: 0,
    borderRadius: "calc(var(--radius-lg) - 1px)",
  },
  "&:not(:has(input:disabled,textarea:disabled,input:focus-visible,textarea:focus-visible,input[aria-invalid],textarea[aria-invalid]))::before": {
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&:has(input:focus-visible,textarea:focus-visible):has(input[aria-invalid],textarea[aria-invalid])": { borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)", boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)" },
  "&:has(input[aria-invalid],textarea[aria-invalid])": { borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)" },
  "&:has(textarea),&:has([data-align='block-end']),&:has([data-align='block-start'])": { height: "auto" },
  "&:has([data-align='block-end']),&:has([data-align='block-start'])": { flexDirection: "column" },
  "&:has(input:disabled,textarea:disabled)": { opacity: 0.64 },
  "&:has(input:disabled,textarea:disabled,input:focus-visible,textarea:focus-visible,input[aria-invalid],textarea[aria-invalid])": { boxShadow: "none" },
  "&:has(input:focus-visible,textarea:focus-visible)": { borderColor: "var(--ring)", boxShadow: "0 0 0 3px var(--ring)" },
  "&:has(input:autofill,textarea:autofill)": { backgroundColor: "color-mix(in srgb, var(--foreground) 4%, transparent)" },
  "& [data-slot='input-control'],& [data-slot='textarea-control']": { display: "contents" },
  "& [data-slot='input-control']::before,& [data-slot='textarea-control']::before": { display: "none" },
  "&:has([data-align='block-start'],[data-align='block-end']) input": { height: "auto" },
  "&:has([data-align='inline-start']) input": { paddingInlineStart: "calc(var(--spacing) * 2)" },
  "&:has([data-align='inline-end']) input": { paddingInlineEnd: "calc(var(--spacing) * 2)" },
  "&:has([data-align='block-end']) input": { paddingTop: "calc(var(--spacing) * 1.5)" },
  "&:has([data-align='block-start']) input": { paddingBottom: "calc(var(--spacing) * 1.5)" },
  "& textarea": { minHeight: "5.125rem", resize: "none", paddingBlock: "calc(var(--spacing) * 3 - 1px)" },
  "& textarea_button": { borderRadius: "calc(var(--radius-md) - 1px)" },
  "&:has(textarea) textarea": { "@media (max-width: 39.99rem)": { minHeight: "5.875rem" } },
  "&:has([data-align='inline-start']) [data-size='sm'] input": { paddingInlineStart: "0.375rem" },
  "&:has([data-align='inline-end']) [data-size='sm'] input": { paddingInlineEnd: "0.375rem" },
  "@media (min-width: 40rem)": { fontSize: "sm" },
  _dark: {
    backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
    "&:has(input:autofill,textarea:autofill)": { backgroundColor: "color-mix(in srgb, var(--foreground) 8%, transparent)" },
    "&:not(:has(input:disabled,textarea:disabled,input:focus-visible,textarea:focus-visible,input[aria-invalid],textarea[aria-invalid]))::before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" },
    "&:has(input[aria-invalid],textarea[aria-invalid])": { boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)" },
  },
});

const inputGroupTextStyle = css({
  display: "flex", alignItems: "center", gap: "2", overflow: "hidden",
  whiteSpace: "nowrap", color: "var(--muted-foreground)",
  "& svg": { pointerEvents: "none", marginInline: "-0.125rem" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "@media (min-width: 40rem)": {
    "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
  },
});

export function InputGroup({ className, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cx(inputGroupStyle, className)} data-slot="input-group" role="group" {...props} />;
}

export function InputGroupAddon({ className, align = "inline-start", ...props }: React.ComponentProps<"div"> & RecipeVariantProps<typeof inputGroupAddonVariants>): React.ReactElement {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Intentional mousedown handler for input focus behavior.
    <div
      className={cx(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element;
        if (!e.currentTarget.contains(target)) return;
        const isInteractive = target.closest("button, a, input, select, textarea, [role='button'], [role='combobox'], [role='listbox'], [data-slot='select-trigger']");
        if (isInteractive) return;
        e.preventDefault();
        const parent = e.currentTarget.parentElement;
        const input = parent?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
        if (input && !parent?.querySelector("input:focus, textarea:focus")) input.focus();
      }}
      {...props}
    />
  );
}

export function InputGroupText({ className, ...props }: React.ComponentProps<"span">): React.ReactElement {
  return <span className={cx(inputGroupTextStyle, className)} {...props} />;
}

export function InputGroupInput({ className, ...props }: InputProps): React.ReactElement {
  return <Input className={className} unstyled {...props} />;
}

export function InputGroupTextarea({ className, ...props }: TextareaProps): React.ReactElement {
  return <Textarea className={className} unstyled {...props} />;
}
