"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import StaggerGroup from "@/components/motion/StaggerGroup";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";
import MotionCard from "@/components/motion/MotionCard";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import { ensureGsapRegistered, gsap } from "@/lib/animations/gsap";

type AccomplishmentsPreviewProps = {
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
  cta: string;
};

export default function AccomplishmentsPreview({
  eyebrow,
  title,
  text,
  items,
  cta
}: AccomplishmentsPreviewProps) {
  const reduceMotion = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      reduceMotion ||
      !sectionRef.current ||
      !headlineWrapRef.current ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    ensureGsapRegistered();

    const headline = headlineWrapRef.current.querySelector("h2, h3");

    if (!headline) {
      return;
    }

    const tween = gsap.to(headline, {
      x: 60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

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

  const titleLines =
    title === "Research, ventures, infrastructure, and product execution."
      ? [
          <span key="research">
            <em className="text-[var(--color-accent)] not-italic">Research</em>
            {", ventures,"}
          </span>,
          "infrastructure, and product execution."
        ]
      : [title];

  return (
    <Section ref={sectionRef} className="overflow-hidden">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative">
            <div
              ref={backgroundRef}
              aria-hidden="true"
              className="metal-panel absolute inset-0 will-change-transform"
            />
            <div className="relative p-8 sm:p-10">
              <ScrollFadeIn>
                <p className="section-label">{eyebrow}</p>
              </ScrollFadeIn>
              <div ref={headlineWrapRef}>
                <HeadlineReveal
                  className="headline-lg mt-6 max-w-2xl overflow-visible will-change-transform md:whitespace-nowrap"
                  lines={titleLines}
                />
              </div>
              <ScrollFadeIn delay={0.44}>
                <p className="body-md mt-6 max-w-2xl">{text}</p>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.52}>
                <MotionButtonWrap className="mt-8 inline-flex">
                  <LocaleLink href="/accomplishments" className="btn-secondary">
                    {cta}
                  </LocaleLink>
                </MotionButtonWrap>
              </ScrollFadeIn>
            </div>
          </div>

          <StaggerGroup className="grid gap-4" delay={0.06} stagger={0.08}>
            {items.map((item) => (
              <MotionCard key={item}>
                <div className="bg-[linear-gradient(to_right,var(--color-warning)_0,var(--color-warning)_3px,transparent_3px)] px-5 py-4 [background-color:var(--color-surface-lowest)]">
                  <p className="body-md text-[var(--color-text)]">{item}</p>
                </div>
              </MotionCard>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}
