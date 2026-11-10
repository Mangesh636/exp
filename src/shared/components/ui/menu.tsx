"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { css, cx } from "../../../../styled-system/css";

import type * as React from "react";

import { ChevronRightIcon } from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";

export const MenuCreateHandle: typeof MenuPrimitive.createHandle = MenuPrimitive.createHandle;
export const Menu: typeof MenuPrimitive.Root = MenuPrimitive.Root;
export const MenuPortal: typeof MenuPrimitive.Portal = MenuPrimitive.Portal;

const positionerStyle = css({ zIndex: 50 });
const popupStyle = css({
  position: "relative", display: "flex",
  transformOrigin: "var(--transform-origin)", borderWidth: "1px",
  borderColor: "var(--border)", borderRadius: "lg",
  backgroundColor: "var(--popover)", outline: "none",
  boxShadow: "0 10px 15px -3px color-mix(in srgb, black 5%, transparent)",
  "&:not([class*='w-'])": { minWidth: "8rem" },
  "&::before": { content: '""', position: "absolute", pointerEvents: "none", inset: 0, borderRadius: "calc(var(--radius-lg) - 1px)", boxShadow: "0 1px 0 color-mix(in srgb, black 4%, transparent)" },
  "&:focus": { outline: "none" },
  _dark: { backgroundClip: "border-box", "&::before": { boxShadow: "0 -1px 0 color-mix(in srgb, white 6%, transparent)" } },
});
const scrollStyle = css({ width: "100%", maxHeight: "var(--available-height)", overflowY: "auto", padding: "1" });
const itemStyle = css({
  display: "flex", minHeight: "2rem", cursor: "default", userSelect: "none",
  alignItems: "center", gap: "2", borderRadius: "sm", paddingInline: "2", paddingBlock: "1",
  fontSize: { base: "base", sm: "sm" }, color: "var(--foreground)", outline: "none",
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "&[data-inset]": { paddingInlineStart: "2rem" },
  "&[data-variant='destructive']": { color: "var(--destructive-foreground)" },
  "& > svg:not([class*='opacity-'])": { opacity: 0.8 },
  "& > svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& > svg": { pointerEvents: "none", marginInline: "-0.125rem", flexShrink: 0 },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", "& > svg:not([class*='size-'])": { width: "1rem", height: "1rem" } },
});
const checkItemStyle = css({
  display: "grid", minHeight: "2rem", cursor: "default", alignItems: "center",
  gap: "2", borderRadius: "sm", paddingBlock: "1", paddingInlineStart: "2",
  fontSize: { base: "base", sm: "sm" }, color: "var(--foreground)", outline: "none",
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted]": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "[data-side='none'] &": { minWidth: "calc(var(--anchor-width) + 1.25rem)" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none", flexShrink: 0 },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" } },
});
const switchIndicatorStyle = css({
  display: "inline-flex", height: "calc(var(--thumb-size) + 2px)", width: "calc(var(--thumb-size) * 2 - 2px)",
  flexShrink: 0, alignItems: "center", borderRadius: "full", padding: "1px", outline: "none",
  transitionProperty: "background-color, box-shadow", transitionDuration: "200ms",
  backgroundColor: "var(--input)", "&[data-checked]": { backgroundColor: "var(--primary)" },
  "&[data-disabled]": { opacity: 0.64 },
  "&:focus-visible": { boxShadow: "0 0 0 2px var(--ring), 0 0 0 3px var(--background)" },
  "--thumb-size": "1rem", "@media (min-width: 40rem)": { "--thumb-size": "0.75rem" },
});
const switchThumbStyle = css({
  pointerEvents: "none", display: "block", aspectRatio: "1", height: "100%",
  borderRadius: "full", backgroundColor: "var(--background)",
  boxShadow: "0 1px 2px color-mix(in srgb, black 5%, transparent)",
  transformOrigin: "left center", transition: "translate .15s, border-radius .15s, scale .1s .1s, transform-origin .15s",
  "[data-checked] &": { transformOrigin: "var(--thumb-size) 50%", translate: "calc(var(--thumb-size) - 4px) 0" },
  "[data-slot='menu-checkbox-item']:active:not([data-disabled]) &": { scale: "1.1 1", borderRadius: "calc(var(--thumb-size) / 1.1)" },
  "[dir='rtl'] &": { transformOrigin: "right center" },
  "[dir='rtl'] [data-checked] &": { transformOrigin: "left center", translate: "calc((var(--thumb-size) - 4px) * -1) 0" },
});
const labelStyle = css({ paddingInline: "2", paddingBlock: "1.5", fontWeight: "medium", color: "var(--muted-foreground)", fontSize: "xs", "&[data-inset]": { paddingInlineStart: "2.25rem" }, "@media (min-width: 40rem)": { "&[data-inset]": { paddingInlineStart: "2rem" } } });
const separatorStyle = css({ height: "1px", marginInline: "2", marginBlock: "1", backgroundColor: "var(--border)" });
const shortcutStyle = css({ marginInlineStart: "auto", fontFamily: "sans-serif", fontWeight: "medium", color: "color-mix(in srgb, var(--muted-foreground) 72%, transparent)", fontSize: "xs", letterSpacing: "0.1em" });
const subTriggerStyle = css({
  display: "flex", minHeight: "2rem", alignItems: "center", gap: "2",
  borderRadius: "sm", paddingInline: "2", paddingBlock: "1", fontSize: { base: "base", sm: "sm" },
  color: "var(--foreground)", outline: "none",
  "&[data-disabled]": { pointerEvents: "none", opacity: 0.64 },
  "&[data-highlighted],&[data-popup-open]": { backgroundColor: "var(--accent)", color: "var(--accent-foreground)" },
  "&[data-inset]": { paddingInlineStart: "2rem" },
  "& > svg:not(:last-child)": { marginInline: "-0.125rem" },
  "& svg:not([class*='size-'])": { width: "1.125rem", height: "1.125rem" },
  "& svg": { pointerEvents: "none" },
  "@media (min-width: 40rem)": { minHeight: "1.75rem", "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" } },
});

