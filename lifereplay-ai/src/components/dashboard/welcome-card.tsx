"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { fadeUp } from "@/lib/motion";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function WelcomeCard({ onCreateSpace }: { onCreateSpace?: () => void }) {
  const [greeting, setGreeting] = React.useState("Welcome back");

  React.useEffect(() => {
    setGreeting(getGreeting());
  }, []);
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            {greeting}, Aanya
          </span>
          <Typography.H1 className="text-[30px] sm:text-[34px]">Where should we pick up?</Typography.H1>
          <Typography.Body className="max-w-md text-muted-foreground">
            Six Spaces are active this week. Your Adobe Hackathon Space is closest to done.
          </Typography.Body>
        </div>
        <Button onClick={onCreateSpace} size="lg" className="shrink-0">
          <Plus className="h-4 w-4" />
          New Space
        </Button>
      </div>
    </motion.div>
  );
}
