"use client";

import { useState, type ReactNode } from "react";

import { css } from "../../styled-system/css";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import {
  Dialog,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerDescription,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/shared/components/ui/menu";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/shared/components/ui/preview-card";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

const cardStyle = css({
  overflow: "hidden",
  minWidth: "0",
  borderWidth: "1px",
  borderColor: "var(--border)",
  borderRadius: "xl",
  background: "var(--card)",
});

const previewStyle = css({
  display: "flex",
  minHeight: "9rem",
  alignItems: "center",
  justifyContent: "center",
  padding: "5",
  borderBottomWidth: "1px",
  borderColor: "var(--border)",
});

function Example({ name, description, code, children }: {
  name: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <article className={cardStyle}>
      <div className={previewStyle}>{children}</div>
      <div className={css({ padding: "4" })}>
        <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>{name}</h3>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "xs", lineHeight: "1.6" })}>{description}</p>
      </div>
      <pre className={css({ overflowX: "auto", padding: "3", background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "mono", fontSize: "xs", whiteSpace: "pre" })}><code>{code}</code></pre>
    </article>
  );
}

export function OverlayExamples() {
  return (
    <section id="overlays" className={css({ marginTop: "12", scrollMarginTop: "2rem" })}>
      <div className={css({ marginBottom: "5" })}>
        <h2 className={css({ fontSize: "xl", fontWeight: "semibold", letterSpacing: "-0.03em" })}>Overlays & menus</h2>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "sm" })}>Dialogs, floating surfaces, contextual actions, and transient guidance.</p>
      </div>
      <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", xl: "repeat(2, minmax(0, 1fr))" }, gap: "4" })}>
        <Example name="Dialog" description="Modal surface for focused tasks and confirmation flows." code={'<Dialog>\n  <DialogTrigger>Open dialog</DialogTrigger>\n  <DialogPopup>\n    <DialogTitle>New collection</DialogTitle>\n    <DialogDescription>Create a place for related bookmarks.</DialogDescription>\n  </DialogPopup>\n</Dialog>'}>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
            <DialogPopup>
              <div className={css({ padding: "6", paddingTop: "8" })}>
                <DialogTitle className={css({ fontSize: "lg", fontWeight: "semibold" })}>New collection</DialogTitle>
                <DialogDescription className={css({ marginTop: "2", color: "var(--muted-foreground)", fontSize: "sm" })}>Create a place for related bookmarks.</DialogDescription>
                <div className={css({ marginTop: "5" })}><Button size="sm">Create collection</Button></div>
              </div>
            </DialogPopup>
          </Dialog>
        </Example>

        <Example name="Alert dialog" description="A modal confirmation for destructive or irreversible actions." code={'<AlertDialog>\n  <AlertDialogTrigger>Delete bookmark</AlertDialogTrigger>\n  <AlertDialogPopup>\n    <AlertDialogTitle>Delete this bookmark?</AlertDialogTitle>\n    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n    <AlertDialogClose>Cancel</AlertDialogClose>\n  </AlertDialogPopup>\n</AlertDialog>'}>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>Delete bookmark</AlertDialogTrigger>
            <AlertDialogPopup>
              <div className={css({ padding: "6", paddingTop: "8" })}>
                <AlertDialogTitle className={css({ fontWeight: "semibold", fontSize: "lg" })}>Delete this bookmark?</AlertDialogTitle>
                <AlertDialogDescription className={css({ marginTop: "2", color: "var(--muted-foreground)", fontSize: "sm" })}>This action cannot be undone.</AlertDialogDescription>
                <div className={css({ display: "flex", justifyContent: "flex-end", gap: "2", marginTop: "6" })}>
                  <AlertDialogClose render={<Button variant="outline" size="sm" />}>Cancel</AlertDialogClose>
                  <AlertDialogClose render={<Button variant="destructive" size="sm" />}>Delete</AlertDialogClose>
                </div>
              </div>
            </AlertDialogPopup>
          </AlertDialog>
        </Example>

        <Example name="Popover" description="Anchored floating content for lightweight contextual actions." code={'<Popover>\n  <PopoverTrigger>Open popover</PopoverTrigger>\n  <PopoverPopup><PopoverTitle>Quick note</PopoverTitle><PopoverDescription>Add context to this bookmark.</PopoverDescription></PopoverPopup>\n</Popover>'}>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" size="sm" />}>Quick note</PopoverTrigger>
            <PopoverPopup>
              <div className={css({ width: "15rem", padding: "4" })}>
                <PopoverTitle>Quick note</PopoverTitle>
                <PopoverDescription className={css({ marginTop: "2" })}>Add context to this bookmark.</PopoverDescription>
              </div>
            </PopoverPopup>
          </Popover>
        </Example>

        <Example name="Tooltip" description="Short, non-essential guidance attached to an interactive target." code={'<Tooltip>\n  <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>\n  <TooltipPopup>Copy bookmark URL</TooltipPopup>\n</Tooltip>'}>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>Hover or focus me</TooltipTrigger>
            <TooltipPopup>Copy bookmark URL</TooltipPopup>
          </Tooltip>
        </Example>

        <Example name="Sheet" description="Responsive side panel for settings, details, and secondary workflows." code={'<Sheet>\n  <SheetTrigger>Open settings</SheetTrigger>\n  <SheetPopup side="right"><SheetHeader><SheetTitle>Settings</SheetTitle><SheetDescription>Manage your workspace.</SheetDescription></SheetHeader></SheetPopup>\n</Sheet>'}>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" />}>Open settings</SheetTrigger>
            <SheetPopup side="right">
              <SheetHeader className={css({ padding: "6" })}>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Manage your workspace preferences.</SheetDescription>
              </SheetHeader>
            </SheetPopup>
          </Sheet>
        </Example>

        <Example name="Drawer" description="Swipe-aware mobile panel that can be positioned on any edge." code={'<Drawer position="bottom">\n  <DrawerTrigger>Open drawer</DrawerTrigger>\n  <DrawerPopup><DrawerTitle>Bookmark details</DrawerTitle><DrawerDescription>Review saved metadata.</DrawerDescription></DrawerPopup>\n</Drawer>'}>
          <Drawer position="bottom">
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>Open drawer</DrawerTrigger>
            <DrawerPopup>
              <div className={css({ padding: "6", paddingTop: "8" })}>
                <DrawerTitle>Bookmark details</DrawerTitle>
                <DrawerDescription className={css({ marginTop: "2" })}>Review saved metadata and notes.</DrawerDescription>
              </div>
            </DrawerPopup>
          </Drawer>
        </Example>

        <Example name="Menu" description="Keyboard-accessible action menu with item highlighting." code={'<Menu>\n  <MenuTrigger>More actions</MenuTrigger>\n  <MenuPopup><MenuItem>Open</MenuItem><MenuItem>Copy link</MenuItem></MenuPopup>\n</Menu>'}>
          <Menu>
            <MenuTrigger render={<Button variant="outline" size="sm" />}>More actions</MenuTrigger>
            <MenuPopup>
              <MenuItem>Open bookmark</MenuItem>
              <MenuItem>Copy link</MenuItem>
              <MenuItem variant="destructive">Remove</MenuItem>
            </MenuPopup>
          </Menu>
        </Example>

        <Example name="Context menu" description="Right-click actions scoped to a specific content surface." code={'<ContextMenu>\n  <ContextMenuTrigger>Right-click this card</ContextMenuTrigger>\n  <ContextMenuPopup><ContextMenuItem>Open</ContextMenuItem><ContextMenuItem>Copy link</ContextMenuItem></ContextMenuPopup>\n</ContextMenu>'}>
          <ContextMenu>
            <ContextMenuTrigger className={css({ display: "grid", placeItems: "center", width: "100%", maxWidth: "18rem", minHeight: "4rem", borderWidth: "1px", borderStyle: "dashed", borderColor: "var(--border)", borderRadius: "lg", color: "var(--muted-foreground)", fontSize: "sm" })}>
              Right-click this card
            </ContextMenuTrigger>
            <ContextMenuPopup>
              <ContextMenuItem>Open bookmark</ContextMenuItem>
              <ContextMenuItem>Copy link</ContextMenuItem>
            </ContextMenuPopup>
          </ContextMenu>
        </Example>

        <Example name="Preview card" description="Hover or focus a link to preview a resource without navigating away." code={'<PreviewCard>\n  <PreviewCardTrigger href="https://example.com">Example resource</PreviewCardTrigger>\n  <PreviewCardPopup>Preview content</PreviewCardPopup>\n</PreviewCard>'}>
          <PreviewCard>
            <PreviewCardTrigger href="https://example.com" className={css({ color: "var(--foreground)", fontSize: "sm", textDecoration: "underline", textUnderlineOffset: "3px" })}>Hover or focus this resource</PreviewCardTrigger>
            <PreviewCardPopup>
              <div className={css({ display: "grid", gap: "2" })}>
                <p className={css({ fontWeight: "semibold" })}>Example resource</p>
                <p className={css({ color: "var(--muted-foreground)", fontSize: "xs" })}>A compact preview surface for linked content.</p>
              </div>
            </PreviewCardPopup>
          </PreviewCard>
        </Example>
      </div>
    </section>
  );
}
