"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import LinkCard from "@/components/ui/LinkCard";

type NextSurfaceItem = {
  href: string;
  title: string;
  description: string;
};

type AboutNextSurfaceCardsProps = {
  items: [NextSurfaceItem, NextSurfaceItem];
};

export default function AboutNextSurfaceCards({ items }: AboutNextSurfaceCardsProps) {
  const reduceMotion = useHydratedReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div ref={ref} className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={reduceMotion ? false : { opacity: 0, x: index === 0 ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : index * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <LinkCard
            href={item.href}
            title={item.title}
            description={item.description}
            disableHoverLift
          />
        </motion.div>
      ))}
    </div>
  );
}
