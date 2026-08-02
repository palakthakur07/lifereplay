import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Typography scale for LifeReplay AI.
 *
 * Display/H1/H2/H3 use Fraunces (the display serif) with tight, deliberate
 * tracking. Body/Small/Caption use Inter. Caption additionally offers a
 * `mono` prop for metadata (timestamps, counts, IDs) set in JetBrains Mono.
 *
 * Usage: <Typography.H1>Spaces</Typography.H1>
 */

type PolymorphicProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & Record<string, unknown>;

function createTextComponent<DefaultElement extends React.ElementType>(
  defaultElement: DefaultElement,
  baseClassName: string
) {
  function Component({ as, className, ...props }: PolymorphicProps) {
    const Tag = (as || defaultElement) as React.ElementType;
    return <Tag className={cn(baseClassName, className)} {...props} />;
  }
  return Component;
}

const Display = createTextComponent(
  "h1",
  "font-display text-[56px] sm:text-[72px] font-medium leading-[1.02] tracking-[-0.02em] text-foreground"
);

const H1 = createTextComponent(
  "h1",
  "font-display text-[36px] sm:text-[44px] font-medium leading-[1.08] tracking-[-0.015em] text-foreground"
);

const H2 = createTextComponent(
  "h2",
  "font-display text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-foreground"
);

const H3 = createTextComponent(
  "h3",
  "font-display text-[20px] font-medium leading-[1.25] tracking-[-0.005em] text-foreground"
);

const Body = createTextComponent(
  "p",
  "font-body text-[15px] leading-[1.6] text-foreground"
);

const BodyLarge = createTextComponent(
  "p",
  "font-body text-[17px] leading-[1.6] text-foreground"
);

const Small = createTextComponent(
  "p",
  "font-body text-[13px] leading-[1.5] text-muted-foreground"
);

const Caption = createTextComponent(
  "span",
  "font-mono text-[11px] leading-[1.4] tracking-wide uppercase text-subtle-foreground"
);

const Lead = createTextComponent(
  "p",
  "font-body text-[18px] leading-[1.55] text-muted-foreground"
);

export const Typography = {
  Display,
  H1,
  H2,
  H3,
  Body,
  BodyLarge,
  Small,
  Caption,
  Lead,
};
