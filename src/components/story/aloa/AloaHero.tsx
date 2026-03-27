"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import StoryStageFrame from "@/components/story/StoryStageFrame";
import { gsap, useGSAP } from "@/components/story/gsap";

type AloaHeroProps = {
  id?: string;
  eyebrow: string;
  title: string;
  intro: string;
  statements: [string, string, string];
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function AloaHero({
  id,
  eyebrow,
  title,
  intro,
  statements,
  ctaPrimary,
  ctaSecondary
}: AloaHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      gsap.fromTo(
        q("[data-aloa-copy]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.08
        }
      );

      gsap.fromTo(
        q("[data-aloa-node]"),
        { opacity: 0, scale: 0.82 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: "power3.out"
        }
      );

      if (!reduceMotion) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.to(q("[data-aloa-pulse]"), {
            opacity: 0.35,
            scale: 1.08,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.16
          });
        });

        return () => mm.revert();
      }
    },
    { scope: rootRef, dependencies: [reduceMotion] }
  );

  return (
    <Section id={id} className="relative overflow-hidden py-24 sm:py-28 lg:py-32 hairline-grid">
      <Container wide>
        <div
          ref={rootRef}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] lg:items-end"
        >
          <div className="max-w-5xl">
            <p data-aloa-copy className="section-label">
              {eyebrow}
            </p>
            <h1 data-aloa-copy className="headline-xl mt-8 max-w-4xl sm:text-[clamp(2.7rem,5vw,5.2rem)]">
              {title}
            </h1>
            <p data-aloa-copy className="body-lg mt-6 max-w-3xl">
              {intro}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {statements.map((statement) => (
                <div
                  key={statement}
                  data-aloa-copy
                  className="rounded-[1.4rem] border border-[var(--color-border)] bg-white/4 px-5 py-5"
                >
                  <div className="soft-rule opacity-70" />
                  <p className="mt-4 text-lg leading-7 text-[var(--color-text)]">{statement}</p>
                </div>
              ))}
            </div>

            <div data-aloa-copy className="mt-10 flex flex-wrap gap-4">
              <LocaleLink href="#aloa-story" className="btn-primary">
                {ctaPrimary}
              </LocaleLink>
              <LocaleLink href="#aloa-notes" className="btn-secondary">
                {ctaSecondary}
              </LocaleLink>
            </div>
          </div>

          <StoryStageFrame className="min-h-[24rem] p-6 sm:p-8 lg:min-h-[34rem]">
            <div className="relative h-full">
              <div className="absolute left-[18%] top-[18%] h-[60%] w-16 rounded-[1.6rem] border border-white/18 bg-white/8" />
              <div className="absolute right-[18%] top-[18%] h-[60%] w-16 rounded-[1.6rem] border border-white/18 bg-white/8" />
              <div data-aloa-node className="absolute left-[21%] top-[26%] h-5 w-5 rounded-full border border-white/20 bg-white/12" />
              <div data-aloa-node className="absolute left-[21%] top-[42%] h-5 w-5 rounded-full border border-white/20 bg-white/12" />
              <div data-aloa-node className="absolute left-[21%] top-[58%] h-5 w-5 rounded-full border border-white/20 bg-white/12" />
              <div data-aloa-node className="absolute right-[21%] top-[30%] h-5 w-5 rounded-full border border-white/20 bg-white/12" />
              <div data-aloa-node className="absolute right-[21%] top-[48%] h-5 w-5 rounded-full border border-white/20 bg-white/12" />
              <div data-aloa-node className="absolute right-[21%] top-[66%] h-5 w-5 rounded-full border border-white/20 bg-white/12" />
              <div data-aloa-pulse className="absolute left-1/2 top-[34%] h-24 w-24 -translate-x-1/2 rounded-full border border-white/14 bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_70%)]" />
              <div data-aloa-pulse className="absolute left-1/2 top-[56%] h-28 w-28 -translate-x-1/2 rounded-full border border-white/14 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)]" />
              <div className="absolute left-[30%] top-[32%] h-px w-[40%] bg-gradient-to-r from-transparent via-white/42 to-transparent" />
              <div className="absolute left-[30%] top-[54%] h-px w-[40%] bg-gradient-to-r from-transparent via-white/42 to-transparent" />
            </div>
          </StoryStageFrame>
        </div>
      </Container>
    </Section>
  );
}
