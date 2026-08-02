"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrap page-level content so every future route enters the same way:
 * a quiet fade + rise, respecting reduced-motion via the shared presets.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn("flex min-h-svh w-full flex-col", className)}
    >
      {children}
    </motion.main>
  );
}
