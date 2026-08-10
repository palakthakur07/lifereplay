"use client";

import { FolderKanban } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function CollectionsPage() {
  return (
    <PlaceholderPage
      icon={FolderKanban}
      title="Collections"
      description="User-curated groupings that cut across a single Space's contents — pull related files, notes, and tags into one view."
      emptyTitle="No collections yet"
      emptyDescription="Collections will let you group items across a Space once the feature is built."
    />
  );
}
