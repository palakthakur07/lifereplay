"use client";

import * as React from "react";
import { Search, GraduationCap, Rocket, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

const RECENT_SEARCHES = ["midterm review", "pitch deck v4", "resume 2026", "packing list"];

const QUICK_RESULTS = [
  { icon: GraduationCap, label: "Semester 5", sub: "Space" },
  { icon: Rocket, label: "Adobe Hackathon", sub: "Space" },
];

export function GlobalSearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search LifeReplay</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-subtle-foreground" />
          <Input
            autoFocus
            placeholder="Search Spaces, files, notes…"
            className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
          />
          <kbd className="rounded border border-border-strong px-1.5 py-0.5 text-[10px] text-subtle-foreground">
            Esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          <div className="px-2 py-1.5">
            <Typography.Caption className="normal-case text-subtle-foreground">Quick results</Typography.Caption>
          </div>
          {QUICK_RESULTS.map((r) => (
            <button
              key={r.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-left text-[13px] text-foreground hover:bg-secondary"
            >
              <r.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <span className="flex-1 truncate">{r.label}</span>
              <span className="text-[11px] text-subtle-foreground">{r.sub}</span>
            </button>
          ))}

          <div className="mt-2 px-2 py-1.5">
            <Typography.Caption className="normal-case text-subtle-foreground">Recent searches</Typography.Caption>
          </div>
          {RECENT_SEARCHES.map((s) => (
            <button
              key={s}
              type="button"
              className="flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-left text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Clock className="h-3.5 w-3.5 text-subtle-foreground" />
              <span className="flex-1 truncate">{s}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
