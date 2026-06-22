import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Responsive max-width container.
 * Max-width: 1440px, centered, with horizontal padding.
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-16",
        className
      )}
    >
      {children}
    </Component>
  );
}
