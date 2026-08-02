import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-20 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-subtle-foreground transition-[border-color,box-shadow] duration-150 resize-y",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
