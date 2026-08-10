"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Files, LayoutGrid, Star, TrendingUp } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { ContinueWorking } from "@/components/dashboard/continue-working";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivityWidget } from "@/components/dashboard/recent-activity-widget";
import { FavoritesWidget } from "@/components/dashboard/favorites-widget";
import { TodaySummaryWidget } from "@/components/dashboard/today-summary-widget";
import { SuggestedTemplates } from "@/components/dashboard/suggested-templates";
import { SpaceCard } from "@/components/spaces/space-card";
import { CreateSpaceDialog } from "@/features/spaces/components/create-space-dialog";
import { MOCK_SPACES } from "@/features/spaces/data/mock-spaces";
import { staggerContainer, fadeUp } from "@/lib/motion";
import type { Space, SpaceTemplate } from "@/types";

export default function DashboardPage() {
  const [spaces, setSpaces] = React.useState<Space[]>(MOCK_SPACES);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [prefillTemplate, setPrefillTemplate] = React.useState<SpaceTemplate | null>(null);

  const recentSpaces = [...spaces]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const toggleFavorite = (id: string) => {
    setSpaces((prev) => prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s)));
  };

  const openCreate = (template?: SpaceTemplate) => {
    setPrefillTemplate(template ?? null);
    setCreateOpen(true);
  };

  return (
    <PageWrapper>
      <Container size="lg" className="py-8 sm:py-10">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="flex flex-col gap-12">
          <WelcomeCard onCreateSpace={() => openCreate()} />

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={LayoutGrid} label="Active Spaces" value={String(spaces.length)} trend={{ value: "+1 this week", direction: "up" }} />
            <StatCard icon={Files} label="Files indexed" value="437" trend={{ value: "+28 this week", direction: "up" }} />
            <StatCard icon={Star} label="Favorites" value={String(spaces.filter((s) => s.favorite).length)} />
            <StatCard icon={TrendingUp} label="Avg. progress" value={`${Math.round(spaces.reduce((a, s) => a + s.progress, 0) / spaces.length)}%`} />
          </motion.div>

          <motion.section variants={fadeUp}>
            <SectionHeader title="Continue working" description="Pick up where you left off" />
            <ContinueWorking />
          </motion.section>

          <motion.section variants={fadeUp}>
            <SectionHeader title="Quick actions" />
            <QuickActions onCreateSpace={() => openCreate()} />
          </motion.section>

          <motion.section variants={fadeUp}>
            <SectionHeader
              title="Recent Spaces"
              description="Your most recently updated areas"
              action={
                <Link href="/spaces" className="text-[13px] font-medium text-accent hover:underline">
                  View all
                </Link>
              }
            />
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {recentSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} onToggleFavorite={toggleFavorite} />
              ))}
            </motion.div>
          </motion.section>

          <motion.section variants={fadeUp} className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivityWidget />
            </div>
            <div className="flex flex-col gap-6">
              <FavoritesWidget />
            </div>
          </motion.section>

          <motion.section variants={fadeUp}>
            <TodaySummaryWidget />
          </motion.section>

          <motion.section variants={fadeUp}>
            <SectionHeader title="Suggested templates" description="Popular starting points for a new Space" />
            <SuggestedTemplates onSelect={(t) => openCreate(t)} />
          </motion.section>
        </motion.div>
      </Container>

      <CreateSpaceDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        initialTemplate={prefillTemplate}
        onCreate={(space) => setSpaces((prev) => [space, ...prev])}
      />
    </PageWrapper>
  );
}
