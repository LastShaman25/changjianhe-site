"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import { gsap, useGSAP } from "@/components/story/gsap";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type ElementizationHeroProps = {
  id?: string;
  eyebrow: string;
  title: string;
  intro: string;
  statements: [string, string, string];
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function ElementizationHero({
  id,
  eyebrow,
  title,
  intro,
  statements,
  ctaPrimary,
  ctaSecondary
}: ElementizationHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);

      gsap.fromTo(
        q("[data-hero-copy]"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08
        }
      );

      gsap.fromTo(
        q("[data-hero-shard]"),
        { opacity: 0, scale: 0.82, y: 18 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.06,
          ease: "power3.out"
        }
      );

      if (!reduceMotion) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.to(q("[data-hero-orbit]"), {
            y: -16,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.18
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
            <p data-hero-copy className="section-label">
              {eyebrow}
            </p>
            <h1 data-hero-copy className="headline-xl mt-8 max-w-4xl sm:text-[clamp(2.75rem,5vw,5.5rem)]">
              {title}
            </h1>
            <p data-hero-copy className="body-lg mt-6 max-w-3xl">
              {intro}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {statements.map((statement) => (
                <div
                  key={statement}
                  data-hero-copy
                  className="rounded-[1.4rem] border border-[var(--color-border)] bg-white/4 px-5 py-5"
                >
                  <div className="soft-rule opacity-70" />
                  <p className="mt-4 text-lg leading-7 text-[var(--color-text)]">{statement}</p>
                </div>
              ))}
            </div>

            <div data-hero-copy className="mt-10 flex flex-wrap gap-4">
              <LocaleLink href="#elementization-story" className="btn-primary">
                {ctaPrimary}
              </LocaleLink>
              <LocaleLink href="#elementization-notes" className="btn-secondary">
                {ctaSecondary}
              </LocaleLink>
            </div>
          </div>

          <StoryStageFrame className="min-h-[24rem] p-6 sm:p-8 lg:min-h-[34rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_45%)]" />
            <div className="relative h-full">
              <div
                data-hero-orbit
                data-hero-shard
                className="absolute left-[10%] top-[15%] h-16 w-16 rounded-[1.2rem] border border-white/20 bg-white/8 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
              />
              <div
                data-hero-orbit
                data-hero-shard
                className="absolute left-[36%] top-[24%] h-24 w-24 rounded-[1.8rem] border border-white/18 bg-white/10"
              />
              <div
                data-hero-orbit
                data-hero-shard
                className="absolute right-[12%] top-[18%] h-20 w-20 rounded-[1.5rem] border border-white/20 bg-white/8"
              />
              <div
                data-hero-shard
                className="absolute left-[18%] top-[54%] h-px w-[62%] bg-gradient-to-r from-transparent via-white/45 to-transparent"
              />
              <div
                data-hero-shard
                className="absolute left-[28%] top-[52%] h-28 w-28 rounded-full border border-[var(--color-border-strong)] bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_65%)]"
              />
              <div
                data-hero-orbit
                data-hero-shard
                className="absolute bottom-[12%] right-[18%] h-24 w-44 rounded-[2rem] border border-white/18 bg-[linear-gradient(to_right,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]"
              />
            </div>
          </StoryStageFrame>
        </div>
      </Container>
    </Section>
  );
}
