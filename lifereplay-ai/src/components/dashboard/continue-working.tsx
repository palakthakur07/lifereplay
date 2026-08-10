"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/ui/typography";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";
import { MOCK_SPACES } from "@/features/spaces/data/mock-spaces";

export function ContinueWorking() {
  const spaces = [...MOCK_SPACES].sort((a, b) => b.progress - a.progress).slice(0, 3);

  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-3 sm:grid-cols-3"
    >
      {spaces.map((space) => {
        const Icon = space.icon;
        return (
          <motion.div key={space.id} variants={fadeUp} {...hoverLift}>
            <Link
              href={`/spaces/${space.id}`}
              className="flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-4 transition-shadow hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-accent/15 text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-subtle-foreground" />
              </div>
              <Typography.Small className="font-medium text-foreground">{space.name}</Typography.Small>
              <div className="mt-auto flex flex-col gap-1.5">
                <Progress value={space.progress} />
                <Typography.Caption className="normal-case text-subtle-foreground">{space.progress}% complete</Typography.Caption>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
