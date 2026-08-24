import {
  Home,
  LayoutGrid,
  Clock,
  Star,
  History,
  FolderKanban,
  Search,
  Settings,
} from "lucide-react";
import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Spaces", href: "/spaces", icon: LayoutGrid },
  { label: "Recent", href: "/recent", icon: Clock },
  { label: "Favorites", href: "/favorites", icon: Star },
  { label: "Timeline", href: "/timeline", icon: History },
  { label: "Collections", href: "/collections", icon: FolderKanban },
  { label: "Search", href: "/search", icon: Search },
];

export const SETTINGS_NAV_ITEM: NavItem = { label: "Settings", href: "/settings", icon: Settings };
