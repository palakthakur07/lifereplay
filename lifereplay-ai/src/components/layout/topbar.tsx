"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Bell, LogOut, Settings, UserRound, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { GlobalSearchDialog } from "@/components/layout/global-search-dialog";
import { useSidebar } from "@/providers/sidebar-provider";
import { NAV_ITEMS, SETTINGS_NAV_ITEM } from "@/constants/nav";
import { getSpaceById } from "@/features/spaces/data/mock-spaces";

const NOTIFICATIONS = [
  { id: 1, title: "3 new files in Adobe Hackathon", time: "2h ago" },
  { id: 2, title: "Weekly recap is ready", time: "1d ago" },
  { id: 3, title: "Semester 5 progress hit 60%", time: "2d ago" },
];

function useBreadcrumbs() {
  const pathname = usePathname();

  return React.useMemo(() => {
    if (pathname === "/dashboard") return [{ label: "Home" }];

    const segments = pathname.split("/").filter(Boolean);
    const top = segments[0];

    const navMatch = [...NAV_ITEMS, SETTINGS_NAV_ITEM].find((item) => item.href === `/${top}`);
    if (!navMatch) return [{ label: "Home", href: "/dashboard" }];

    if (top === "spaces" && segments[1]) {
      const space = getSpaceById(segments[1]);
      return [
        { label: "Spaces", href: "/spaces" },
        { label: space?.name ?? "Space" },
      ];
    }

    return [{ label: navMatch.label }];
  }, [pathname]);
}

export function TopBar() {
  const { setMobileOpen } = useSidebar();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const breadcrumbs = useBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="icon"
        size="icon"
        className="md:hidden"
        aria-label="Open navigation"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-4.5 w-4.5" />
      </Button>

      <Breadcrumbs items={breadcrumbs} className="hidden sm:flex" />

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden w-56 items-center sm:flex lg:w-72"
          aria-label="Open search"
        >
          <SearchInput placeholder="Search LifeReplay…" readOnly className="cursor-pointer" />
        </button>
        <Button
          variant="icon"
          size="icon"
          className="sm:hidden"
          aria-label="Open search"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="flex items-center justify-between normal-case">
              <span>Notifications</span>
              <Badge variant="accent">{NOTIFICATIONS.length} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NOTIFICATIONS.map((n) => (
              <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 py-2">
                <Typography.Small className="font-medium text-foreground">{n.title}</Typography.Small>
                <Typography.Caption className="normal-case text-subtle-foreground">{n.time}</Typography.Caption>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Account menu"
            >
              <Avatar>
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="normal-case">
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium text-foreground">Aanya Kapoor</span>
                <span className="text-[12px] font-normal text-subtle-foreground">aanya@lifereplay.ai</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings"><UserRound className="h-3.5 w-3.5" /> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings"><Settings className="h-3.5 w-3.5" /> Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error focus:text-error">
              <LogOut className="h-3.5 w-3.5" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <GlobalSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
