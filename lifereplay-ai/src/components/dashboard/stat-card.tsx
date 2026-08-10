"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: { value: string; direction: "up" | "down" };
  className?: string;
}

export function StatCard({ icon: Icon, label, value, trend, className }: StatCardProps) {
  return (
    <motion.div variants={fadeUp}>
      <Card className={cn("p-5", className)}>
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-accent/15 text-accent">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
          {trend ? (
            <span
              className={cn(
                "flex items-center gap-0.5 text-[12px] font-medium",
                trend.direction === "up" ? "text-success" : "text-error"
              )}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </span>
          ) : null}
        </div>
        <Typography.H2 className="mt-4 text-[26px]">{value}</Typography.H2>
        <Typography.Small className="mt-0.5">{label}</Typography.Small>
      </Card>
    </motion.div>
  );
}
