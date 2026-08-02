import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-foreground placeholder:text-subtle-foreground transition-[border-color,box-shadow] duration-150",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
