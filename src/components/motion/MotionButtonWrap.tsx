"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type MotionButtonWrapProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionButtonWrap({
  children,
  className
}: MotionButtonWrapProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
