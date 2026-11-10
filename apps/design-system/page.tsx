"use client";

import { useState, type ReactNode } from "react";

import { css } from "../../styled-system/css";
import { AdvancedExamples } from "./advanced-examples";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import {
  Button,
} from "@/shared/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Kbd, KbdGroup } from "@/shared/components/ui/kbd";
import { Label } from "@/shared/components/ui/label";
import {
  Meter,
  MeterLabel,
} from "@/shared/components/ui/meter";
import { Progress, ProgressLabel } from "@/shared/components/ui/progress";
import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Spinner } from "@/shared/components/ui/spinner";
import { Switch } from "@/shared/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/shared/components/ui/tabs";
import { Textarea } from "@/shared/components/ui/textarea";
import { Toggle } from "@/shared/components/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";

const pageStyle = css({
  minHeight: "100vh",
  background: "var(--background)",
  color: "var(--foreground)",
});

const shellStyle = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", lg: "15rem minmax(0, 1fr)" },
  maxWidth: "90rem",
  marginX: "auto",
  minHeight: "100vh",
});

const sidebarStyle = css({
  display: { base: "none", lg: "flex" },
  flexDirection: "column",
  gap: "6",
  borderRightWidth: "1px",
  borderColor: "var(--border)",
  padding: "6",
  position: "sticky",
  top: "0",
  height: "100vh",
});

const mainStyle = css({
  minWidth: "0",
  padding: { base: "5", md: "8", xl: "10" },
});

const sectionStyle = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", xl: "repeat(2, minmax(0, 1fr))" },
  gap: "4",
});

const previewStyle = css({
  display: "flex",
  minHeight: "8rem",
  alignItems: "center",
  justifyContent: "center",
  padding: "6",
  background: "var(--background)",
  borderBottomWidth: "1px",
  borderColor: "var(--border)",
  borderTopLeftRadius: "inherit",
  borderTopRightRadius: "inherit",
});

const cardStyle = css({
  overflow: "hidden",
  borderWidth: "1px",
  borderColor: "var(--border)",
  borderRadius: "xl",
  background: "var(--card)",
  minWidth: "0",
});

const codeStyle = css({
  overflowX: "auto",
  padding: "4",
  background: "var(--muted)",
  color: "var(--muted-foreground)",
  fontFamily: "mono",
  fontSize: "xs",
  lineHeight: "1.7",
  whiteSpace: "pre",
});

const navLinkStyle = css({
  display: "block",
  paddingY: "1.5",
  color: "var(--muted-foreground)",
  fontSize: "sm",
  textDecoration: "none",
  transition: "color 120ms",
  _hover: { color: "var(--foreground)" },
});

type ExampleProps = {
  name: string;
  description: string;
  code: string;
  children: ReactNode;
};

function Example({ name, description, code, children }: ExampleProps) {
  const [copied, setCopied] = useState(false);

  async function copyExample() {
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
      <div className={css({ padding: "4" })}>
        <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3" })}>
          <h3 className={css({ fontSize: "sm", fontWeight: "semibold" })}>{name}</h3>
          <Button size="xs" variant="ghost" onClick={copyExample}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "xs", lineHeight: "1.6" })}>
          {description}
        </p>
      </div>
      <pre className={codeStyle}><code>{code}</code></pre>
    </article>
  );
}

