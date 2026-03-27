"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionCard({ children, className }: MotionCardProps) {
  const systemReduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduceMotion = hydrated && systemReduceMotion;

  return (
    <motion.div
      className={cn("motion-safe-panel", className)}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
        show: { opacity: 1, y: 0 }
      }}
      transition={{
        duration: reduceMotion ? 0.24 : 0.55,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              scale: 1.008
            }
      }
    >
      {children}
    </motion.div>
  );
}
