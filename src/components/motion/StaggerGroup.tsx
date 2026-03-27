"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type StaggerGroupProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  stagger?: number;
};

export default function StaggerGroup({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  ...props
}: StaggerGroupProps) {
  const systemReduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduceMotion = hydrated && systemReduceMotion;

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: reduceMotion
            ? { delayChildren: 0 }
            : {
                delayChildren: delay,
                staggerChildren: stagger
              }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