export function MenuTrigger({ className, children, ...props }: MenuPrimitive.Trigger.Props): React.ReactElement {
  return <MenuPrimitive.Trigger className={className} data-slot="menu-trigger" {...props}>{children}</MenuPrimitive.Trigger>;
}
export function MenuPopup({ children, className, sideOffset = 4, align = "center", alignOffset, side = "bottom", anchor, portalProps, ...props }: MenuPrimitive.Popup.Props & { align?: MenuPrimitive.Positioner.Props["align"]; sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"]; alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"]; side?: MenuPrimitive.Positioner.Props["side"]; anchor?: MenuPrimitive.Positioner.Props["anchor"]; portalProps?: MenuPrimitive.Portal.Props }): React.ReactElement {
  return <MenuPortal {...portalProps}><MenuPrimitive.Positioner align={align} alignOffset={alignOffset} anchor={anchor} className={positionerStyle} data-slot="menu-positioner" side={side} sideOffset={sideOffset}><MenuPrimitive.Popup className={cx(popupStyle,className)} data-slot="menu-popup" {...props}><div className={scrollStyle}>{children}</div></MenuPrimitive.Popup></MenuPrimitive.Positioner></MenuPortal>;
}
export function MenuGroup(props: MenuPrimitive.Group.Props): React.ReactElement { return <MenuPrimitive.Group data-slot="menu-group" {...props} />; }
export function MenuItem({ className, inset, variant="default", ...props }: MenuPrimitive.Item.Props & { inset?: boolean; variant?: "default"|"destructive" }): React.ReactElement {
 return <MenuPrimitive.Item className={cx(itemStyle,className)} data-inset={inset} data-slot="menu-item" data-variant={variant} {...props} />;
}
export function MenuLinkItem({ className, inset, variant="default", closeOnClick=true, ...props }: MenuPrimitive.LinkItem.Props & { inset?: boolean; variant?: "default"|"destructive" }): React.ReactElement {
 return <MenuPrimitive.LinkItem className={cx(itemStyle,className)} closeOnClick={closeOnClick} data-inset={inset} data-slot="menu-link-item" data-variant={variant} {...props} />;
}
export function MenuCheckboxItem({ className, children, checked, variant="default", ...props }: MenuPrimitive.CheckboxItem.Props & { variant?: "default"|"switch" }): React.ReactElement {
 return <MenuPrimitive.CheckboxItem checked={checked} className={cx(checkItemStyle,variant==="switch"?css({gridTemplateColumns:"1fr auto",gap:"4",paddingInlineEnd:"1.5"}):css({gridTemplateColumns:"0.75rem 1fr",paddingInlineEnd:"4"}),className)} data-slot="menu-checkbox-item" {...props}>
 {variant==="switch"?<><span style={{gridColumnStart:1}}>{children}</span><MenuPrimitive.CheckboxItemIndicator className={switchIndicatorStyle} keepMounted><span className={switchThumbStyle}/></MenuPrimitive.CheckboxItemIndicator></>:<><MenuPrimitive.CheckboxItemIndicator className={css({gridColumnStart:1,marginInlineStart:"-0.125rem"})}><svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5.252 12.7 10.2 18.63 18.748 5.37"/></svg></MenuPrimitive.CheckboxItemIndicator><span style={{gridColumnStart:2}}>{children}</span></>}
 </MenuPrimitive.CheckboxItem>;
}
export function MenuRadioGroup(props: MenuPrimitive.RadioGroup.Props): React.ReactElement { return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props}/>; }
export function MenuRadioItem({className,children,...props}:MenuPrimitive.RadioItem.Props):React.ReactElement {
 return <MenuPrimitive.RadioItem className={cx(checkItemStyle,css({gridTemplateColumns:"0.75rem 1fr",paddingInlineEnd:"4"}),className)} data-slot="menu-radio-item" {...props}><MenuPrimitive.RadioItemIndicator className={css({gridColumnStart:1,marginInlineStart:"-0.125rem"})}><svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5.252 12.7 10.2 18.63 18.748 5.37"/></svg></MenuPrimitive.RadioItemIndicator><span style={{gridColumnStart:2}}>{children}</span></MenuPrimitive.RadioItem>;
}
export function MenuGroupLabel({className,inset,...props}:MenuPrimitive.GroupLabel.Props & {inset?:boolean}):React.ReactElement {
 return <MenuPrimitive.GroupLabel className={cx(labelStyle,className)} data-inset={inset} data-slot="menu-label" {...props}/>;
}
export function MenuSeparator({className,...props}:MenuPrimitive.Separator.Props):React.ReactElement {
 return <MenuPrimitive.Separator className={cx(separatorStyle,className)} data-slot="menu-separator" {...props}/>;
}
export function MenuShortcut({className,...props}:React.ComponentProps<"kbd">):React.ReactElement {
 return <kbd className={cx(shortcutStyle,className)} data-slot="menu-shortcut" {...props}/>;
}
export function MenuSub(props:MenuPrimitive.SubmenuRoot.Props):React.ReactElement { return <MenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props}/>; }
export function MenuSubTrigger({className,inset,children,...props}:MenuPrimitive.SubmenuTrigger.Props & {inset?:boolean}):React.ReactElement {
 return <MenuPrimitive.SubmenuTrigger className={cx(subTriggerStyle,className)} data-inset={inset} data-slot="menu-sub-trigger" {...props}>{children}<Icon icon={ChevronRightIcon} className={css({marginInlineStart:"auto",marginInlineEnd:"-0.125rem",opacity:0.8})}/></MenuPrimitive.SubmenuTrigger>;
}
export function MenuSubPopup({className,sideOffset=0,alignOffset,align="start",...props}:MenuPrimitive.Popup.Props & {align?:MenuPrimitive.Positioner.Props["align"];sideOffset?:MenuPrimitive.Positioner.Props["sideOffset"];alignOffset?:MenuPrimitive.Positioner.Props["alignOffset"]}):React.ReactElement {
 const defaultAlignOffset=align!=="center"?-5:undefined;
 return <MenuPopup align={align} alignOffset={alignOffset??defaultAlignOffset} className={className} data-slot="menu-sub-content" side="inline-end" sideOffset={sideOffset} {...props}/>;
}
export { MenuPrimitive, MenuCreateHandle as DropdownMenuCreateHandle, Menu as DropdownMenu, MenuPortal as DropdownMenuPortal, MenuTrigger as DropdownMenuTrigger, MenuPopup as DropdownMenuContent, MenuGroup as DropdownMenuGroup, MenuItem as DropdownMenuItem, MenuCheckboxItem as DropdownMenuCheckboxItem, MenuRadioGroup as DropdownMenuRadioGroup, MenuRadioItem as DropdownMenuRadioItem, MenuGroupLabel as DropdownMenuLabel, MenuSeparator as DropdownMenuSeparator, MenuShortcut as DropdownMenuShortcut, MenuSub as DropdownMenuSub, MenuSubTrigger as DropdownMenuSubTrigger, MenuSubPopup as DropdownMenuSubContent };
