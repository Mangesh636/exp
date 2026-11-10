"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { mergeProps } from "@base-ui/react/merge-props";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { useRender } from "@base-ui/react/use-render";
import { css, cx } from "styled-system/css";
import { createPortal } from "react-dom";

import type {
  ComponentProps,
  MouseEvent,
  PointerEvent,
  ReactElement,
  ReactNode,
} from "react";

import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  type ComposerEditorOptions,
  ComposerEditorProvider,
  type ComposerItemValue,
  type ComposerTokenPart,
  focusComposerInput,
  getComposerText,
  useComposerAnchorContext,
  useComposerEditorContext,
  useComposerInputLayout,
  useComposerItem,
  useComposerSuggestionsContext,
} from "@/shared/lib/composer-editor";

type ComposerPopupProps = ComponentProps<typeof PopoverPrimitive.Popup> & {
  anchor?: ComponentProps<typeof PopoverPrimitive.Positioner>["anchor"];
  side?: ComponentProps<typeof PopoverPrimitive.Positioner>["side"];
  align?: ComponentProps<typeof PopoverPrimitive.Positioner>["align"];
  sideOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>["sideOffset"];
  alignOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>["alignOffset"];
  positionerClassName?: string;
  portalProps?: ComponentProps<typeof PopoverPrimitive.Portal>;
};

type ComposerFormProps = useRender.ComponentProps<"form">;
type ComposerLayout = "stacked" | "adaptive";
type ComposerTokenVariant = "default" | "chip";

const composerFrameStyle = css({
  position: "relative",
  display: "flex",
  minHeight: 0,
  minWidth: 0,
  cursor: "text",
  flexDirection: "column",
  borderRadius: "var(--composer-radius)",
  borderWidth: "1px",
  borderColor: "var(--input)",
  backgroundColor: "var(--background)",
  paddingBottom: "calc(var(--composer-padding) - 1px)",
  color: "var(--foreground)",
  boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  transitionProperty: "box-shadow",
  "--composer-radius": "var(--radius-xl)",
  "--composer-max-rows": "4",
  "--composer-padding": "calc(var(--spacing) * 2)",
  "&[data-disabled]": { cursor: "default", opacity: 0.64, boxShadow: "none" },
  "&:not([data-disabled])": {
    "&:not(:has([data-slot='composer-input']:focus-visible)):not(:has([aria-invalid]))::before": {
      boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
    },
  },
  "&:has([data-slot='composer-input']:focus-visible):has([aria-invalid])": {
    borderColor: "color-mix(in srgb, var(--destructive) 64%, transparent)",
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)",
  },
  "&:has([data-slot='composer-input']:focus-visible):not(:has([aria-invalid]))": {
    borderColor: "var(--ring)",
  },
  "&:has([data-slot='composer-input']:focus-visible)": {
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 24%, transparent)",
  },
  "&:has([aria-invalid])": {
    borderColor: "color-mix(in srgb, var(--destructive) 36%, transparent)",
    boxShadow: "none",
  },
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--composer-radius) - 1px)",
  },
  ".dark &": {
    backgroundColor: "color-mix(in srgb, var(--input) 32%, transparent)",
    "&:has([aria-invalid])": {
      "--ring-color": "color-mix(in srgb, var(--destructive) 24%, transparent)",
    },
    "&:not([data-disabled]):not(:has([data-slot='composer-input']:focus-visible)):not(:has([aria-invalid]))::before": {
      boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)",
    },
    "&:has([aria-invalid])": {
      boxShadow: "none",
    },
  },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
  "@media (min-width: 48rem)": { "--composer-max-rows": "8" },
});

const composerAdaptiveStyle = css({
  "&[data-layout='adaptive']": {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    alignItems: "center",
    "&[data-multiline]": { gridTemplateRows: "minmax(0, 1fr) auto" },
    "&:not([data-multiline])": {
      paddingInline: "calc(var(--spacing) * 2 - 1px)",
      paddingTop: "calc(var(--composer-padding) - 1px)",
    },
  },
});

