"use client";

import { useState, type ReactNode } from "react";

import { css } from "../../styled-system/css";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Field, FieldDescription, FieldLabel } from "@/shared/components/ui/field";
import { Fieldset, FieldsetLegend } from "@/shared/components/ui/fieldset";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@/shared/components/ui/frame";
import { Group, GroupSeparator } from "@/shared/components/ui/group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/components/ui/input-group";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/shared/components/ui/number-field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { Radio, RadioGroup } from "@/shared/components/ui/radio-group";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Slider } from "@/shared/components/ui/slider";

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

const codeStyle = css({
  overflowX: "auto",
  padding: "3",
  background: "var(--muted)",
  color: "var(--muted-foreground)",
  fontFamily: "mono",
  fontSize: "xs",
  whiteSpace: "pre",
});

function Example({ name, description, code, children }: {
  name: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className={cardStyle}>
      <div className={previewStyle}>{children}</div>
      <div className={css({ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "3", padding: "4" })}>
        <div>
          <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>{name}</h3>
          <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "xs", lineHeight: "1.6" })}>{description}</p>
        </div>
        <button type="button" onClick={copy} className={css({ flexShrink: "0", borderWidth: "1px", borderColor: "var(--border)", borderRadius: "md", paddingX: "2.5", paddingY: "1", fontSize: "xs", _hover: { background: "var(--muted)" } })}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={codeStyle}><code>{code}</code></pre>
    </article>
  );
}