function Section({ id, title, description, children }: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={css({ scrollMarginTop: "2rem", marginTop: "12" })}>
      <div className={css({ marginBottom: "5" })}>
        <h2 className={css({ fontSize: "xl", fontWeight: "semibold", letterSpacing: "-0.03em" })}>{title}</h2>
        <p className={css({ marginTop: "1", color: "var(--muted-foreground)", fontSize: "sm" })}>{description}</p>
      </div>
      <div className={sectionStyle}>{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <div className={pageStyle}>
      <div className={shellStyle}>
        <aside className={sidebarStyle}>
          <a href="#top" className={css({ color: "var(--foreground)", fontWeight: "semibold", fontSize: "sm", textDecoration: "none" })}>
            <span className={css({ color: "var(--muted-foreground)", fontWeight: "normal" })}>UI</span> / Design System
          </a>
          <div>
            <p className={css({ color: "var(--muted-foreground)", fontSize: "xs", fontWeight: "semibold", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2" })}>Foundations</p>
            <a className={navLinkStyle} href="#actions">Actions</a>
            <a className={navLinkStyle} href="#forms">Forms</a>
            <a className={navLinkStyle} href="#feedback">Feedback</a>
            <a className={navLinkStyle} href="#layout">Layout</a>
            <a className={navLinkStyle} href="#navigation">Navigation</a>
          </div>
          <div className={css({ marginTop: "auto", display: "flex", flexDirection: "column", gap: "2" })}>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {dark ? "Use light theme" : "Use dark theme"}
            </Button>
            <p className={css({ color: "var(--muted-foreground)", fontSize: "xs" })}>Panda CSS · Shared UI</p>
          </div>
        </aside>

        <main id="top" className={mainStyle}>
          <header className={css({ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "4", paddingBottom: "8", borderBottomWidth: "1px", borderColor: "var(--border)" })}>
            <div>
              <p className={css({ color: "var(--muted-foreground)", fontSize: "xs", fontWeight: "medium", letterSpacing: "0.08em", textTransform: "uppercase" })}>Component library</p>
              <h1 className={css({ marginTop: "2", fontSize: { base: "2xl", md: "3xl" }, fontWeight: "semibold", letterSpacing: "-0.045em" })}>Design system</h1>
              <p className={css({ marginTop: "2", maxWidth: "42rem", color: "var(--muted-foreground)", fontSize: "sm", lineHeight: "1.7" })}>
                A living reference for the shared UI layer. Explore real component previews, variants, states, and copyable implementation examples.
              </p>
            </div>
            <Button className={css({ flexShrink: "0" })} variant="outline" size="sm" onClick={toggleTheme}>
              {dark ? "Light" : "Dark"}
            </Button>
          </header>

          <div className={css({ display: "flex", flexWrap: "wrap", gap: "2", marginTop: "5" })}>
            <Badge variant="secondary">Panda CSS</Badge>
            <Badge variant="outline">Base UI</Badge>
            <Badge variant="success">Light + dark</Badge>
            <Badge variant="info">Live components</Badge>
          </div>

          <Section id="actions" title="Actions" description="Buttons, labels, toggles, and compact keyboard affordances.">
            <Example name="Button" description="Primary, secondary, outline, ghost, destructive, and size variants." code={'<Button variant="default">Save changes</Button>\n<Button variant="outline">Cancel</Button>\n<Button size="sm">Small</Button>'}>
              <div className={css({ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2" })}>
                <Button>Save changes</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
            </Example>
            <Example name="Badge" description="Compact status and metadata labels with semantic variants." code={'<Badge>Default</Badge>\n<Badge variant="success">Published</Badge>\n<Badge variant="warning">Pending</Badge>'}>
              <div className={css({ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2" })}>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Published</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="destructive">Failed</Badge>
              </div>
            </Example>
            <Example name="Toggle" description="A single pressed/unpressed control with outline and default treatments." code={'<Toggle aria-label="Pin bookmark">Pin</Toggle>\n<Toggle variant="outline">Favorite</Toggle>'}>
              <div className={css({ display: "flex", gap: "2" })}>
                <Toggle aria-label="Pin bookmark">Pin</Toggle>
                <Toggle variant="outline">Favorite</Toggle>
              </div>
            </Example>
            <Example name="Toggle group" description="Related mutually exclusive controls with shared sizing and variants." code={'<ToggleGroup defaultValue="left" aria-label="Text alignment">\n  <ToggleGroupItem value="left">Left</ToggleGroupItem>\n  <ToggleGroupItem value="center">Center</ToggleGroupItem>\n  <ToggleGroupItem value="right">Right</ToggleGroupItem>\n</ToggleGroup>'}>
              <ToggleGroup defaultValue="left" aria-label="Text alignment">
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
              </ToggleGroup>
            </Example>
            <Example name="Keyboard" description="Inline keycaps and grouped shortcut hints." code={'<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>'}>
              <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                <span className={css({ color: "var(--muted-foreground)", fontSize: "sm" })}>Open command menu</span>
                <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
              </div>
            </Example>
          </Section>

          <Section id="forms" title="Forms" description="Input primitives and accessible form controls.">
            <Example name="Input" description="Text, search, and other native input types with consistent field styling." code={'<Label htmlFor="bookmark-title">Title</Label>\n<Input id="bookmark-title" placeholder="A useful resource" />'}>
              <div className={css({ display: "flex", width: "100%", maxWidth: "20rem", flexDirection: "column", gap: "2" })}>
                <Label htmlFor="preview-title">Bookmark title</Label>
                <Input id="preview-title" placeholder="A useful resource" />
              </div>
            </Example>
            <Example name="Textarea" description="Multiline input with content sizing and invalid/disabled states." code={'<Textarea placeholder="Add a note..." />'}>
              <div className={css({ width: "100%", maxWidth: "20rem" })}>
                <Textarea placeholder="Add a note about this bookmark..." />
              </div>
            </Example>
            <Example name="Checkbox" description="Binary and indeterminate selection control." code={'<Checkbox defaultChecked aria-label="Include archived bookmarks" />'}>
              <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                <Checkbox defaultChecked aria-label="Include archived bookmarks" />
                <span className={css({ fontSize: "sm" })}>Include archived bookmarks</span>
              </div>
            </Example>
            <Example name="Switch" description="Compact on/off setting with keyboard and touch support." code={'<Switch defaultChecked aria-label="Enable notifications" />'}>
              <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                <Switch defaultChecked aria-label="Enable notifications" />
                <span className={css({ fontSize: "sm" })}>Enable notifications</span>
              </div>
            </Example>
          </Section>

          <Section id="feedback" title="Feedback" description="Status, progress, loading, and empty-state patterns.">
            <Example name="Alert" description="Semantic inline feedback with title and supporting description." code={'<Alert variant="success">\n  <AlertTitle>Saved</AlertTitle>\n  <AlertDescription>Your bookmark is ready.</AlertDescription>\n</Alert>'}>
              <div className={css({ width: "100%", maxWidth: "24rem" })}>
                <Alert variant="success">
                  <AlertTitle>Bookmark saved</AlertTitle>
                  <AlertDescription>Your resource is now in the collection.</AlertDescription>
                </Alert>
              </div>
            </Example>
            <Example name="Progress" description="Determinate progress with a semantic label." code={'<Progress value={68}><ProgressLabel>Importing bookmarks</ProgressLabel></Progress>'}>
              <div className={css({ width: "100%", maxWidth: "22rem" })}>
                <Progress value={68}>
                  <ProgressLabel>Importing bookmarks · 68%</ProgressLabel>
                </Progress>
              </div>
            </Example>
            <Example name="Meter" description="A bounded measurement such as storage or quota usage." code={'<Meter value={72} min={0} max={100}><MeterLabel>Storage used · 72%</MeterLabel></Meter>'}>
              <div className={css({ width: "100%", maxWidth: "22rem" })}>
                <Meter value={72} min={0} max={100}>
                  <MeterLabel>Storage used · 72%</MeterLabel>
                </Meter>
              </div>
            </Example>
            <Example name="Spinner & skeleton" description="Loading indicators for immediate and content-shaped feedback." code={'<Spinner />\n<Skeleton className="h-4 w-40" />'}>
              <div className={css({ display: "flex", alignItems: "center", gap: "5" })}>
                <Spinner />
                <div className={css({ width: "10rem", display: "flex", flexDirection: "column", gap: "2" })}>
                  <Skeleton className={css({ height: "0.75rem", width: "100%" })} />
                  <Skeleton className={css({ height: "0.75rem", width: "68%" })} />
                </div>
              </div>
            </Example>
          </Section>

          <Section id="layout" title="Layout" description="Surfaces, dividers, data display, and identity elements.">
            <Example name="Card" description="Composable surface with header, body, and footer regions." code={'<Card>\n  <CardHeader><CardTitle>Reading list</CardTitle><CardDescription>12 saved resources</CardDescription></CardHeader>\n  <CardPanel>Recently added bookmarks</CardPanel>\n  <CardFooter><Button size="sm">View collection</Button></CardFooter>\n</Card>'}>
              <Card className={css({ width: "100%", maxWidth: "20rem" })}>
                <CardHeader>
                  <CardTitle>Reading list</CardTitle>
                  <CardDescription>12 saved resources</CardDescription>
                </CardHeader>
                <CardPanel className={css({ color: "var(--muted-foreground)", fontSize: "sm" })}>Recently added bookmarks</CardPanel>
                <CardFooter>
                  <Button size="sm">View collection</Button>
                </CardFooter>
              </Card>
            </Example>
            <Example name="Avatar" description="Initials fallback for users without a profile image." code={'<Avatar><AvatarFallback>CM</AvatarFallback></Avatar>'}>
              <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
                <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
                <div>
                  <p className={css({ fontSize: "sm", fontWeight: "medium" })}>CodeWithMangesh</p>
                  <p className={css({ color: "var(--muted-foreground)", fontSize: "xs" })}>Personal workspace</p>
                </div>
              </div>
            </Example>
            <Example name="Separator" description="Visual separation for related groups and content regions." code={'<Separator />\n<Separator orientation="vertical" />'}>
              <div className={css({ display: "flex", width: "100%", maxWidth: "18rem", flexDirection: "column", gap: "3" })}>
                <span className={css({ fontSize: "sm" })}>General</span>
                <Separator />
                <span className={css({ fontSize: "sm" })}>Appearance</span>
              </div>
            </Example>
            <Example name="Table" description="Structured rows and columns with semantic table elements." code={'<Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>React docs</TableCell><TableCell>Guide</TableCell></TableRow></TableBody></Table>'}>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Resource</TableHead><TableHead>Type</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>React docs</TableCell><TableCell>Guide</TableCell></TableRow>
                  <TableRow><TableCell>TypeScript</TableCell><TableCell>Reference</TableCell></TableRow>
                </TableBody>
              </Table>
            </Example>
          </Section>

          <Section id="navigation" title="Navigation" description="Tabbed views and contextual navigation patterns.">
            <Example name="Tabs" description="Switch between related panels with an animated active indicator." code={'<Tabs defaultValue="all"><TabsList><TabsTab value="all">All</TabsTab><TabsTab value="favorites">Favorites</TabsTab></TabsList><TabsPanel value="all">All bookmarks</TabsPanel><TabsPanel value="favorites">Favorite bookmarks</TabsPanel></Tabs>'}>
              <Tabs defaultValue="all" className={css({ width: "100%", maxWidth: "20rem" })}>
                <TabsList>
                  <TabsTab value="all">All</TabsTab>
                  <TabsTab value="favorites">Favorites</TabsTab>
                  <TabsTab value="recent">Recent</TabsTab>
                </TabsList>
                <TabsPanel value="all" className={css({ paddingTop: "3", fontSize: "sm" })}>All bookmarks in your workspace.</TabsPanel>
                <TabsPanel value="favorites" className={css({ paddingTop: "3", fontSize: "sm" })}>Your favorite resources.</TabsPanel>
                <TabsPanel value="recent" className={css({ paddingTop: "3", fontSize: "sm" })}>Recently saved resources.</TabsPanel>
              </Tabs>
            </Example>
          </Section>

          <AdvancedExamples />

          <footer className={css({ marginTop: "14", paddingTop: "5", borderTopWidth: "1px", borderColor: "var(--border)", color: "var(--muted-foreground)", fontSize: "xs" })}>
            Shared UI components · Panda CSS migration · Preview examples are interactive where appropriate.
          </footer>
        </main>
      </div>
    </div>
  );
}