const composerInputStyle = css({
  fieldSizing: "content",
  overflowWrap: "anywhere",
  position: "relative",
  display: "block",
  minHeight: "calc(var(--composer-min-rows, 1) * 1lh + var(--spacing) * 2)",
  width: "100%",
  minWidth: 0,
  resize: "none",
  whiteSpace: "pre-wrap",
  border: 0,
  backgroundColor: "transparent",
  paddingInline: "calc(var(--spacing) * 3 - 1px)",
  paddingBlock: "calc(var(--spacing) * 1)",
  outline: "none",
  "&::placeholder": { color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)" },
  "&[data-empty]::before": {
    content: "attr(data-placeholder)",
    pointerEvents: "none",
    position: "absolute",
    color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)",
  },
  ":where([data-layout='adaptive']:not([data-multiline])) &": {
    paddingInline: "0.25rem",
  },
  "@media (min-width: 48rem)": {
    ":where([data-layout='adaptive']) &": {
      minHeight: "calc(var(--composer-min-rows, 1) * 1lh + var(--spacing) * 2)",
    },
    minHeight: "calc(var(--composer-min-rows, 2) * 1lh + var(--spacing) * 2)",
  },
});

const composerScrollStyle = css({
  display: "flex",
  height: "auto",
  minHeight: 0,
  minWidth: 0,
  flexDirection: "column",
  borderTopLeftRadius: "inherit",
  color: "var(--foreground)",
  fontSize: "1rem",
  "--composer-scroll-padding": "var(--composer-padding)",
  ":where([data-layout='adaptive'][data-multiline]) &": {
    gridColumn: "1 / -1",
    gridRowStart: 1,
    alignSelf: "stretch",
  },
  ":where([data-layout='adaptive']) &": {
    gridColumnStart: 2,
    gridRowStart: 1,
  },
  ":where([data-layout='adaptive']:not([data-multiline])) &": {
    borderRadius: 0,
    "--composer-scroll-padding": "0px",
  },
  "& [data-slot='scroll-area-viewport']": {
    height: "auto !important",
    maxHeight: "min(var(--composer-max-height, calc(var(--composer-max-rows, 8) * var(--composer-line-height, 1lh) + var(--composer-input-padding, var(--spacing) * 2) + var(--composer-scroll-padding))), 50dvh)",
    minHeight: "0 !important",
    paddingBottom: "0 !important",
  },
  "& [data-slot='scroll-area-content']": {
    paddingTop: "max(0px, calc(var(--composer-scroll-padding) - 1px))",
  },
  "@media (min-width: 48rem)": { fontSize: "0.875rem" },
});

const composerTokenStyle = css({
  overflowWrap: "break-word",
  display: "inline",
  cursor: "default",
  verticalAlign: "baseline",
  fontWeight: "normal",
  color: "var(--primary)",
  "&[data-variant='default']": { fontWeight: "medium" },
  "&[data-variant='chip']": {
    boxDecorationBreak: "clone",
    borderRadius: "var(--radius-md)",
    backgroundColor: "var(--accent)",
    paddingInline: "0.375rem",
    paddingBlock: "1px",
    color: "var(--accent-foreground)",
  },
  "& [data-slot='composer-token-icon']:empty": { display: "none" },
  "& [data-slot='composer-token-icon'] > svg": { width: "0.875rem", height: "0.875rem" },
});

const composerTokenIconStyle = css({
  display: "inline",
  whiteSpace: "nowrap",
  opacity: 0.8,
  "&::after": { content: '"\\2060\\00a0"' },
  "& > svg": { display: "inline-block", verticalAlign: "-0.125em" },
});

const composerPopupStyle = css({
  position: "relative",
  width: "var(--anchor-width)",
  maxWidth: "var(--available-width)",
  borderRadius: "var(--radius-lg)",
  borderWidth: "1px",
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
  outline: "none",
  transition: "opacity 150ms",
  "&::before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    borderRadius: "calc(var(--radius-lg) - 1px)",
    boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)",
  },
  "&[data-ending-style]": { visibility: "hidden" },
  "&[data-starting-style]": { opacity: 0 },
  ".dark &::before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" },
  ":where(html:not(.dark)) &": { backgroundClip: "padding-box" },
});

const composerListStyle = css({
  "&:not(:empty)": { scrollPaddingBlock: "0.25rem", padding: "0.25rem" },
  ":where([data-has-overflow-y]) &": { paddingInlineEnd: "0.75rem" },
});

const composerListScrollStyle = css({
  height: "auto",
  "& [data-slot='scroll-area-viewport']": {
    height: "auto !important",
    maxHeight: "min(var(--available-height), 16rem)",
  },
});

