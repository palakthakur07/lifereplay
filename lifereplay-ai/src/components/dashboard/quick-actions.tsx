"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, LayoutTemplate, MessagesSquare, UploadCloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  description: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function QuickActions({ onCreateSpace }: { onCreateSpace?: () => void }) {
  const actions: QuickAction[] = [
    { icon: Plus, label: "New Space", description: "Start something new", onClick: onCreateSpace },
    { icon: LayoutTemplate, label: "Browse templates", description: "Student, Career & more", href: "/spaces" },
    { icon: MessagesSquare, label: "Ask AI", description: "Coming in a future phase", disabled: true },
    { icon: UploadCloud, label: "Upload files", description: "Coming in a future phase", disabled: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map((action) => {
        const inner = (
          <>
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-accent/15 text-accent">
              <action.icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Typography.Small className="font-medium text-foreground">{action.label}</Typography.Small>
              <Typography.Small className="text-[12px]">{action.description}</Typography.Small>
            </div>
          </>
        );

        const className = cn(
          "flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-left transition-colors",
          action.disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-border-strong hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        );

        if (action.disabled) {
          return (
            <div key={action.label} className={className} aria-disabled="true">
              {inner}
            </div>
          );
        }

        if (action.href) {
          return (
            <motion.div key={action.label} variants={fadeUp}>
              <Link href={action.href} className={className}>
                {inner}
              </Link>
            </motion.div>
          );
        }

        return (
          <motion.button key={action.label} type="button" variants={fadeUp} onClick={action.onClick} className={className}>
            {inner}
          </motion.button>
        );
      })}
    </div>
  );
}
