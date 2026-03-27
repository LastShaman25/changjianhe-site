import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function ensureGsapRegistered() {
  if (!isRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

export { gsap, ScrollTrigger };