const composerItemStyle = css({
  display: "flex",
  minHeight: "2rem",
  width: "100%",
  cursor: "default",
  userSelect: "none",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "var(--radius-sm)",
  paddingInline: "0.5rem",
  paddingBlock: "0.25rem",
  textAlign: "start",
  fontSize: "1rem",
  outline: "none",
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": {
    backgroundColor: "var(--accent)",
    color: "var(--accent-foreground)",
  },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", fontSize: "0.875rem" },
});

const composerStatusStyle = css({
  paddingInline: "0.75rem",
  paddingBlock: "0.5rem",
  fontWeight: "medium",
  color: "var(--muted-foreground)",
  fontSize: "0.75rem",
  "&:empty": { margin: 0, padding: 0 },
});

const composerActionsStyle = css({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  marginInline: "calc(var(--spacing) * 2 - 1px)",
  ":where([data-layout='adaptive']) &": {
    gridColumn: "1 / -1",
    gridRowStart: 2,
  },
  ":where([data-layout='adaptive']:not([data-multiline])) &": {
    display: "contents",
  },
});

const composerActionGroupStyle = css({
  display: "flex",
  minWidth: 0,
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.25rem",
  ":where([data-layout='adaptive']:not([data-multiline])) &": {
    gridRowStart: 1,
  },
  "&[data-align='start']": {
    ":where([data-layout='adaptive']:not([data-multiline])) &": {
      gridColumnStart: 1,
      marginInlineEnd: "0.5rem",
    },
  },
  "&[data-align='end']": {
    marginInlineStart: "auto",
    justifyContent: "flex-end",
    ":where([data-layout='adaptive']:not([data-multiline])) &": {
      gridColumnStart: 3,
      marginInlineStart: "0.5rem",
    },
  },
});

const composerPositionerStyle = css({
  zIndex: 50,
  width: "var(--anchor-width)",
});

export function ComposerFrame({
  className,
  layout = "stacked",
  render,
  ref,
  name,
  children,
  ...props
}: ComposerFormProps & { layout?: ComposerLayout }): ReactElement {
  const editor = useComposerEditorContext();
  const anchorRef = useComposerAnchorContext();
  const defaultProps = {
    "data-slot": "composer",
    "data-layout": layout,
    "data-base-ui-swipe-ignore": "",
    onMouseDown: (event: MouseEvent<HTMLFormElement>): void => {
      focusComposerInput(event, true);
    },
    onClick: (event: MouseEvent<HTMLFormElement>): void => {
      focusComposerInput(event, false);
    },
    "data-disabled": editor?.disabled ? "" : undefined,
    "data-readonly": editor?.readOnly ? "" : undefined,
    children: (
      <>
        {children}
        {name && (
          <input
            type="hidden"
            name={name}
            value={getComposerText(editor?.value ?? [])}
            disabled={editor?.disabled}
          />
        )}
      </>
    ),
    className: cx(
      composerFrameStyle,
      composerAdaptiveStyle,
      className,
    ),
  };
  return useRender({
    defaultTagName: "form",
    render,
    ref: [anchorRef ?? null, ref ?? null],
    props: mergeProps<"form">(defaultProps, editor?.formProps ?? {}, props),
  });
}

export type ComposerProps = Omit<
  ComposerFormProps,
  "defaultValue" | "onSubmit" | "name"
> &
  ComposerEditorOptions & { layout?: ComposerLayout };

export function Composer({
  layout,
  value,
  defaultValue,
  onValueChange,
  onSubmit,
  onQueryChange,
  onAction,
  submitOnEmptySuggestions,
  triggers,
  disabled,
  readOnly,
  submitDisabled,
  allowEmpty,
  submitOnEnter,
  name,
  getSuggestionsAnnouncement,
  ...frameProps
}: ComposerProps): ReactElement {
  return (
    <ComposerEditorProvider
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onSubmit={onSubmit}
      onQueryChange={onQueryChange}
      onAction={onAction}
      submitOnEmptySuggestions={submitOnEmptySuggestions}
      triggers={triggers}
      disabled={disabled}
      readOnly={readOnly}
      submitDisabled={submitDisabled}
      allowEmpty={allowEmpty}
      submitOnEnter={submitOnEnter}
      getSuggestionsAnnouncement={getSuggestionsAnnouncement}
    >
      <ComposerFrame {...frameProps} layout={layout} name={name} />
    </ComposerEditorProvider>
  );
}

