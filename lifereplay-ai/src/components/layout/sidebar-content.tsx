"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, HardDrive } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/ui/typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV_ITEMS, SETTINGS_NAV_ITEM } from "@/constants/nav";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

export interface SidebarContentProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

function NavLink({ item, collapsed, active, onNavigate }: {
  item: { label: string; href: string; icon: React.ElementType; badge?: number };
  collapsed?: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        collapsed && "justify-center px-0",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
      )}
    >
      {active ? (
        <motion.span
          layoutId="sidebar-active-indicator"
          className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent"
          transition={{ duration: 0.2 }}
        />
      ) : null}
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge ? (
        <span className="ml-auto rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  return link;
}

export function SidebarContent({ collapsed = false, onNavigate }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn("flex items-center gap-2.5 px-3 py-4", collapsed && "justify-center px-0")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-accent/15 text-accent">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        </div>
        {!collapsed && (
          <div className="flex min-w-0 flex-col">
            <Typography.Small className="truncate font-display text-[14px] font-medium text-foreground">
              {SITE.shortName}
            </Typography.Small>
            <Typography.Caption className="truncate normal-case text-subtle-foreground">
              Personal Workspace
            </Typography.Caption>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            collapsed={collapsed}
            active={pathname === item.href || pathname.startsWith(item.href + "/")}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* Storage + Settings + User */}
      <div className="flex flex-col gap-3 border-t border-border px-3 py-3">
        {!collapsed ? (
          <div className="flex flex-col gap-1.5 rounded-[var(--radius-sm)] px-1 py-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-subtle-foreground">
                <HardDrive className="h-3 w-3" />
                Storage
              </span>
              <span className="text-[11px] text-subtle-foreground">6.1 / 10 GB</span>
            </div>
            <Progress value={61} />
          </div>
        ) : null}

        <NavLink
          item={SETTINGS_NAV_ITEM}
          collapsed={collapsed}
          active={pathname.startsWith(SETTINGS_NAV_ITEM.href)}
          onNavigate={onNavigate}
        />

        <div className={cn("flex items-center gap-2.5 px-1", collapsed && "justify-center px-0")}>
          <Avatar className="h-7 w-7">
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <Typography.Small className="truncate font-medium text-foreground">Aanya Kapoor</Typography.Small>
              <Typography.Caption className="truncate normal-case text-subtle-foreground">
                aanya@lifereplay.ai
              </Typography.Caption>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
