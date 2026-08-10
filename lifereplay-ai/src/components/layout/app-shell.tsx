"use client";

import * as React from "react";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { TopBar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <Sidebar />
        <MobileSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
