"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import { setupLenisScrollSync } from "@/lib/animations/gsap";

type MotionProviderProps = {
  children: ReactNode;
};

export default function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();
  const reduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    return setupLenisScrollSync();
  }, [reduceMotion]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
        }
        exit={
          reduceMotion
            ? { opacity: 1 }
            : {
                opacity: 0,
                y: -8,
                transition: {
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
