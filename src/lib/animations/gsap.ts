import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let isRegistered = false;

export function ensureGsapRegistered() {
  if (!isRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

export function setupLenisScrollSync() {
  if (typeof window === "undefined") {
    return () => {};
  }

  ensureGsapRegistered();

  const lenis = new Lenis({
    autoRaf: false
  });

  const updateScrollTrigger = () => ScrollTrigger.update();
  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };

  lenis.on("scroll", updateScrollTrigger);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", updateScrollTrigger);
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

export { gsap, ScrollTrigger };
