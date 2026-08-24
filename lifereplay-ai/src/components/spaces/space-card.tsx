"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Files } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/ui/typography";
import { fadeUp, duration, easeOut } from "@/lib/motion";
import { timeAgo } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Space } from "@/types";

export interface SpaceCardProps {
  space: Space;
  onToggleFavorite?: (id: string) => void;
}

export function SpaceCard({ space, onToggleFavorite }: SpaceCardProps) {
  const Icon = space.icon;

  return (
    <motion.div variants={fadeUp} whileHover="hover" initial="rest" animate="rest" className="group h-full">
      <Link
        href={`/spaces/${space.id}`}
        className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        {/* Cover */}
        <div className={cn("relative h-28 w-full bg-gradient-to-br", space.cover)}>
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
            transition={{ duration: duration.slow, ease: easeOut }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(space.id);
            }}
            aria-label={space.favorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={space.favorite}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Star className={cn("h-3.5 w-3.5", space.favorite && "fill-warning text-warning")} />
          </button>
          <div className="absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-accent shadow-[var(--shadow-sm)]">
            <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-7">
          <div className="flex flex-col gap-1">
            <Typography.H3 className="text-[16px]">{space.name}</Typography.H3>
            <Typography.Small className="line-clamp-2">{space.description}</Typography.Small>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {space.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between">
              <Typography.Caption className="normal-case text-subtle-foreground">Progress</Typography.Caption>
              <Typography.Caption className="normal-case text-subtle-foreground">{space.progress}%</Typography.Caption>
            </div>
            <Progress value={space.progress} />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="flex items-center gap-1.5 text-[12px] text-subtle-foreground">
              <Files className="h-3.5 w-3.5" />
              {space.fileCount} files
            </span>
            <span className="text-[12px] text-subtle-foreground">Updated {timeAgo(space.updatedAt)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SpaceCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <div className="h-28 w-full animate-pulse bg-muted" />
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-7">
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
        <div className="mt-auto h-1.5 w-full animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}
