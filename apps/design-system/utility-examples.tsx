"use client";

import { useState, type ReactNode } from "react";

import { css } from "../../styled-system/css";
import { Search01Icon } from "@/shared/components/icons/interface-icon";
import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@/shared/components/ui/autocomplete";
import { Calendar } from "@/shared/components/ui/calendar";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { CheckboxGroup } from "@/shared/components/ui/checkbox-group";
import { Combobox, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@/shared/components/ui/combobox";
import { Command, CommandInput, CommandItem, CommandList } from "@/shared/components/ui/command";
import { Composer, ComposerActions, ComposerInput, ComposerSubmit } from "@/shared/components/ui/composer";
import { Form } from "@/shared/components/ui/form";
import { Icon } from "@/shared/components/ui/icon";
import { OTPField, OTPFieldInput } from "@/shared/components/ui/otp-field";
import { SegmentedControl, SegmentedControlItem } from "@/shared/components/ui/segmented-control";
import { ToastProvider, toastManager } from "@/shared/components/ui/toast";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/shared/components/ui/toolbar";
import { Button } from "@/shared/components/ui/button";

const cardStyle = css({ overflow: "hidden", minWidth: "0", borderWidth: "1px", borderColor: "var(--border)", borderRadius: "xl", background: "var(--card)" });
const previewStyle = css({ display: "flex", minHeight: "9rem", alignItems: "center", justifyContent: "center", padding: "5", borderBottomWidth: "1px", borderColor: "var(--border)" });

function Example({ name, description, children }: { name: string; description: string; children: ReactNode }) {
  return (
    <article className={cardStyle}>
      <div className={previewStyle}>{children}</div>
      <div className={css({ padding: "4" })}>
        <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>{name}</h3>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "xs", lineHeight: "1.6" })}>{description}</p>
      </div>
    </article>
  );
}

function ToastDemo() {
  const [sent, setSent] = useState(false);
  return (
    <ToastProvider>
      <div className={css({ display: "flex", flexDirection: "column", alignItems: "center", gap: "2" })}>
        <Button size="sm" onClick={() => { toastManager.add({ title: "Bookmark saved", description: "The resource was added to your library." }); setSent(true); }}>
          Show toast
        </Button>
        <span className={css({ color: "var(--muted-foreground)", fontSize: "xs" })}>{sent ? "Toast sent to the viewport" : "Trigger a toast notification"}</span>
      </div>
    </ToastProvider>
  );
}

