"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type StoryProgressProps = {
  items: Array<{
    id: string;
    label: string;
  }>;
};

export default function StoryProgress({ items }: StoryProgressProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(index);
          }
        },
        { threshold: 0.45 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [items]);

  return (
    <nav
      aria-label="Story progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="metal-panel min-w-[11rem] p-3">
        <div className="space-y-1.5">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
                index === active
                  ? "bg-white/8 text-white"
                  : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-soft)]"
              )}
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full border transition",
                  index === active
                    ? "border-white bg-white shadow-[0_0_16px_rgba(255,255,255,0.45)]"
                    : "border-white/30 bg-transparent group-hover:border-white/50"
                )}
              />
              <span className="text-xs uppercase tracking-[0.18em]">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
