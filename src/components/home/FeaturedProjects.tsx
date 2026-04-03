"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import ProjectCards from "@/components/projects/ProjectCards";
import useHydratedReducedMotion from "@/components/motion/useHydratedReducedMotion";
import type { Locale, ProjectEntry } from "@/data/projects";
import { ensureGsapRegistered, gsap } from "@/lib/animations/gsap";

type FeaturedProjectsProps = {
  eyebrow: string;
  title: string;
  text: string;
  locale: Locale;
  projects: ProjectEntry[];
};

export default function FeaturedProjects({
  eyebrow,
  title,
  text,
  locale,
  projects
}: FeaturedProjectsProps) {
  const reduceMotion = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);

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
      x: -80,
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

  const titleLines =
    title === "Flagship projects across infrastructure, research, and intelligent systems."
      ? [
          <span key="flagship">
            <em className="text-[var(--color-accent)] not-italic">Flagship</em>
            {" projects across infrastructure,"}
          </span>,
          "research, and intelligent systems."
        ]
      : [title];

  return (
    <Section ref={sectionRef} className="overflow-hidden">
      <Container>
        <div className="max-w-3xl">
          <ScrollFadeIn>
            <p className="section-label">{eyebrow}</p>
          </ScrollFadeIn>
          <div ref={headlineWrapRef}>
            <HeadlineReveal
              className="headline-xl mt-6 overflow-visible will-change-transform md:whitespace-nowrap"
              lines={titleLines}
            />
          </div>
          <ScrollFadeIn delay={0.44}>
            <p className="body-lg mt-6">{text}</p>
          </ScrollFadeIn>
        </div>

        <div className="mt-10">
          <ProjectCards
            items={projects.map((project) => ({
              key: project.slug,
              href: project.href,
              eyebrow: project.category[locale],
              title: project.title[locale],
              summary: project.summary[locale],
              parallaxY:
                project.slug === "elementization"
                  ? -30
                  : project.slug === "ai-learning-assistant"
                    ? 30
                    : 0
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
