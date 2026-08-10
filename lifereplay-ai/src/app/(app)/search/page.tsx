"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { EmptyState } from "@/components/empty-states/empty-state";
import { fadeUp } from "@/lib/motion";

const FILTERS = ["All", "Spaces", "Files", "Notes", "Tags"];

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("All");

  return (
    <PageWrapper>
      <Container size="md" className="py-8 sm:py-10">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Typography.H1 className="text-[28px] sm:text-[32px]">Search</Typography.H1>
            <Typography.Body className="text-muted-foreground">
              Semantic search across every Space — UI preview, not yet wired to real results.
            </Typography.Body>
          </div>

          <SearchInput
            autoFocus
            placeholder="Search Spaces, files, notes, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            className="h-11 text-[15px]"
          />

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button key={f} type="button" onClick={() => setActiveFilter(f)}>
                <Badge variant={activeFilter === f ? "accent" : "outline"} className="cursor-pointer px-3 py-1">
                  {f}
                </Badge>
              </button>
            ))}
          </div>

          <EmptyState
            icon={SearchIcon}
            title={query ? `No results for "${query}"` : "Start typing to search"}
            description={
              query
                ? "Search isn't connected to real data yet — this is a layout preview."
                : "Once search is live, results from every Space will appear here as you type."
            }
          />
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
