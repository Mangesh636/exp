"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { css, cx } from "styled-system/css";
import * as React from "react";

import { MinusSignIcon, PlusSignIcon } from "@/shared/components/icons/interface-icon";
import { Icon } from "@/shared/components/ui/icon";
import { Label } from "@/shared/components/ui/label";

export const NumberFieldContext: React.Context<{fieldId:string}|null> = React.createContext<{fieldId:string}|null>(null);

const rootStyle=css({display:"flex",width:"100%",flexDirection:"column",alignItems:"flex-start",gap:"2"});
const groupStyle=css({
 position:"relative",display:"flex",width:"100%",justifyContent:"space-between",borderWidth:"1px",borderColor:"var(--input)",borderRadius:"lg",backgroundColor:"var(--background)",color:"var(--foreground)",fontSize:{base:"base",sm:"sm"},boxShadow:"0 1px 2px color-mix(in srgb, black 5%, transparent)",transitionProperty:"box-shadow",
 "&::before":{content:'""',position:"absolute",inset:0,pointerEvents:"none",borderRadius:"calc(var(--radius-lg) - 1px)"},
 "&:not([data-disabled]):not(:focus-within):not([aria-invalid])::before":{boxShadow:"0 1px 0 color-mix(in srgb, black 4%, transparent)"},
 "&:focus-within":{borderColor:"var(--ring)",boxShadow:"0 0 0 3px var(--ring)"},
 "&:has([aria-invalid])":{borderColor:"color-mix(in srgb, var(--destructive) 36%, transparent)"},
 "&:focus-within:has([aria-invalid])":{borderColor:"color-mix(in srgb, var(--destructive) 64%, transparent)",boxShadow:"0 0 0 3px color-mix(in srgb, var(--destructive) 16%, transparent)"},
 "&[data-disabled]":{pointerEvents:"none",opacity:0.64},
 "&[data-disabled],&:focus-within,&[aria-invalid]":{boxShadow:"none"},
 "& svg:not([class*='size-'])":{width:"1.125rem",height:"1.125rem"},
 "& svg":{pointerEvents:"none",flexShrink:0},
 "@media (min-width:40rem)":{ "& svg:not([class*='size-'])":{width:"1rem",height:"1rem"} },
 _dark:{backgroundColor:"color-mix(in srgb, var(--input) 32%, transparent)","&:not([data-disabled]):not(:focus-within):not([aria-invalid])::before":{boxShadow:"0 -1px 0 color-mix(in srgb, white 6%, transparent)"},"&:focus-within:has([aria-invalid])":{boxShadow:"0 0 0 3px color-mix(in srgb, var(--destructive) 24%, transparent)"}}
});
const buttonStyle=css({
 position:"relative",display:"flex",flexShrink:0,cursor:"pointer",alignItems:"center",justifyContent:"center",
 paddingInline:"calc(var(--spacing) * 3 - 1px)",borderRadius:"calc(var(--radius-lg) - 1px)",transitionProperty:"background-color",
 "&:hover":{backgroundColor:"var(--accent)"},
 "&::after":{content:'""',position:"absolute",width:"100%",height:"100%"},
 "@media (pointer:coarse)":{ "&::after":{minWidth:"2.75rem",minHeight:"2.75rem"} },
 "[data-size='sm'] &":{paddingInline:"calc(var(--spacing) * 2.5 - 1px)"}
});
const inputStyle=css({
 width:"100%",minWidth:0,flexGrow:1,backgroundColor:"transparent",textAlign:"center",fontVariantNumeric:"tabular-nums",color:"var(--foreground)",outline:"none",
 height:"2.125rem",paddingInline:"calc(var(--spacing) * 3 - 1px)",lineHeight:"2.125rem",
 "[data-size='lg'] &":{height:"2.375rem",lineHeight:"2.375rem"},
 "[data-size='sm'] &":{height:"1.875rem",lineHeight:"1.875rem",paddingInline:"calc(var(--spacing) * 2.5 - 1px)"},
 "@media (min-width:40rem)":{height:"1.875rem",lineHeight:"1.875rem","[data-size='lg'] &":{height:"2.125rem",lineHeight:"2.125rem"},"[data-size='sm'] &":{height:"1.625rem",lineHeight:"2.125rem"}}
});
const scrubStyle=css({display:"flex",cursor:"ew-resize"});
const cursorStyle=css({filter:"drop-shadow(0 1px 1px #0008)"});

export function NumberField({id,className,size="default",...props}:NumberFieldPrimitive.Root.Props & {size?:"sm"|"default"|"lg"}):React.ReactElement {
 const generatedId=React.useId();const fieldId=id??generatedId;
 return <NumberFieldContext.Provider value={{fieldId}}><NumberFieldPrimitive.Root className={cx(rootStyle,className)} data-size={size} data-slot="number-field" id={fieldId} {...props}/></NumberFieldContext.Provider>;
}
export function NumberFieldGroup({className,...props}:NumberFieldPrimitive.Group.Props):React.ReactElement {
 return <NumberFieldPrimitive.Group className={cx(groupStyle,className)} data-slot="number-field-group" {...props}/>;
}
export function NumberFieldDecrement({className,...props}:NumberFieldPrimitive.Decrement.Props):React.ReactElement {
 return <NumberFieldPrimitive.Decrement className={cx(buttonStyle,className)} data-slot="number-field-decrement" {...props}><Icon icon={MinusSignIcon}/></NumberFieldPrimitive.Decrement>;
}
export function NumberFieldIncrement({className,...props}:NumberFieldPrimitive.Increment.Props):React.ReactElement {
 return <NumberFieldPrimitive.Increment className={cx(buttonStyle,className)} data-slot="number-field-increment" {...props}><Icon icon={PlusSignIcon}/></NumberFieldPrimitive.Increment>;
}
export function NumberFieldInput({className,...props}:NumberFieldPrimitive.Input.Props):React.ReactElement {
 return <NumberFieldPrimitive.Input className={cx(inputStyle,className)} data-slot="number-field-input" {...props}/>;
}
export function NumberFieldScrubArea({className,label,...props}:NumberFieldPrimitive.ScrubArea.Props & {label:string}):React.ReactElement {
 const context=React.useContext(NumberFieldContext);
 if(!context) throw new Error("NumberFieldScrubArea must be used within a NumberField component for accessibility.");
 return <NumberFieldPrimitive.ScrubArea className={cx(scrubStyle,className)} data-slot="number-field-scrub-area" {...props}><Label className={css({cursor:"ew-resize"})} htmlFor={context.fieldId}>{label}</Label><NumberFieldPrimitive.ScrubAreaCursor className={cursorStyle}><CursorGrowIcon/></NumberFieldPrimitive.ScrubAreaCursor></NumberFieldPrimitive.ScrubArea>;
}
export function CursorGrowIcon(props:React.ComponentProps<"svg">):React.ReactElement {
 return <svg aria-hidden="true" fill="black" height="14" stroke="white" viewBox="0 0 24 14" width="26" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z"/></svg>;
}
export {NumberFieldPrimitive};
