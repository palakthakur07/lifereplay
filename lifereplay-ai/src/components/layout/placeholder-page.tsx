"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-states/empty-state";
import { fadeUp } from "@/lib/motion";

export interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
  children?: React.ReactNode;
}

export function PlaceholderPage({
  title,
  description,
  icon,
  emptyTitle,
  emptyDescription,
  children,
}: PlaceholderPageProps) {
  return (
    <PageWrapper>
      <Container size="lg" className="py-8 sm:py-10">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <Typography.H1 className="text-[28px] sm:text-[32px]">{title}</Typography.H1>
              <Badge variant="outline">Coming soon</Badge>
            </div>
            <Typography.Body className="max-w-xl text-muted-foreground">{description}</Typography.Body>
          </div>
          {children ?? <EmptyState icon={icon} title={emptyTitle} description={emptyDescription} />}
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
