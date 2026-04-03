import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className, id },
  ref
) {
  return (
    <section ref={ref} id={id} className={cn("section-pad", className)}>
      {children}
    </section>
  );
});

export default Section;
