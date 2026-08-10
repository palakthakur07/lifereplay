import Link from "next/link";
import { Star } from "lucide-react";
import { WidgetCard } from "@/components/dashboard/widget-card";
import { Typography } from "@/components/ui/typography";
import { FAVORITE_SPACES } from "@/features/spaces/data/mock-spaces";

export function FavoritesWidget() {
  if (FAVORITE_SPACES.length === 0) {
    return (
      <WidgetCard title="Favorites" description="Spaces you've pinned">
        <Typography.Small>No favorites yet. Star a Space to pin it here.</Typography.Small>
      </WidgetCard>
    );
  }

  return (
    <WidgetCard title="Favorites" description="Spaces you've pinned">
      <ul className="flex flex-col gap-1">
        {FAVORITE_SPACES.map((space) => {
          const Icon = space.icon;
          return (
            <li key={space.id}>
              <Link
                href={`/spaces/${space.id}`}
                className="flex items-center gap-3 rounded-[var(--radius-sm)] px-1.5 py-2 transition-colors hover:bg-secondary"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-accent/15 text-accent">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Typography.Small className="truncate font-medium text-foreground">{space.name}</Typography.Small>
                  <Typography.Small className="truncate text-[12px]">{space.fileCount} files</Typography.Small>
                </div>
                <Star className="h-3.5 w-3.5 shrink-0 fill-warning text-warning" />
              </Link>
            </li>
          );
        })}
      </ul>
    </WidgetCard>
  );
}
