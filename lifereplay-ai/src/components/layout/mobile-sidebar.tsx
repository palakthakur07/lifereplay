"use client";

import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/layout/sidebar-content";
import { useSidebar } from "@/providers/sidebar-provider";

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent side="left" className="p-0">
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
