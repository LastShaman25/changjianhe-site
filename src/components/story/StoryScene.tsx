"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { cn } from "@/lib/utils/cn";
import { gsap, useGSAP } from "@/components/story/gsap";

type StorySceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  stage: ReactNode;
  align?: "left" | "right";
  className?: string;
};

export default function StoryScene({
  id,
  eyebrow,
  title,
  body,
  stage,
  align = "right",
  className
}: StorySceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const copy = root.querySelector("[data-story-copy]");
      const stageElement = root.querySelector("[data-story-stage]");
      const layers = root.querySelectorAll<HTMLElement>("[data-layer]");

      gsap.fromTo(
        [copy, stageElement],
        {
          opacity: 0,
          y: reduceMotion ? 0 : 28
        },
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.35 : 0.9,
          ease: "power3.out",
          stagger: reduceMotion ? 0 : 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 72%"
          }
        }
      );

      if (!reduceMotion) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          layers.forEach((layer, index) => {
            const depth = Number(layer.dataset.layer ?? index + 1);

            gsap.fromTo(
              layer,
              {
                yPercent: depth * 8,
                opacity: 0.38
              },
              {
                yPercent: depth * -6,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8
                }
              }
            );
          });
        });

        return () => mm.revert();
      }
    },
    { scope: rootRef, dependencies: [reduceMotion] }
  );

  return (
    <Section id={id} className={cn("py-8 sm:py-14 lg:py-20", className)}>
      <Container wide>
        <div
          ref={rootRef}
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-10"
        >
          <div
            data-story-copy
            className={cn(
              "metal-panel p-7 sm:p-9 lg:sticky lg:top-24 xl:top-28",
              align === "left" ? "lg:order-2" : "lg:order-1"
            )}
          >
            <p className="section-label">{eyebrow}</p>
            <h2 className="headline-lg mt-5 max-w-xl">{title}</h2>
            <p className="body-lg mt-5 reading-measure">{body}</p>
          </div>

          <div
            data-story-stage
            className={cn(
              "min-h-[22rem] sm:min-h-[26rem] lg:min-h-[40rem]",
              align === "left" ? "lg:order-1" : "lg:order-2"
            )}
          >
            {stage}
          </div>
        </div>
      </Container>
    </Section>
  );
}
