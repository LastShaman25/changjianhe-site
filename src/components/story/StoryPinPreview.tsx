"use client";

import { useMemo } from "react";
import StoryPin, { type StoryChapter } from "@/components/story/StoryPin";
import StoryStageFrame from "@/components/story/StoryStageFrame";
import { addSvgStrokeDraw } from "@/lib/animations/storyTriggers";
import { gsap } from "@/components/story/gsap";

function PlaceholderChapterShell({
  eyebrow,
  title,
  body,
  children
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="metal-panel p-7 sm:p-9">
          <p className="section-label">{eyebrow}</p>
          <h2 className="headline-lg mt-5">{title}</h2>
          <p className="body-md mt-5 reading-measure">{body}</p>
        </div>

        <StoryStageFrame className="h-[28rem] p-6 sm:h-[32rem] sm:p-8 lg:h-[42rem]">
          <div className="relative h-full">{children}</div>
        </StoryStageFrame>
      </div>
    </div>
  );
}

export default function StoryPinPreview() {
  const chapters = useMemo<StoryChapter[]>(
    () => [
      {
        id: "arrival",
        content: (
          <PlaceholderChapterShell
            eyebrow="Preview Chapter 1"
            title="Pin engages and the first chapter assembles."
            body="This placeholder scene is only here to verify that the pinned sequence holds the page, scrubs correctly, and releases naturally into content below."
          >
            <div className="grid h-full gap-4 sm:grid-cols-3">
              {["Signal", "Structure", "Frame"].map((label, index) => (
                <div
                  key={label}
                  data-piece
                  className="flex min-h-[10rem] items-end rounded-[1.5rem] border border-white/12 bg-white/5 p-5"
                  style={{
                    transform: `translateY(${index * 8}px)`
                  }}
                >
                  <p className="section-label text-[var(--color-text)]">{label}</p>
                </div>
              ))}
            </div>
          </PlaceholderChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const pieces = el.querySelectorAll<HTMLElement>("[data-piece]");

          tl.fromTo(
            pieces,
            {
              y: 48,
              opacity: 0,
              scale: 0.94
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.45,
              stagger: 0.08,
              ease: "power2.out"
            }
          );
        },
        exitAnimation: (el, tl) => {
          const pieces = el.querySelectorAll<HTMLElement>("[data-piece]");

          tl.to(pieces, {
            y: -28,
            opacity: 0,
            duration: 0.28,
            stagger: 0.04,
            ease: "power2.in"
          });
        }
      },
      {
        id: "connection",
        content: (
          <PlaceholderChapterShell
            eyebrow="Preview Chapter 2"
            title="Chapter transitions overlap while the line-draw helper runs."
            body="This scene tests the shared stroke-dash helper so we can reuse the same line-drawing pattern later for branches, boundaries, and loops."
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 520" fill="none">
              <path
                data-path
                d="M140 160 C250 160 300 220 400 260"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
              <path
                data-path
                d="M400 260 C500 300 560 340 680 340"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
              <path
                data-path
                d="M400 260 C500 220 560 180 680 160"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
            </svg>

            <div className="absolute left-[12%] top-[24%] h-5 w-5 rounded-full bg-[var(--color-text-soft)]" data-node />
            <div className="absolute left-[46%] top-[46%] h-6 w-6 rounded-full bg-[var(--color-accent)]" data-node />
            <div className="absolute left-[82%] top-[62%] h-5 w-5 rounded-full bg-[var(--color-text-soft)]" data-node />
            <div className="absolute left-[82%] top-[24%] h-5 w-5 rounded-full bg-[var(--color-text-soft)]" data-node />
          </PlaceholderChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const nodes = el.querySelectorAll<HTMLElement>("[data-node]");
          const paths = el.querySelectorAll<SVGPathElement>("[data-path]");

          tl.fromTo(
            nodes,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.28,
              stagger: 0.08,
              ease: "back.out(1.8)"
            }
          );
          addSvgStrokeDraw(paths, tl, gsap, {
            duration: 0.45,
            stagger: 0.08,
            at: 0.08
          });
        },
        exitAnimation: (el, tl) => {
          const nodes = el.querySelectorAll<HTMLElement>("[data-node]");
          const paths = el.querySelectorAll<SVGPathElement>("[data-path]");

          tl.to(
            [...nodes, ...paths],
            {
              opacity: 0,
              y: -18,
              duration: 0.26,
              ease: "power2.in"
            }
          );
        }
      },
      {
        id: "release",
        content: (
          <PlaceholderChapterShell
            eyebrow="Preview Chapter 3"
            title="Final chapter holds, then the pin releases into the notes below."
            body="If this feels stable when you scroll down and reverses cleanly when you scroll back up, the shared StoryPin base is ready for the real project sequences."
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/6 p-6" data-panel>
                <p className="section-label text-[var(--color-text)]">Release Check</p>
                <p className="headline-sm mt-4">The content below should appear only after this chapter completes.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {["Pin", "Scrub", "Release"].map((label) => (
                  <div
                    key={label}
                    data-badge
                    className="hero-metric-panel flex min-h-[7rem] items-end justify-start"
                  >
                    <span className="hero-metric-value">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </PlaceholderChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const panel = el.querySelector<HTMLElement>("[data-panel]");
          const badges = el.querySelectorAll<HTMLElement>("[data-badge]");

          tl.fromTo(
            panel,
            {
              opacity: 0,
              y: 36
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out"
            }
          );
          tl.fromTo(
            badges,
            {
              opacity: 0,
              y: 28
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.08,
              ease: "power2.out"
            },
            0.12
          );
        },
        exitAnimation: () => {}
      }
    ],
    []
  );

  return <StoryPin chapters={chapters} scrubDuration={520} />;
}
