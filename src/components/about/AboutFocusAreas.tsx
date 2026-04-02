"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/animations/gsap";

type FocusItem = {
  title: string;
  text: string;
};

type AboutFocusAreasProps = {
  items: FocusItem[];
};

export default function AboutFocusAreas({ items }: AboutFocusAreasProps) {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !gridRef.current) {
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-focus-card]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-focus-line]");

      gsap.set(cards, {
        opacity: 0,
        y: 40
      });
      gsap.set(lines, {
        scaleY: 0,
        transformOrigin: "top"
      });

      ScrollTrigger.batch(cards, {
        start: "top 80%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            overwrite: true
          });
        }
      });

      gsap.to(lines, {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true
        }
      });
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, [reduceMotion, items]);

  return (
    <div ref={gridRef} className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          data-focus-card
          className="metal-card relative overflow-hidden p-6 sm:p-7"
        >
          <div
            data-focus-line
            className="absolute inset-y-0 left-0 w-px bg-[var(--color-accent)]"
          />
          <h3 className="relative text-lg font-semibold tracking-[-0.02em] text-[var(--color-text)]">
            {item.title}
          </h3>
          <div className="relative mt-4">
            <p className="body-md">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
