"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import { cn } from "@/lib/utils/cn";

type ScrollFadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export default function ScrollFadeIn({
  children,
  delay = 0,
  y = 12,
  className
}: ScrollFadeInProps) {
  const reduceMotion = useHydratedReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}
