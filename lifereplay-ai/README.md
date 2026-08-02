# LifeReplay AI — Frontend Foundation

This is **Phase 1** of LifeReplay AI: the design system and application
shell that every future feature (Spaces, Chat, Search, Timeline, Tags,
Notes, Insights, Collections) will be built on top of. There is no backend,
no auth, and no AI functionality yet — this phase is purely the frontend
foundation.

The one page in the app, `/`, is a **design foundation preview**: it exists
to demonstrate every token and component working together, not as a
landing page or product screen. Replace it once real features land.

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
  app/                    # Next.js App Router
    layout.tsx            # Root layout: fonts, metadata, providers
    globals.css           # Design tokens (color, type, radius, motion)
    page.tsx              # Design foundation preview (temporary)

  components/
    ui/                   # Design-system primitives (Button, Input, Card, Dialog, …)
    layout/                # Container, PageWrapper, ThemeToggle
    empty-states/          # EmptyState component

  features/                # One folder per product feature. Empty today —
    spaces/                 # each contains a README describing what belongs
    chat/                   # there once the feature is built. Nothing here
    search/                 # should be implemented until its own phase.
    timeline/
    tags/
    notes/
    insights/
    collections/

  hooks/                  # Reusable hooks (useMediaQuery, toast helper)
  providers/              # ThemeProvider + the app-wide Providers composition
  lib/                    # utils (cn), motion presets
  services/               # Reserved for future API clients (empty for now)
  types/                  # Shared foundation types (Space, ThemeMode)
  constants/              # Site-level constants
  styles/                 # Reserved for additional stylesheets if needed
```

## Component inventory (Phase 1)

| Category | Components |
|---|---|
| Typography | `Typography.Display/H1/H2/H3/BodyLarge/Body/Small/Caption/Lead` |
| Buttons | Primary, Secondary, Outline, Ghost, Destructive, Icon |
| Inputs | Input, SearchInput, Textarea, Select, Checkbox, RadioGroup, Switch, Label |
| Surfaces | Card, Badge, Separator |
| Overlays | Dialog, Tooltip, DropdownMenu |
| Feedback | Skeleton, Toaster (sonner), EmptyState |
| Layout | Container, PageWrapper, ThemeToggle |

All components are in TypeScript, forward refs where relevant, and use the
`cn()` helper (`clsx` + `tailwind-merge`) for safe class composition.

## Theming

Dark mode is the default. Toggle via the sun/moon button in the preview
page's header, or programmatically:

```tsx
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
```

## What's intentionally *not* here

Per the Phase 1 brief, this foundation does not include: a landing page,
authentication, a dashboard, a backend, AI features, a database, or APIs.
Those belong to later phases and should be built as their own
`features/*` modules using the primitives in `components/ui`.
