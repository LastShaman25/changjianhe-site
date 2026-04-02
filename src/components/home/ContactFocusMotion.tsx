"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/animations/gsap";

type ContactFocusMotionProps = {
  children: ReactNode;
};

export default function ContactFocusMotion({ children }: ContactFocusMotionProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !panelRef.current) {
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const primaryButton = panelRef.current?.querySelector("[data-contact-primary]");

      gsap.fromTo(
        panelRef.current,
        {
          filter: "blur(3px)",
          opacity: 0.4,
          scale: 1.03
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top bottom",
            end: "top 70%",
            scrub: 0.8
          }
        }
      );

      if (!primaryButton) {
        return;
      }

      const pulse = gsap.timeline({
        paused: true,
        repeat: -1
      });

      pulse
        .to(primaryButton, {
          scale: 1.02,
          duration: 1.5,
          ease: "power1.inOut"
        })
        .to(primaryButton, {
          scale: 1,
          duration: 1.5,
          ease: "power1.inOut"
        });

      ScrollTrigger.create({
        trigger: panelRef.current,
        start: "top 75%",
        onEnter: () => pulse.play(),
        onLeaveBack: () => {
          pulse.pause(0);
          gsap.set(primaryButton, { scale: 1 });
        }
      });
    }, panelRef);

    return () => {
      ctx.revert();
    };
  }, [reduceMotion]);

  return <div ref={panelRef}>{children}</div>;
}
