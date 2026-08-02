"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
  className?: string;
}

/**
 * An empty state is an invitation to act, not an apology. Keep copy plain
 * and specific: say what's missing and what the next step is.
 */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-border px-6 py-16 text-center",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography.H3 className="text-[17px]">{title}</Typography.H3>
        {description ? (
          <Typography.Small className="mx-auto max-w-sm">{description}</Typography.Small>
        ) : null}
      </div>
      {action ? (
        <Button variant="secondary" size="sm" onClick={action.onClick} className="mt-1">
          {action.label}
        </Button>
      ) : null}
    </motion.div>
  );
}
