"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/animations/gsap";

type MetricItem = {
  label: string;
  value: string;
  detail?: string;
};

type MetricStripProps = {
  items: MetricItem[];
  className?: string;
};

export default function MetricStrip({ items, className }: MetricStripProps) {
  const reduceMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !stripRef.current) {
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const valueNodes = gsap.utils
        .toArray<HTMLElement>("[data-metric-value]")
        .filter((node) => /^\d+$/.test(node.dataset.metricValue ?? ""));

      valueNodes.forEach((node) => {
        const targetValue = Number(node.dataset.metricValue);
        const counter = { value: 0 };

        gsap.to(counter, {
          value: targetValue,
          duration: 1.2,
          ease: "power2.out",
          paused: true,
          onUpdate: () => {
            node.textContent = String(Math.round(counter.value));
          },
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
            once: true
          }
        });
      });
    }, stripRef);

    return () => {
      ctx.revert();
    };
  }, [reduceMotion, items]);

  return (
    <div
      ref={stripRef}
      className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="metal-card relative overflow-hidden p-5 sm:p-6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)] opacity-60" />
          <p className="section-label">{item.label}</p>
          <p
            className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]"
            data-metric-value={item.value}
          >
            {item.value}
          </p>
          {item.detail ? <p className="body-sm mt-3">{item.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}
