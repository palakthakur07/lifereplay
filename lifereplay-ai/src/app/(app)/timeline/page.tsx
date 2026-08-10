"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { staggerContainer, fadeUp, slideIn } from "@/lib/motion";
import { MOCK_ACTIVITY, timeAgo } from "@/lib/mock-data";

export default function TimelinePage() {
  return (
    <PageWrapper>
      <Container size="md" className="py-8 sm:py-10">
        <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="flex flex-col gap-8">
          <motion.div variants={fadeUp} className="flex flex-col gap-1">
            <Typography.H1 className="text-[28px] sm:text-[32px]">Timeline</Typography.H1>
            <Typography.Body className="text-muted-foreground">
              Everything added across your Spaces, in order.
            </Typography.Body>
          </motion.div>

          <motion.ol variants={staggerContainer(0.05)} className="relative flex flex-col gap-6 pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" aria-hidden />
            {MOCK_ACTIVITY.map((item) => {
              const Icon = item.spaceIcon;
              return (
                <motion.li key={item.id} variants={slideIn} className="relative">
                  <span className="absolute -left-6 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-background bg-accent" />
                  <Link
                    href={`/spaces/${item.spaceId}`}
                    className="flex flex-col gap-1.5 rounded-[var(--radius-md)] border border-border bg-surface p-4 transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                        <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                        {item.spaceName}
                      </span>
                      <Typography.Caption className="normal-case text-subtle-foreground">
                        {timeAgo(item.timestamp)}
                      </Typography.Caption>
                    </div>
                    <Typography.Small className="text-foreground">{item.action}</Typography.Small>
                    <Typography.Small className="text-[12px]">{item.detail}</Typography.Small>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ol>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
