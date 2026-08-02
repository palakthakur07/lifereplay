"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FolderOpen,
  ArrowUpRight,
  Plane,
  GraduationCap,
  Briefcase,
  Rocket,
} from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/search-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/empty-states/empty-state";
import { toast } from "@/hooks/use-toast";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";
import { SITE } from "@/constants/site";

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-14 sm:py-16"
    >
      <div className="mb-8 flex flex-col gap-2">
        <Typography.Caption className="text-accent">{eyebrow}</Typography.Caption>
        <Typography.H2>{title}</Typography.H2>
        {description ? (
          <Typography.Body className="max-w-xl text-muted-foreground">{description}</Typography.Body>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}

const spaces = [
  { name: "Study", icon: GraduationCap, count: 128, tone: "accent" as const },
  { name: "Career", icon: Briefcase, count: 64, tone: "success" as const },
  { name: "Travel", icon: Plane, count: 37, tone: "warning" as const },
  { name: "Startup", icon: Rocket, count: 9, tone: "error" as const },
];

export default function Home() {
  return (
    <PageWrapper>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <Container size="lg" className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-xs)] bg-accent/15 text-accent">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
            <Typography.Small className="font-display text-[15px] font-medium text-foreground">
              {SITE.name}
            </Typography.Small>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Phase 1 · Foundation</Badge>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <Container size="lg">
        {/* Hero */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 py-16 sm:py-24"
        >
          <motion.div variants={fadeUp}>
            <Typography.Caption className="text-accent">Design system preview</Typography.Caption>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Typography.Display className="max-w-3xl">
              A calm foundation for recalling everything that matters.
            </Typography.Display>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Typography.Lead className="max-w-xl">{SITE.description}</Typography.Lead>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg">
              Explore components
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg">
              View source
            </Button>
          </motion.div>
        </motion.div>

        <Separator />

        {/* Typography */}
        <Section
          eyebrow="Typography"
          title="A quiet serif for structure, a clean grotesk for reading"
          description="Fraunces carries the display weight; Inter handles body copy; JetBrains Mono marks metadata like counts and timestamps."
        >
          <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8">
            <Typography.Display>Display 72</Typography.Display>
            <Typography.H1>Heading One</Typography.H1>
            <Typography.H2>Heading Two</Typography.H2>
            <Typography.H3>Heading Three</Typography.H3>
            <Typography.BodyLarge>
              Body Large — used for intros and lead paragraphs that need a touch more presence.
            </Typography.BodyLarge>
            <Typography.Body>
              Body — the default reading size across cards, forms, and long-form content.
            </Typography.Body>
            <Typography.Small>Small text — secondary detail and supporting copy.</Typography.Small>
            <Typography.Caption>Caption · Metadata · 12 items</Typography.Caption>
          </div>
        </Section>

        <Separator />

        {/* Colors */}
        <Section
          eyebrow="Color"
          title="Semantic tokens, not one-off hex values"
          description="Every color used in the app resolves to a named token, so retheming never means hunting through components."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "Background", cls: "bg-background border border-border" },
              { name: "Surface", cls: "bg-surface border border-border" },
              { name: "Primary", cls: "bg-primary" },
              { name: "Accent", cls: "bg-accent" },
              { name: "Muted", cls: "bg-muted" },
              { name: "Success", cls: "bg-success" },
              { name: "Warning", cls: "bg-warning" },
              { name: "Error", cls: "bg-error" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div className={`h-16 rounded-[var(--radius-md)] ${c.cls}`} />
                <Typography.Caption className="normal-case text-muted-foreground">{c.name}</Typography.Caption>
              </div>
            ))}
          </div>
        </Section>

        <Separator />

        {/* Buttons */}
        <Section eyebrow="Actions" title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="icon" size="icon" aria-label="Sparkles">
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Section>

        <Separator />

        {/* Inputs */}
        <Section eyebrow="Forms" title="Inputs">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Space name</Label>
                <Input id="name" placeholder="e.g. Startup" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="search">Search</Label>
                <SearchInput id="search" placeholder="Search everything…" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add a description…" rows={3} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="type">Space type</Label>
                <Select defaultValue="personal">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Choose a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <Checkbox id="remember" defaultChecked />
                <Label htmlFor="remember">Pin to sidebar</Label>
              </div>
              <div className="flex flex-col gap-2.5">
                <Label>Default view</Label>
                <RadioGroup defaultValue="grid" className="gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="grid" id="grid" />
                    <Label htmlFor="grid" className="font-normal">Grid</Label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="list" id="list" />
                    <Label htmlFor="list" className="font-normal">List</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-border p-3.5">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="notify" className="font-normal">Weekly recap</Label>
                  <Typography.Small>Summarize new activity every Monday.</Typography.Small>
                </div>
                <Switch id="notify" defaultChecked />
              </div>
            </div>
          </div>
        </Section>

        <Separator />

        {/* Cards / Spaces preview */}
        <Section
          eyebrow="Composition"
          title="Spaces, composed from the same primitives"
          description="A preview of how Card, Badge, and motion presets combine — the pattern every real feature will reuse."
        >
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {spaces.map((space) => (
              <motion.div key={space.name} variants={fadeUp} {...hoverLift}>
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-[var(--shadow-md)]">
                  <CardHeader>
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-accent/15 text-accent">
                      <space.icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <CardTitle>{space.name}</CardTitle>
                    <CardDescription>Updated 2 days ago</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Badge variant={space.tone}>{space.count} items</Badge>
                    <ArrowUpRight className="h-4 w-4 text-subtle-foreground" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Separator />

        {/* Overlays */}
        <Section eyebrow="Overlays" title="Dialogs, tooltips, dropdowns">
          <div className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Space</DialogTitle>
                  <DialogDescription>
                    Give this area of your life a name. You can change it later.
                  </DialogDescription>
                </DialogHeader>
                <Input placeholder="e.g. Health" />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button>Create Space</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>A tooltip, set in the same token system</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Space actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-error focus:text-error">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={() =>
                toast("Space created", {
                  description: "\"Health\" is ready in your sidebar.",
                })
              }
            >
              Trigger toast
            </Button>
          </div>
        </Section>

        <Separator />

        {/* Skeletons + Empty states */}
        <Section eyebrow="States" title="Loading and empty states">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Typography.Small className="font-medium text-foreground">Skeleton loader</Typography.Small>
              <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-[var(--radius-sm)]" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Typography.Small className="font-medium text-foreground">Empty state</Typography.Small>
              <EmptyState
                icon={FolderOpen}
                title="No Spaces yet"
                description="Create your first Space to start organizing files, notes, and conversations."
                action={{ label: "Create a Space" }}
              />
            </div>
          </div>
        </Section>
      </Container>

      <footer className="border-t border-border py-10">
        <Container size="lg" className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Typography.Caption className="text-subtle-foreground">
            {SITE.name} · Frontend foundation · Phase 1
          </Typography.Caption>
          <Typography.Caption className="text-subtle-foreground">
            Built with Next.js, Tailwind, shadcn/ui &amp; Framer Motion
          </Typography.Caption>
        </Container>
      </footer>
    </PageWrapper>
  );
}