export function UtilityExamples() {
  return (
    <section id="utilities" className={css({ marginTop: "12", scrollMarginTop: "2rem" })}>
      <div className={css({ marginBottom: "5" })}>
        <h2 className={css({ fontSize: "xl", fontWeight: "semibold", letterSpacing: "-0.03em" })}>Utilities & advanced inputs</h2>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "sm" })}>Date selection, search, structured inputs, and keyboard-oriented controls.</p>
      </div>
      <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", xl: "repeat(2, minmax(0, 1fr))" }, gap: "4" })}>
        <Example name="Calendar" description="Month navigation and single-date selection." >
          <Calendar mode="single" className={css({ "--cell-size": "2rem" })} />
        </Example>

        <Example name="Checkbox group" description="Select multiple values from a related set." >
          <CheckboxGroup defaultValue={["docs"]} className={css({ gap: "3" })}>
            <label className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}><Checkbox value="docs" /> Documentation</label>
            <label className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}><Checkbox value="videos" /> Videos</label>
            <label className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}><Checkbox value="articles" /> Articles</label>
          </CheckboxGroup>
        </Example>

        <Example name="OTP field" description="One-time passcode input with segmented entry slots." >
          <OTPField length={6} aria-label="Verification code">
            <OTPFieldInput />
          </OTPField>
        </Example>

        <Example name="Segmented control" description="A compact set of peer actions presented as one control." >
          <SegmentedControl aria-label="View density">
            <SegmentedControlItem aria-pressed="true">Comfortable</SegmentedControlItem>
            <SegmentedControlItem aria-pressed="false">Compact</SegmentedControlItem>
          </SegmentedControl>
        </Example>

        <Example name="Toolbar" description="Keyboard-navigable group of related editing actions." >
          <Toolbar aria-label="Text formatting">
            <ToolbarGroup>
              <ToolbarButton aria-label="Bold">B</ToolbarButton>
              <ToolbarButton aria-label="Italic">I</ToolbarButton>
              <ToolbarButton aria-label="Underline">U</ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator orientation="vertical" />
            <ToolbarGroup>
              <ToolbarButton aria-label="More options">•••</ToolbarButton>
            </ToolbarGroup>
          </Toolbar>
        </Example>

        <Example name="Form" description="Form root for validation-aware, accessible submission flows." >
          <Form className={css({ display: "flex", width: "100%", maxWidth: "20rem", flexDirection: "column", gap: "3" })} onSubmit={(event) => event.preventDefault()}>
            <input name="resource" placeholder="Resource title" required className={css({ height: "2.25rem", width: "100%", borderWidth: "1px", borderColor: "var(--input)", borderRadius: "lg", paddingX: "3", background: "var(--background)", fontSize: "sm" })} />
            <Button type="submit" size="sm">Submit example</Button>
          </Form>
        </Example>

        <Example name="Icon" description="Consistent icon sizing and stroke defaults for Hugeicons." >
          <div className={css({ display: "flex", alignItems: "center", gap: "4", color: "var(--muted-foreground)" })}>
            <Icon icon={Search01Icon} size={16} />
            <Icon icon={Search01Icon} size={20} />
            <Icon icon={Search01Icon} size={24} />
          </div>
        </Example>

        <Example name="Autocomplete" description="Filterable suggestions with text input and popup results." >
          <Autocomplete items={["React", "Next.js", "TypeScript"]}>
            <AutocompleteInput placeholder="Search technologies" />
            <AutocompletePopup>
              <AutocompleteList>
                <AutocompleteItem value="React">React</AutocompleteItem>
                <AutocompleteItem value="Next.js">Next.js</AutocompleteItem>
                <AutocompleteItem value="TypeScript">TypeScript</AutocompleteItem>
              </AutocompleteList>
            </AutocompletePopup>
          </Autocomplete>
        </Example>

        <Example name="Combobox" description="Select one or more values from a searchable collection." >
          <Combobox items={["Design", "Development", "Research"]}>
            <ComboboxInput placeholder="Choose a tag" />
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxItem value="Design">Design</ComboboxItem>
                <ComboboxItem value="Development">Development</ComboboxItem>
                <ComboboxItem value="Research">Research</ComboboxItem>
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
        </Example>

        <Example name="Command" description="Searchable command list for keyboard-first workflows." >
          <div className={css({ width: "100%", maxWidth: "22rem", overflow: "hidden", borderWidth: "1px", borderColor: "var(--border)", borderRadius: "lg" })}>
            <Command>
              <CommandInput placeholder="Search commands..." />
              <CommandList>
                <CommandItem value="add-bookmark">Add bookmark</CommandItem>
                <CommandItem value="new-collection">Create collection</CommandItem>
                <CommandItem value="search-library">Search library</CommandItem>
              </CommandList>
            </Command>
          </div>
        </Example>

        <Example name="Composer" description="Rich-text composer with token-aware input and submit action." >
          <Composer className={css({ width: "100%", maxWidth: "22rem", borderWidth: "1px", borderColor: "var(--border)", borderRadius: "lg", padding: "3" })} onSubmit={() => undefined}>
            <ComposerInput placeholder="Write a note or mention a resource..." className={css({ minHeight: "3rem", fontSize: "sm" })} />
            <ComposerActions className={css({ justifyContent: "flex-end", marginTop: "3" })}>
              <ComposerSubmit aria-label="Submit note"><span aria-hidden="true">↑</span></ComposerSubmit>
            </ComposerActions>
          </Composer>
        </Example>

        <Example name="Toast" description="Transient success feedback rendered in a shared viewport." >
          <ToastDemo />
        </Example>
      </div>
    </section>
  );
}
