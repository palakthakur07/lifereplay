"use client";

import * as React from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Single composition root for app-wide providers. Add new global providers
 * (query client, auth, etc.) here in Phase 2+ rather than in layout.tsx.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
