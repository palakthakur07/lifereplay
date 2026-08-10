import { Flame, FileStack, Clock3 } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widget-card";
import { Typography } from "@/components/ui/typography";

const ITEMS = [
  { icon: FileStack, label: "Files added today", value: "7" },
  { icon: Clock3, label: "Time in LifeReplay", value: "42m" },
  { icon: Flame, label: "Day streak", value: "5" },
];

export function TodaySummaryWidget() {
  return (
    <WidgetCard title="Today's summary" description="A placeholder for your daily recap">
      <div className="grid grid-cols-3 gap-3">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 rounded-[var(--radius-sm)] bg-muted/60 py-3 text-center">
            <item.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <Typography.H3 className="text-[18px]">{item.value}</Typography.H3>
            <Typography.Caption className="normal-case leading-tight text-subtle-foreground">{item.label}</Typography.Caption>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
