"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import { cn } from "@/lib/utils/cn";

type HeadlineRevealProps = {
  as?: "h2" | "h3";
  className?: string;
  lines: ReactNode[];
  delay?: number;
};

export default function HeadlineReveal({
  as = "h3",
  className,
  lines,
  delay = 0
}: HeadlineRevealProps) {
  const reduceMotion = useHydratedReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const MotionTag = as === "h2" ? motion.h2 : motion.h3;

  return (
    <MotionTag ref={ref} className={cn(className)}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={reduceMotion ? false : { y: "100%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : delay + index * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
