"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { SpaceCard } from "@/components/spaces/space-card";
import { EmptyState } from "@/components/empty-states/empty-state";
import { CreateSpaceDialog } from "@/features/spaces/components/create-space-dialog";
import { MOCK_SPACES } from "@/features/spaces/data/mock-spaces";
import { staggerContainer, fadeUp } from "@/lib/motion";
import type { Space } from "@/types";

type FilterKey = "all" | "favorites";

export default function SpacesPage() {
  const [spaces, setSpaces] = React.useState<Space[]>(MOCK_SPACES);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [createOpen, setCreateOpen] = React.useState(false);

  const toggleFavorite = (id: string) => {
    setSpaces((prev) => prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s)));
  };

  const filtered = spaces
    .filter((s) => (filter === "favorites" ? s.favorite : true))
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <PageWrapper>
      <Container size="lg" className="py-8 sm:py-10">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="flex flex-col gap-6">
          <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <Typography.H1 className="text-[28px] sm:text-[32px]">Spaces</Typography.H1>
              <Typography.Body className="text-muted-foreground">
                Every area of your life, organized and ready to recall.
              </Typography.Body>
            </div>
            <Button size="lg" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" />
              New Space
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)}>
              <TabsList>
                <TabsTrigger value="all">All Spaces</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>
            <SearchInput
              placeholder="Filter by name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              className="sm:w-64"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                variants={staggerContainer(0.04)}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((space) => (
                  <SpaceCard key={space.id} space={space} onToggleFavorite={toggleFavorite} />
                ))}
              </motion.div>
            ) : (
              <EmptyState
                key="empty"
                icon={LayoutGrid}
                title={query ? "No Spaces match your search" : "No favorites yet"}
                description={
                  query
                    ? "Try a different name, or clear the filter to see everything."
                    : "Star a Space to pin it here for quick access."
                }
                action={query ? { label: "Clear search", onClick: () => setQuery("") } : undefined}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </Container>

      <CreateSpaceDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={(space) => setSpaces((prev) => [space, ...prev])}
      />
    </PageWrapper>
  );
}
