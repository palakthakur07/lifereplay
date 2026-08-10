import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-[13px]", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${i}`}>
            {i > 0 ? <ChevronRight className="h-3.5 w-3.5 text-subtle-foreground" /> : null}
            {item.href && !isLast ? (
              <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className={cn(isLast ? "font-medium text-foreground" : "text-muted-foreground")}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
