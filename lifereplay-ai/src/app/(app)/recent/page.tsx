"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { Typography } from "@/components/ui/typography";
import { SpaceCard } from "@/components/spaces/space-card";
import { EmptyState } from "@/components/empty-states/empty-state";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { MOCK_SPACES } from "@/features/spaces/data/mock-spaces";
import type { Space } from "@/types";

export default function RecentPage() {
  const [spaces, setSpaces] = React.useState<Space[]>(
    [...MOCK_SPACES].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  );

  const toggleFavorite = (id: string) => {
    setSpaces((prev) => prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s)));
  };

  return (
    <PageWrapper>
      <Container size="lg" className="py-8 sm:py-10">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="flex flex-col gap-6">
          <motion.div variants={fadeUp} className="flex flex-col gap-1">
            <Typography.H1 className="text-[28px] sm:text-[32px]">Recent</Typography.H1>
            <Typography.Body className="text-muted-foreground">Spaces you&apos;ve touched most recently, newest first.</Typography.Body>
          </motion.div>

          {spaces.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.04)}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {spaces.map((space) => (
                <SpaceCard key={space.id} space={space} onToggleFavorite={toggleFavorite} />
              ))}
            </motion.div>
          ) : (
            <EmptyState icon={Clock} title="Nothing recent" description="Activity across your Spaces will show up here." />
          )}
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
