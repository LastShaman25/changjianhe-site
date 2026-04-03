"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/animations/gsap";

type IdentityStripProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export default function IdentityStrip({
  eyebrow,
  title,
  text
}: IdentityStripProps) {
  const reduceMotion = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      reduceMotion ||
      !sectionRef.current ||
      !backgroundRef.current ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    ensureGsapRegistered();

    const tween = gsap.to(backgroundRef.current, {
      y: -15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  return (
    <Section ref={sectionRef}>
      <Container>
        <div className="relative">
          <div
            ref={backgroundRef}
            aria-hidden="true"
            className="metal-panel absolute inset-0 will-change-transform"
          />
          <div className="relative p-8 sm:p-10 lg:p-12">
          <ScrollFadeIn>
            <p className="section-label">{eyebrow}</p>
          </ScrollFadeIn>

          <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <HeadlineReveal
                className="headline-lg max-w-2xl"
                lines={
                  title === "Research-minded. Builder-driven. Deployment-focused."
                    ? [
                        "Research-minded.",
                        <span key="builder-driven">
                          {/* ACCENT: confirm this word */}
                          <em className="text-[var(--color-accent)] not-italic">Builder-driven.</em>
                        </span>,
                        "Deployment-focused."
                      ]
                    : [
                        "研究导向，",
                        <span key="builder-driven-zh">
                          {/* ACCENT: confirm this word */}
                          <em className="text-[var(--color-accent)] not-italic">建造驱动，</em>
                        </span>,
                        "部署优先。"
                      ]
                }
              />
            </div>

            <div>
              <ScrollFadeIn delay={0.56}>
                <p className="body-md max-w-xl">{text}</p>
              </ScrollFadeIn>
            </div>
          </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
