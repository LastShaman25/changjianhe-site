import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CalloutCardProps = {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function CalloutCard({
  eyebrow,
  title,
  children,
  className
}: CalloutCardProps) {
  return (
    <div className={cn("metal-card relative overflow-hidden p-6 sm:p-7", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)] opacity-50" />
      {eyebrow ? <p className="section-label relative">{eyebrow}</p> : null}
      {title ? (
        <h3
          className={cn(
            "relative text-lg font-semibold tracking-[-0.02em] text-[var(--color-text)]",
            eyebrow ? "mt-5" : ""
          )}
        >
          {title}
        </h3>
      ) : null}
      <div className={cn("relative", title ? "mt-4" : eyebrow ? "mt-4" : "")}>{children}</div>
    </div>
  );
}
