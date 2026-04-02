"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

export default function useHydratedReducedMotion() {
  const systemReduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return hydrated && systemReduceMotion;
}
