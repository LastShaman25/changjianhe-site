"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import LocaleLink from "@/components/ui/LocaleLink";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/animations/gsap";

type ProjectCardItem = {
  key: string;
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
};

type ProjectCardsProps = {
  items: ProjectCardItem[];
  titleClassName?: string;
};

export default function ProjectCards({
  items,
  titleClassName = "headline-lg mt-5 text-[1.7rem]"
}: ProjectCardsProps) {
  const reduceMotion = useHydratedReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !gridRef.current) {
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");

      gsap.set(cards, {
        opacity: 0,
        y: 40
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
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, [reduceMotion, items]);

  return (
    <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <motion.div
          key={item.key}
          data-project-card
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          whileHover={reduceMotion ? undefined : { y: -4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.25,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <LocaleLink
            href={item.href}
            className="metal-card group block h-full p-6 transition-shadow duration-[250ms] hover:shadow-[var(--shadow-panel)]"
          >
            <p className="section-label">{item.eyebrow}</p>
            <h4 className={`${titleClassName} transition group-hover:translate-x-[2px]`}>
              {item.title}
            </h4>
            <p className="body-md mt-4">{item.summary}</p>
          </LocaleLink>
        </motion.div>
      ))}
    </div>
  );
}
