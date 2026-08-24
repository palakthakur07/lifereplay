# LifeReplay AI — Frontend Foundation & Dashboard

**Phase 1** built the design system and application shell. **Phase 2**
(this update) builds the full dashboard experience and the Spaces system on
top of it: a real app shell with a collapsible sidebar and top bar, a
welcoming Home dashboard, a browsable/searchable Spaces grid, a multi-step
Create Space flow, and a Space detail page. There is still no backend —
everything is realistic mock data held in React state, per the Phase 2
brief.

`/` redirects to `/dashboard`. The Phase 1 component showcase now lives at
`/design-system` (linked from the dashboard header) rather than at the root.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React 19)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)-style components (Radix UI primitives + `class-variance-authority`)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev) icons
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- Self-hosted variable fonts via [Fontsource](https://fontsource.org) (no external font CDN at runtime)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Routes

| Route | What's there |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Home: welcome banner, stats, Continue Working, Quick Actions, Recent Spaces, Recent Activity, Favorites, Today's Summary, Suggested Templates |
| `/spaces` | All Spaces — search, All/Favorites filter, Create Space |
| `/spaces/[spaceId]` | Space detail — cover, progress, and placeholder tabs (Files, Notes, Timeline, Insights, AI Assistant, Tags). Unknown ids render a real 404. |
| `/recent` | Spaces sorted by most recently updated |
| `/favorites` | Pinned Spaces |
| `/timeline` | Cross-Space activity feed (mock data) |
| `/collections` | Placeholder — feature not yet built |
| `/search` | Global search layout preview (UI only, no real results) |
| `/settings` | Profile, appearance (real theme switching), notifications, storage — all UI-only aside from theme |
| `/design-system` | The Phase 1 component/token showcase |

Favoriting and creating a Space update local React state on whichever page
you're on (dashboard, Spaces, Recent, Favorites) — there's no shared store
yet, so state doesn't persist across a full page navigation. That's the
natural seam for wiring up `services/spaces.ts` once a backend exists.

## Design system

**Concept.** LifeReplay AI is a "second brain" organized into Spaces. The
accent color is a warm brass/amber — evoking recall, sepia, and highlighting
— set against an ink-indigo dark surface or a cool paper-white light
surface. The two themes are tuned independently rather than being simple
inversions of each other.

**Typography.** [Fraunces](https://fonts.google.com/specimen/Fraunces) (a
characterful variable serif) carries Display/H1/H2/H3. [Inter](https://fonts.google.com/specimen/Inter)
handles body copy. [JetBrains Mono](https://www.jetbrains.com/lp/mono/) marks
captions and metadata (counts, timestamps). All three ship as local variable
font files — no calls to Google Fonts at build or runtime.

**Color.** Every color is a semantic token (`--background`, `--surface`,
`--accent`, `--success`, `--warning`, `--error`, etc.), defined once in
`src/app/globals.css` for both `:root` (light) and `.dark`, and exposed to
Tailwind via `@theme inline`. Components should never use ad-hoc Tailwind
colors like `bg-orange-500` — only tokens like `bg-accent`.

**Motion.** `src/lib/motion.ts` exports shared Framer Motion variants
(`fade`, `fadeUp`, `slideIn`, `scaleIn`, `staggerContainer`, `pageTransition`)
and hover/tap presets. Reach for these instead of writing bespoke animation
config in every component, so motion stays consistent and easy to tune
globally. `prefers-reduced-motion` is respected globally in `globals.css`.

**Radius & shadow.** Five radius steps (`--radius-xs` → `--radius-xl`) and
three shadow steps (`--shadow-sm/md/lg`) plus a subtle `--shadow-glow` for
accent-colored emphasis.

## Folder structure

```
src/
  app/
    layout.tsx              # Root layout: fonts, metadata, providers
    globals.css              # Design tokens (color, type, radius, motion)
    page.tsx                 # Redirects "/" -> "/dashboard"
    design-system/page.tsx   # Phase 1 component/token showcase

    (app)/                   # Route group sharing the AppShell layout
      layout.tsx              # Wraps children in <AppShell>
      dashboard/page.tsx
      spaces/page.tsx
      spaces/[spaceId]/page.tsx
      recent/page.tsx
      favorites/page.tsx
      timeline/page.tsx
      collections/page.tsx
      search/page.tsx
      settings/page.tsx

  components/
    ui/                     # Design-system primitives (Button, Input, Card, Dialog, Tabs, Sheet, Avatar, Progress, …)
    layout/                  # Sidebar, TopBar, AppShell, Breadcrumbs, Container, PageWrapper, ThemeToggle, GlobalSearchDialog
    dashboard/                # SectionHeader, StatCard, WidgetCard, and the Home page's widgets
    spaces/                   # SpaceCard, TemplateCard — domain components reused across Dashboard/Spaces/Recent/Favorites
    empty-states/             # EmptyState component

  features/                # One folder per product feature.
    spaces/                  # The one feature built out in Phase 2:
      components/             #   CreateSpaceDialog, SpaceDetailView
      data/                    #   mock-spaces.ts, mock-templates.ts (stand in for services/ until there's a backend)
      constants.ts             #   icon/color picker options
    chat/                    # Still empty — see each folder's README
    search/
    timeline/
    tags/
    notes/
    insights/
    collections/

  hooks/                  # Reusable hooks (useMediaQuery, toast helper)
  providers/              # ThemeProvider, SidebarProvider, Providers composition
  lib/                    # utils (cn), motion presets, mock-data.ts (activity feed, timeAgo)
  services/               # Reserved for future API clients (empty for now)
  types/                  # Shared foundation types (Space, SpaceTemplate, ActivityItem, NavItem)
  constants/              # Site-level constants, sidebar nav config
  styles/                 # Reserved for additional stylesheets if needed
```

## Component inventory

| Category | Components |
|---|---|
| Typography | `Typography.Display/H1/H2/H3/BodyLarge/Body/Small/Caption/Lead` |
| Buttons | Primary, Secondary, Outline, Ghost, Destructive, Icon |
| Inputs | Input, SearchInput, Textarea, Select, Checkbox, RadioGroup, Switch, Label |
| Surfaces | Card, Badge, Separator, Avatar, Progress |
| Overlays | Dialog, Sheet, Tooltip, DropdownMenu, Tabs |
| Feedback | Skeleton, Toaster (sonner), EmptyState |
| Shell | Sidebar (+ mobile Sheet drawer), TopBar, Breadcrumbs, AppShell, Container, PageWrapper, ThemeToggle, GlobalSearchDialog |
| Dashboard | SectionHeader, StatCard, WidgetCard, WelcomeCard, QuickActions, ContinueWorking, RecentActivityWidget, FavoritesWidget, SuggestedTemplates, TodaySummaryWidget |
| Spaces | SpaceCard (+ skeleton), TemplateCard, CreateSpaceDialog, SpaceDetailView |

All components are in TypeScript, forward refs where relevant, and use the
`cn()` helper (`clsx` + `tailwind-merge`) for safe class composition.

## Theming

Dark mode is the default. Toggle via the sun/moon button in the top bar, or
the Appearance section in Settings, or programmatically:

```tsx
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
```

## Accessibility notes

- Every interactive element (nav links, buttons, form controls, the Create
  Space flow's icon/color pickers) is reachable by keyboard and shows a
  visible focus ring (`:focus-visible` in `globals.css`).
- Sidebar nav links use `aria-current="page"`; toggles use `aria-pressed`;
  icon-only buttons carry `aria-label`.
- The mobile sidebar is a proper Radix Dialog-based Sheet, so it traps focus
  and closes on Escape.
- `prefers-reduced-motion` is respected globally.

## What's intentionally *not* here

Per the Phase 2 brief: authentication, a real database, AI chat/search, OCR,
embeddings, file upload, APIs, and file storage. Everything you see reading
as "live" (favoriting, creating a Space, filtering, theme switching) is
real frontend interactivity backed by local React state or `next-themes` —
none of it talks to a server. Those integrations are the natural next phase,
wired in at the seams already marked in `services/` and each `features/*`
module.