export function ComposerInput({
  className,
  placeholder,
  renderToken,
  render,
  ref,
  ...props
}: useRender.ComponentProps<"div"> & {
  placeholder?: string;
  renderToken?: (token: ComposerTokenPart) => ReactNode;
}): ReactElement {
  const editor = useComposerEditorContext();
  const suggestions = useComposerSuggestionsContext();
  const tokenHosts = editor?.tokenHosts;
  const { scrollRef, inputRef: layoutInputRef } = useComposerInputLayout();
  const textarea = editor?.isTextarea ?? false;
  const { ref: editorRef, ...editorProps } = editor?.inputProps ?? {};
  const defaultProps = {
    "data-slot": "composer-input",
    ...(render === undefined
      ? {
          contentEditable: true,
          role: "textbox" as const,
          "aria-multiline": true as const,
          suppressContentEditableWarning: true,
        }
      : {}),
    "data-empty": !textarea && editor?.isEmpty && !editor.isComposing ? "" : undefined,
    ...(textarea ? { placeholder } : {}),
    "data-placeholder": placeholder,
    "aria-placeholder": editor ? placeholder : undefined,
    className: cx(composerInputStyle, className),
  };
  const inputBehaviorProps = textarea
    ? {
        contentEditable: undefined,
        disabled: editor?.disabled,
        readOnly: editor?.readOnly,
      }
    : (suggestions?.inputProps ?? {});
  const input = useRender({
    defaultTagName: "div",
    render,
    ref: [editorRef ?? null, layoutInputRef, ref ?? null],
    props: mergeProps<"div">(
      defaultProps,
      editorProps,
      inputBehaviorProps,
      props,
    ),
  });
  return (
    <>
      {/* The drawer reserves keyboard space; its nested input scroller needs no extra bottom padding. */}
      <ScrollArea
        ref={scrollRef}
        className={composerScrollStyle}
        data-slot="composer-scroll-area"
        overscrollContain
        scrollFade
      >
        {input}
      </ScrollArea>
      {tokenHosts?.map((host, index) => {
        const node = host.parentElement;
        if (!node) return null;
        const token: ComposerTokenPart = {
          type: node.dataset.composerToken === "action" ? "action" : "mention",
          id: node.dataset.id ?? "",
          label: node.dataset.label ?? "",
          trigger: node.dataset.trigger ?? "@",
          ...(node.dataset.kind ? { kind: node.dataset.kind } : {}),
          ...(node.dataset.data !== undefined ? { data: node.dataset.data } : {}),
          ...(node.dataset.text !== undefined ? { text: node.dataset.text } : {}),
        };
        return createPortal(
          renderToken?.(token) ?? <ComposerToken token={token} />,
          host,
          String(index),
        );
      })}
    </>
  );
}

export function ComposerToken({
  variant = "default",
  token,
  icon,
  children,
  className,
  ...props
}: Omit<ComponentProps<"span">, "contentEditable"> & {
  variant?: ComposerTokenVariant;
  token: ComposerTokenPart;
  icon?: ReactNode;
}): ReactElement {
  return (
    <span
      className={cx(composerTokenStyle, className)}
      contentEditable={false}
      data-kind={token.kind}
      data-slot="composer-token"
      data-type={token.type}
      data-variant={variant}
      {...props}
    >
      {variant === "chip" && icon && (
        <span
          aria-hidden="true"
          className={composerTokenIconStyle}
          data-slot="composer-token-icon"
        >
          {icon}
        </span>
      )}
      <span data-slot="composer-token-label">
        {variant === "default" && token.trigger}
        {children ?? token.label}
      </span>
    </span>
  );
}