export function AdvancedExamples() {
  return (
    <section id="composites" className={css({ marginTop: "12", scrollMarginTop: "2rem" })}>
      <div className={css({ marginBottom: "5" })}>
        <h2 className={css({ fontSize: "xl", fontWeight: "semibold", letterSpacing: "-0.03em" })}>Composite components</h2>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "sm" })}>Compound controls built from the shared primitives, with working interactions and copyable examples.</p>
      </div>
      <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", xl: "repeat(2, minmax(0, 1fr))" }, gap: "4" })}>
        <Example name="Accordion" description="Expandable content panels with keyboard navigation." code={'<Accordion defaultValue={["details"]}>\n  <AccordionItem value="details">\n    <AccordionTrigger>Details</AccordionTrigger>\n    <AccordionPanel>Supporting content.</AccordionPanel>\n  </AccordionItem>\n</Accordion>'}>
          <div className={css({ width: "100%", maxWidth: "22rem" })}>
            <Accordion defaultValue={["details"]}>
              <AccordionItem value="details">
                <AccordionTrigger>What is a collection?</AccordionTrigger>
                <AccordionPanel>Collections help organize related bookmarks into focused groups.</AccordionPanel>
              </AccordionItem>
              <AccordionItem value="sync">
                <AccordionTrigger>Can I sync bookmarks?</AccordionTrigger>
                <AccordionPanel>Sync and import workflows can be added as your product grows.</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </Example>

        <Example name="Collapsible" description="A lightweight disclosure for optional or secondary content." code={'<Collapsible defaultOpen>\n  <CollapsibleTrigger>Advanced options</CollapsibleTrigger>\n  <CollapsiblePanel>Additional settings go here.</CollapsiblePanel>\n</Collapsible>'}>
          <Collapsible defaultOpen className={css({ width: "100%", maxWidth: "22rem" })}>
            <CollapsibleTrigger className={css({ width: "100%", borderWidth: "1px", borderColor: "var(--border)", borderRadius: "md", padding: "3", textAlign: "left", fontSize: "sm" })}>Advanced options</CollapsibleTrigger>
            <CollapsiblePanel className={css({ padding: "3", color: "var(--muted-foreground)", fontSize: "sm" })}>Additional settings are available when you need them.</CollapsiblePanel>
          </Collapsible>
        </Example>

        <Example name="Breadcrumb" description="Hierarchical navigation with a current-page marker." code={'<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Bookmarks</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>'}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Library</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Bookmarks</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Example>

        <Example name="Pagination" description="Compact page navigation with active and previous/next states." code={'<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>\n    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href="#" /></PaginationItem>\n  </PaginationContent>\n</Pagination>'}>
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>

        <Example name="Radio group" description="Single-choice selection with accessible labels." code={'<RadioGroup defaultValue="recent">\n  <label><Radio value="recent" /> Recent</label>\n  <label><Radio value="oldest" /> Oldest</label>\n</RadioGroup>'}>
          <RadioGroup defaultValue="recent" className={css({ width: "100%", maxWidth: "18rem" })}>
            <label className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}><Radio value="recent" /> Recently added</label>
            <label className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}><Radio value="oldest" /> Oldest first</label>
            <label className={css({ display: "flex", alignItems: "center", gap: "2", fontSize: "sm" })}><Radio value="alphabetical" /> Alphabetical</label>
          </RadioGroup>
        </Example>

        <Example name="Slider" description="Pointer and keyboard adjustable numeric range." code={'<Slider defaultValue={42} min={0} max={100} getAriaLabel={() => "Volume"} />'}>
          <div className={css({ width: "100%", maxWidth: "20rem" })}>
            <Slider defaultValue={42} min={0} max={100} getAriaLabel={() => "Volume"} />
          </div>
        </Example>

        <Example name="Number field" description="Numeric input with increment and decrement controls." code={'<NumberField defaultValue={3} min={1} max={10}>\n  <NumberFieldGroup>\n    <NumberFieldDecrement />\n    <NumberFieldInput />\n    <NumberFieldIncrement />\n  </NumberFieldGroup>\n</NumberField>'}>
          <NumberField defaultValue={3} min={1} max={10} className={css({ width: "12rem" })}>
            <NumberFieldGroup>
              <NumberFieldDecrement aria-label="Decrease quantity" />
              <NumberFieldInput aria-label="Quantity" />
              <NumberFieldIncrement aria-label="Increase quantity" />
            </NumberFieldGroup>
          </NumberField>
        </Example>

        <Example name="Input group" description="Input with contextual prefix and suffix content." code={'<InputGroup>\n  <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>\n  <InputGroupInput placeholder="example.com" />\n</InputGroup>'}>
          <div className={css({ width: "100%", maxWidth: "22rem" })}>
            <InputGroup>
              <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          </div>
        </Example>

        <Example name="Select" description="Accessible listbox with keyboard navigation and selection." code={'<Select defaultValue="reading">\n  <SelectTrigger><SelectValue placeholder="Choose a collection" /></SelectTrigger>\n  <SelectPopup>\n    <SelectItem value="reading">Reading list</SelectItem>\n    <SelectItem value="inspiration">Inspiration</SelectItem>\n  </SelectPopup>\n</Select>'}>
          <div className={css({ width: "100%", maxWidth: "18rem" })}>
            <Select defaultValue="reading">
              <SelectTrigger><SelectValue placeholder="Choose a collection" /></SelectTrigger>
              <SelectPopup>
                <SelectItem value="reading">Reading list</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
                <SelectItem value="work">Work resources</SelectItem>
              </SelectPopup>
            </Select>
          </div>
        </Example>

        <Example name="Group" description="Join related controls and manage shared borders and focus order." code={'<Group>\n  <Button variant="outline">Back</Button>\n  <Button>Continue</Button>\n</Group>'}>
          <Group>
            <button type="button" className={css({ borderWidth: "1px", borderColor: "var(--input)", borderRadius: "md", paddingX: "3", paddingY: "2", fontSize: "sm" })}>Back</button>
            <GroupSeparator />
            <button type="button" className={css({ borderWidth: "1px", borderColor: "var(--input)", borderRadius: "md", paddingX: "3", paddingY: "2", fontSize: "sm" })}>Continue</button>
          </Group>
        </Example>

        <Example name="Frame" description="Nested panel surface for grouped content and tools." code={'<Frame>\n  <FramePanel>\n    <FrameHeader><FrameTitle>Quick capture</FrameTitle><FrameDescription>Save a resource.</FrameDescription></FrameHeader>\n  </FramePanel>\n</Frame>'}>
          <Frame className={css({ width: "100%", maxWidth: "20rem" })}>
            <FramePanel>
              <FrameHeader>
                <FrameTitle>Quick capture</FrameTitle>
                <FrameDescription>Save a resource to your library.</FrameDescription>
              </FrameHeader>
            </FramePanel>
          </Frame>
        </Example>

        <Example name="Empty state" description="A consistent starting point when a list has no content." code={'<Empty>\n  <EmptyHeader>\n    <EmptyMedia variant="icon">✦</EmptyMedia>\n    <EmptyTitle>No bookmarks yet</EmptyTitle>\n    <EmptyDescription>Save your first resource.</EmptyDescription>\n  </EmptyHeader>\n</Empty>'}>
          <Empty className={css({ paddingY: "4", gap: "2" })}>
            <EmptyHeader>
              <EmptyMedia variant="icon"><span aria-hidden="true">✦</span></EmptyMedia>
              <EmptyTitle>No bookmarks yet</EmptyTitle>
              <EmptyDescription>Save your first useful resource.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Example>

        <Example name="Field & fieldset" description="Group form controls with labels and supporting guidance." code={'<Fieldset>\n  <FieldsetLegend>Profile</FieldsetLegend>\n  <Field><FieldLabel>Name</FieldLabel><Input placeholder="Your name" /><FieldDescription>Shown on your profile.</FieldDescription></Field>\n</Fieldset>'}>
          <Fieldset className={css({ width: "100%", maxWidth: "22rem" })}>
            <FieldsetLegend>Profile details</FieldsetLegend>
            <Field>
              <FieldLabel htmlFor="advanced-name">Display name</FieldLabel>
              <input id="advanced-name" placeholder="Your name" className={css({ width: "100%", height: "2.25rem", borderWidth: "1px", borderColor: "var(--input)", borderRadius: "lg", paddingX: "3", background: "var(--background)", fontSize: "sm" })} />
              <FieldDescription>This name appears on your public profile.</FieldDescription>
            </Field>
          </Fieldset>
        </Example>

        <Example name="Scroll area" description="Constrained content with custom scrollbars and overflow handling." code={'<ScrollArea className="h-40">\n  <div>Scrollable content</div>\n</ScrollArea>'}>
          <ScrollArea className={css({ width: "100%", maxWidth: "18rem", height: "8rem", borderWidth: "1px", borderColor: "var(--border)", borderRadius: "md", padding: "3" })}>
            <div className={css({ display: "flex", flexDirection: "column", gap: "3", fontSize: "sm" })}>
              {["Design systems", "Keyboard shortcuts", "Frontend architecture", "Database indexing", "Product research", "Accessibility"].map((item) => <div key={item} className={css({ borderBottomWidth: "1px", borderColor: "var(--border)", paddingBottom: "2" })}>{item}</div>)}
            </div>
          </ScrollArea>
        </Example>
      </div>
    </section>
  );
}
