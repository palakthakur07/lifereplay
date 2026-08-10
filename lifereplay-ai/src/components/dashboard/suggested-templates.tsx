"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TemplateCard } from "@/components/spaces/template-card";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SPACE_TEMPLATES } from "@/features/spaces/data/mock-templates";
import type { SpaceTemplate } from "@/types";

export function SuggestedTemplates({ onSelect }: { onSelect?: (template: SpaceTemplate) => void }) {
  return (
    <motion.div
      variants={staggerContainer(0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      {SPACE_TEMPLATES.slice(0, 4).map((t) => (
        <motion.div key={t.id} variants={fadeUp}>
          <TemplateCard template={t} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
}
