import { WidgetCard } from "@/components/dashboard/widget-card";
import { Typography } from "@/components/ui/typography";
import { MOCK_ACTIVITY, timeAgo } from "@/lib/mock-data";

export function RecentActivityWidget() {
  return (
    <WidgetCard title="Recent activity" description="What's changed across your Spaces">
      <ul className="flex flex-col gap-4">
        {MOCK_ACTIVITY.slice(0, 5).map((item) => {
          const Icon = item.spaceIcon;
          return (
            <li key={item.id} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-xs)] bg-accent/15 text-accent">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <Typography.Small className="text-foreground">
                  <span className="font-medium">{item.spaceName}</span> · {item.action}
                </Typography.Small>
                <Typography.Small className="truncate text-[12px]">{item.detail}</Typography.Small>
              </div>
              <Typography.Caption className="mt-0.5 shrink-0 normal-case text-subtle-foreground">
                {timeAgo(item.timestamp)}
              </Typography.Caption>
            </li>
          );
        })}
      </ul>
    </WidgetCard>
  );
}
