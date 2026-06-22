"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChildren, fadeUp, viewportOnce } from "@/lib/motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

interface PlaceholderCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  accent?: "green" | "teal" | "purple";
}

const accentColors = {
  green: "border-[#00ff85]/20 hover:border-[#00ff85]/40 hover:bg-[#00ff85]/5",
  teal: "border-[#00b4d8]/20 hover:border-[#00b4d8]/40 hover:bg-[#00b4d8]/5",
  purple: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5",
};

const accentText = {
  green: "text-[#00ff85]",
  teal: "text-[#00b4d8]",
  purple: "text-purple-400",
};

function PlaceholderCard({
  title,
  description,
  icon,
  accent = "green",
}: PlaceholderCardProps) {
  return (
    <motion.div
      variants={staggerChildren}
      className={cn(
        "relative p-6 rounded-xl border bg-[#0a1628] transition-all duration-300 cursor-default",
        accentColors[accent]
      )}
    >
      {icon && (
        <div className={cn("mb-4 w-10 h-10 flex items-center justify-center rounded-lg bg-[#0f2942]", accentText[accent])}>
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#64748b] leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface PlaceholderSectionProps {
  id?: string;
  heading: string;
  subheading?: string;
  cards: PlaceholderCardProps[];
  variant?: "default" | "grid" | "dots";
  accent?: "green" | "teal" | "purple";
  columns?: 2 | 3 | 4;
}

/**
 * Reusable placeholder content section — used on every route page.
 */
export function PlaceholderSection({
  id,
  heading,
  subheading,
  cards,
  variant = "default",
  accent = "green",
  columns = 3,
}: PlaceholderSectionProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section id={id} variant={variant} fullHeight={false} className="py-24 lg:py-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h2>
            {subheading && (
              <p className="text-[#94a3b8] text-lg leading-relaxed">{subheading}</p>
            )}
            <div className={cn("mt-6 h-px w-16 mx-auto", accentText[accent])} style={{ background: `currentColor` }} />
          </motion.div>

          {/* Cards grid */}
          <div className={cn("grid grid-cols-1 gap-6", gridCols[columns])}>
            {cards.map((card) => (
              <PlaceholderCard key={card.title} {...card} accent={accent} />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
