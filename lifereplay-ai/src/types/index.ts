/**
 * Foundation types shared across the app shell.
 *
 * Feature modules (chat, search, timeline, tags, notes, insights,
 * collections) will define their own types under `src/features/*` once
 * those features are built. This file only holds what the shell itself
 * needs to render: the concept of a Space.
 */

export type IconName = string;

export interface Space {
  id: string;
  name: string;
  description?: string;
  icon: IconName;
  /** Semantic accent used for this Space's icon tint and highlights. */
  color: "accent" | "success" | "warning" | "error" | "muted";
  itemCount: number;
  updatedAt: string;
}

export type ThemeMode = "light" | "dark" | "system";
