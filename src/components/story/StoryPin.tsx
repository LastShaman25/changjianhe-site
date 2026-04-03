"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import { cn } from "@/lib/utils/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/components/story/gsap";

export type StoryChapter = {
  id: string;
  content: ReactNode;
  enterAnimation: (el: HTMLElement, tl: gsap.core.Timeline) => void;
  exitAnimation: (el: HTMLElement, tl: gsap.core.Timeline) => void;
};

export type StoryPinProps = {
  chapters: StoryChapter[];
  scrubDuration?: number;
  className?: string;
  viewportClassName?: string;
  fallbackClassName?: string;
  overlay?: ReactNode;
};

export default function StoryPin({
  chapters,
  scrubDuration = 600,
  className,
  viewportClassName,
  fallbackClassName,
  overlay
}: StoryPinProps) {
  const [renderMode, setRenderMode] = useState<"pending" | "pinned" | "fallback">("pending");
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldPin = renderMode === "pinned" && chapters.length > 0;

  useEffect(() => {
    const widthQuery = window.matchMedia("(max-width: 1023px)");
    const updateRenderMode = () => {
      setRenderMode(widthQuery.matches ? "fallback" : "pinned");
    };

    updateRenderMode();
    widthQuery.addEventListener("change", updateRenderMode);

    return () => {
      widthQuery.removeEventListener("change", updateRenderMode);
    };
  }, []);

  useGSAP(
    () => {
      if (!shouldPin || !containerRef.current) {
        return;
      }

      const chapterElements = gsap.utils.toArray<HTMLDivElement>(
        containerRef.current.querySelectorAll("[data-story-pin-chapter]")
      );

      if (chapterElements.length !== chapters.length) {
        return;
      }

      const ctx = gsap.context(() => {
        const masterTimeline = gsap.timeline({ paused: true });

        gsap.set(chapterElements, {
          autoAlpha: 0,
          pointerEvents: "none"
        });

        chapters.forEach((chapter, index) => {
          const chapterElement = chapterElements[index];

          if (!chapterElement) {
            return;
          }

          if (index === 0) {
            const firstEnter = gsap.timeline();

            firstEnter.set(chapterElement, {
              autoAlpha: 1,
              pointerEvents: "auto"
            });
            chapter.enterAnimation(chapterElement, firstEnter);
            firstEnter.call(() => {
              setActiveChapterId(chapter.id);
            });
            masterTimeline.add(firstEnter, 0);
            return;
          }

          const previousElement = chapterElements[index - 1];
          const previousChapter = chapters[index - 1];
          const transitionStart = masterTimeline.duration();
          const exitTimeline = gsap.timeline();
          const enterTimeline = gsap.timeline();

          if (previousElement && previousChapter) {
            exitTimeline.call(() => {
              setActiveChapterId(chapter.id);
            });
            previousChapter.exitAnimation(previousElement, exitTimeline);
            exitTimeline.set(previousElement, {
              autoAlpha: 0,
              pointerEvents: "none"
            });
          }

          enterTimeline.set(chapterElement, {
            autoAlpha: 1,
            pointerEvents: "auto"
          });
          chapter.enterAnimation(chapterElement, enterTimeline);

          masterTimeline.add(exitTimeline, transitionStart);
          masterTimeline.add(enterTimeline, transitionStart);
        });

        const pinTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${chapters.length * scrubDuration}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          animation: masterTimeline,
          onLeaveBack: () => {
            setActiveChapterId(chapters[0]?.id ?? "");
          }
        });

        return () => {
          pinTrigger.kill();
          masterTimeline.kill();
        };
      }, containerRef);

      return () => {
        ctx.revert();
      };
    },
    { scope: containerRef, dependencies: [chapters, scrubDuration, shouldPin] }
  );

  if (!chapters.length) {
    return null;
  }

  if (renderMode === "pending") {
    return <div className={cn("min-h-screen", className)} />;
  }

  if (!shouldPin) {
    return (
      <div className={cn("space-y-6", fallbackClassName)}>
        {chapters.map((chapter, index) => (
          <ScrollFadeIn key={chapter.id} delay={index * 0.06}>
            <div className="relative overflow-hidden rounded-[2rem]">{chapter.content}</div>
          </ScrollFadeIn>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)} data-story-pin-container>
      <div
        className={cn(
          "relative flex min-h-screen items-stretch overflow-hidden",
          viewportClassName
        )}
        style={{ willChange: "transform" }}
      >
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            data-story-pin-chapter={chapter.id}
            data-story-pin-active={activeChapterId === chapter.id ? "true" : "false"}
            className="absolute inset-0 will-change-transform"
            style={{ willChange: "transform, opacity" }}
          >
            {chapter.content}
          </div>
        ))}
        {overlay ? <div className="pointer-events-none absolute inset-0 z-20">{overlay}</div> : null}
      </div>
    </div>
  );
}
