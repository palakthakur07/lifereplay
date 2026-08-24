"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/layout/sidebar-content";
import { useSidebar } from "@/providers/sidebar-provider";
import { duration, easeOut } from "@/lib/motion";

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 248 }}
      transition={{ duration: duration.slow, ease: easeOut }}
      className="relative hidden shrink-0 border-r border-border bg-surface md:block"
    >
      <div className="sticky top-0 h-svh">
        <SidebarContent collapsed={collapsed} />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3.5 top-16 h-7 w-7 rounded-full bg-surface shadow-[var(--shadow-sm)]"
        >
          {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </motion.aside>
  );
}
