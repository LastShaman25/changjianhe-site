"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/animations/gsap";

type PhilosophySectionProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export default function PhilosophySection({
  eyebrow,
  title,
  text
}: PhilosophySectionProps) {
  const reduceMotion = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduceMotion || !sectionRef.current || window.matchMedia("(hover: none)").matches) {
      return;
    }

    ensureGsapRegistered();

    const tweens = backgroundRefs.current
      .filter((background): background is HTMLDivElement => background !== null)
      .map((background) =>
        gsap.to(background, {
          y: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true
          }
        })
      );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [reduceMotion]);

  const titleLines =
    title === "Powerful systems should also be trustworthy systems."
      ? [
          "Powerful systems should also be",
          <span key="trustworthy">
            <em className="text-[var(--color-accent)] not-italic">trustworthy</em>
            {" systems."}
          </span>
        ]
      : [title];

  return (
    <Section ref={sectionRef}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <div
              ref={(node) => {
                backgroundRefs.current[0] = node;
              }}
              aria-hidden="true"
              className="metal-panel absolute inset-0 will-change-transform"
            />
            <div className="relative p-8 sm:p-10">
              <ScrollFadeIn>
                <p className="section-label">{eyebrow}</p>
              </ScrollFadeIn>
              <HeadlineReveal className="headline-lg mt-6 max-w-xl" lines={titleLines} />
            </div>
          </div>

          <div className="relative">
            <div
              ref={(node) => {
                backgroundRefs.current[1] = node;
              }}
              aria-hidden="true"
              className="metal-panel absolute inset-0 will-change-transform"
            />
            <div className="relative p-8 sm:p-10">
              <ScrollFadeIn delay={0.44}>
                <p className="body-lg max-w-2xl">{text}</p>
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
