import { cn } from "@/lib/utils";

type SectionVariant = "default" | "grid" | "dots" | "glow-green" | "glow-teal";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: SectionVariant;
  fullHeight?: boolean;
  as?: React.ElementType;
}

const variantClasses: Record<SectionVariant, string> = {
  default: "",
  grid: "bg-grid",
  dots: "bg-dots",
  "glow-green": "bg-glow-green",
  "glow-teal": "bg-glow-teal",
};

/**
 * Full-viewport-height section wrapper.
 * Accepts a variant for background decoration patterns.
 */
export function Section({
  children,
  className,
  id,
  variant = "default",
  fullHeight = true,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        "relative w-full",
        fullHeight && "min-h-screen flex flex-col justify-center",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
