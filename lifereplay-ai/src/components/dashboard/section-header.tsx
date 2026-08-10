import * as React from "react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4", className)}>
      <div className="flex flex-col gap-1">
        <Typography.H3>{title}</Typography.H3>
        {description ? <Typography.Small>{description}</Typography.Small> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
