import type { LucideIcon } from "lucide-react";

/**
 * Foundation types shared across the app shell.
 *
 * Feature modules (chat, search, timeline, tags, notes, insights,
 * collections) will define their own types under `src/features/*` once
 * those features are built. This file holds what the shell and the Spaces
 * experience need: the concept of a Space, plus a few shared UI primitives.
 */

export type SemanticTone = "accent" | "success" | "warning" | "error" | "muted";

export interface Space {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Semantic accent used for this Space's icon tint, progress bar, and highlights. */
  color: SemanticTone;
  /** Tailwind gradient classes for the card cover — kept as data so cards stay data-driven. */
  cover: string;
  tags: string[];
  fileCount: number;
  progress: number;
  favorite: boolean;
  updatedAt: string;
}

export interface SpaceTemplate {
  id: string;
  name: string;
  emoji: string;
  icon: LucideIcon;
  color: SemanticTone;
  cover: string;
  description: string;
  suggestedCategories: string[];
}

export interface ActivityItem {
  id: string;
  spaceId: string;
  spaceName: string;
  spaceIcon: LucideIcon;
  action: string;
  detail: string;
  timestamp: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export type ThemeMode = "light" | "dark" | "system";

