"use client";

import * as React from "react";

interface SidebarContextValue {
  /** Desktop: whether the rail is collapsed to icon-only width. */
  collapsed: boolean;
  toggleCollapsed: () => void;
  /** Mobile: whether the off-canvas drawer is open. */
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      collapsed,
      toggleCollapsed: () => setCollapsed((c) => !c),
      mobileOpen,
      setMobileOpen,
    }),
    [collapsed, mobileOpen]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
