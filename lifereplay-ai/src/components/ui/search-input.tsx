"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-subtle-foreground" />
        <input
          type="search"
          ref={ref}
          value={value}
          className={cn(
            "h-9 w-full rounded-[var(--radius-sm)] border border-border bg-surface pl-9 pr-8 text-sm text-foreground placeholder:text-subtle-foreground transition-[border-color,box-shadow] duration-150",
            "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25",
            "[&::-webkit-search-cancel-button]:appearance-none",
            className
          )}
          {...props}
        />
        {onClear && value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-2.5 rounded-full p-0.5 text-subtle-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