export function ComposerPopup({
  className,
  anchor,
  side = "top",
  align = "start",
  sideOffset = 4,
  alignOffset,
  positionerClassName,
  portalProps,
  ...props
}: ComposerPopupProps): ReactElement {
  const anchorRef = useComposerAnchorContext();
  const editor = useComposerEditorContext();
  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <PopoverPrimitive.Positioner
        anchor={anchor ?? anchorRef ?? undefined}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cx(composerPositionerStyle, positionerClassName)}
        data-slot="composer-positioner"
      >
        <PopoverPrimitive.Popup
          className={cx(composerPopupStyle, className)}
          data-slot="composer-popup"
          role={editor ? "presentation" : undefined}
          initialFocus={editor ? false : undefined}
          finalFocus={editor ? false : undefined}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function ComposerList({
  className,
  children,
  render,
  ref,
  ...props
}: Omit<useRender.ComponentProps<"div">, "children"> & {
  children?: ReactNode | ((item: ComposerItemValue, index: number) => ReactNode);
}): ReactElement {
  const suggestions = useComposerSuggestionsContext();
  const defaultProps = {
    "data-slot": "composer-list",
    id: suggestions?.listId,
    role: suggestions ? "listbox" : undefined,
    "aria-label": suggestions ? "Suggestions" : undefined,
    children:
      typeof children === "function"
        ? (suggestions?.items as readonly ComposerItemValue[] | undefined)?.map(children)
        : children,
    className: cx(composerListStyle, className),
  };
  const list = useRender({
    defaultTagName: "div",
    render,
    ref: [suggestions?.registerList ?? null, ref ?? null],
    props: mergeProps<"div">(defaultProps, props),
  });
  return (
    <ScrollArea
      className={composerListScrollStyle}
      overscrollContain
      scrollbarGutter
      scrollFade
    >
      {list}
    </ScrollArea>
  );
}

export function ComposerItem({
  className,
  value,
  disabled: disabledProp,
  render,
  ref,
  ...props
}: Omit<
  useRender.ComponentProps<"button", { highlighted: boolean; disabled: boolean }>,
  "value"
> & {
  value?: ComposerItemValue;
}): ReactElement {
  const disabled = Boolean(disabledProp || value?.disabled);
  const item = useComposerItem(value, disabled);
  const { highlighted } = item;
  const defaultProps = {
    ...item.props,
    type: "button" as const,
    "data-slot": "composer-item",
    disabled,
    className: cx(composerItemStyle, className),
  };
  return useRender({
    defaultTagName: "button",
    render,
    ref: [item.ref, ref ?? null],
    state: { highlighted, disabled },
    props: mergeProps<"button">(defaultProps, props),
  });
}

export function ComposerStatus({
  className,
  render,
  ref,
  ...props
}: useRender.ComponentProps<"div">): ReactElement {
  const defaultProps = {
    role: "status",
    "data-slot": "composer-status",
    className: cx(composerStatusStyle, className),
  };
  return useRender({
    defaultTagName: "div",
    render,
    ref,
    props: mergeProps<"div">(defaultProps, props),
  });
}

export function ComposerActions({
  className,
  ...props
}: ComponentProps<"div">): ReactElement {
  return (
    <div
      className={cx(composerActionsStyle, className)}
      data-slot="composer-actions"
      {...props}
    />
  );
}

export function ComposerActionGroup({
  className,
  align = "start",
  ...props
}: ComponentProps<"div"> & { align?: "start" | "end" }): ReactElement {
  return (
    <div
      className={cx(composerActionGroupStyle, className)}
      data-align={align}
      data-slot="composer-action-group"
      {...props}
    />
  );
}

export function ComposerSubmit({
  disabled,
  className,
  style,
  render,
  ref,
  ...props
}: Omit<ComponentProps<typeof ButtonPrimitive>, "type">): ReactElement {
  const editor = useComposerEditorContext();
  const defaultProps = {
    "data-slot": "composer-submit",
    type: "button" as const,
    disabled: disabled ?? !editor?.canSubmit,
    onPointerDown: (event: PointerEvent<HTMLButtonElement>): void => {
      const input = editor?.rootRef.current?.querySelector(
        '[data-slot="composer-input"]',
      );
      if (
        event.button === 0 &&
        input === event.currentTarget.ownerDocument.activeElement
      ) {
        event.preventDefault();
      }
    },
    onClick: (event: MouseEvent<HTMLButtonElement>): void => {
      if (event.defaultPrevented || disabled) return;
      event.preventDefault();
      editor?.submit();
    },
  };
  return (
    <ButtonPrimitive
      {...mergeProps<"button">(defaultProps, props)}
      className={className}
      style={style}
      render={render}
      ref={ref}
    />
  );
}

export {
  type ComposerChangeDetails,
  type ComposerItemValue,
  type ComposerPart,
  type ComposerQuery,
  type ComposerTokenPart,
  type ComposerTrigger,
  type ComposerValue,
  getComposerText,
  useComposerContext,
  useComposerFilter,
} from "@/shared/lib/composer-editor";
export type { ComposerPopupProps, ComposerTokenVariant };
