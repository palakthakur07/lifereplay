"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { SpaceTemplate } from "@/types";

export interface TemplateCardProps {
  template: SpaceTemplate;
  selected?: boolean;
  onSelect?: (template: SpaceTemplate) => void;
}

export function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  const Icon = template.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(template)}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[var(--radius-md)] border text-left transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        selected ? "border-accent" : "border-border hover:border-border-strong"
      )}
    >
      <div className={cn("relative h-16 w-full bg-gradient-to-br", template.cover)}>
        <span className="absolute left-3 top-3 text-lg leading-none">{template.emoji}</span>
        {selected ? (
          <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 bg-surface p-3">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
          <Typography.Small className="font-medium text-foreground">{template.name}</Typography.Small>
        </div>
        <Typography.Small className="line-clamp-2 text-[12px]">{template.description}</Typography.Small>
      </div>
    </motion.button>
  );
}
