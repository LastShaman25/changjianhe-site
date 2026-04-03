"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import StoryPin, { type StoryChapter } from "@/components/story/StoryPin";
import StoryStageFrame from "@/components/story/StoryStageFrame";
import { gsap } from "@/components/story/gsap";
import { addSvgStrokeDraw } from "@/lib/animations/storyTriggers";

type Locale = "en" | "zh";

type ChapterContent = {
  eyebrow: string;
  title: string;
  body: string;
};

type ElementizationPinnedStoryProps = {
  id?: string;
  locale: Locale;
  dataWorld: ChapterContent;
  transformationGate: ChapterContent;
  transposedLayer: ChapterContent;
  trustBoundary: ChapterContent;
  deployableAi: ChapterContent;
  glyphs: string[];
  trustBoundaryLabel: string;
  deployableBadges: string[];
};

type Point = {
  left: string;
  top: string;
};

type Vector = {
  x: number;
  y: number;
  rotation?: number;
};

const cloudPositions: Point[] = [
  { left: "14%", top: "18%" },
  { left: "28%", top: "16%" },
  { left: "21%", top: "31%" },
  { left: "36%", top: "27%" },
  { left: "12%", top: "44%" },
  { left: "29%", top: "48%" },
  { left: "42%", top: "16%" },
  { left: "46%", top: "39%" },
  { left: "24%", top: "63%" },
  { left: "38%", top: "60%" },
  { left: "10%", top: "65%" },
  { left: "46%", top: "58%" }
];

const dataScatterIn: Vector[] = [
  { x: -220, y: -150, rotation: -24 },
  { x: -110, y: -190, rotation: 18 },
  { x: -170, y: -80, rotation: -14 },
  { x: -80, y: -120, rotation: 22 },
  { x: -230, y: 30, rotation: -18 },
  { x: -120, y: 16, rotation: 12 },
  { x: -60, y: -170, rotation: -16 },
  { x: 28, y: -48, rotation: 20 },
  { x: -140, y: 108, rotation: -12 },
  { x: -36, y: 84, rotation: 14 },
  { x: -210, y: 140, rotation: -22 },
  { x: 12, y: 128, rotation: 16 }
];

const dataScatterOut: Vector[] = [
  { x: -180, y: -110 },
  { x: 120, y: -180 },
  { x: -220, y: 60 },
  { x: 170, y: -90 },
  { x: -200, y: 140 },
  { x: 160, y: 120 },
  { x: 110, y: -140 },
  { x: 230, y: 16 },
  { x: -90, y: 180 },
  { x: 84, y: 160 },
  { x: -160, y: 220 },
  { x: 210, y: 180 }
];

const gatePositions: Point[] = [
  { left: "18%", top: "18%" },
  { left: "20%", top: "29%" },
  { left: "19%", top: "40%" },
  { left: "18%", top: "51%" },
  { left: "21%", top: "62%" },
  { left: "20%", top: "73%" },
  { left: "28%", top: "23%" },
  { left: "30%", top: "35%" },
  { left: "31%", top: "48%" },
  { left: "28%", top: "59%" },
  { left: "30%", top: "70%" },
  { left: "26%", top: "80%" }
];

const gridPositions: Point[] = [
  { left: "26%", top: "22%" },
  { left: "40%", top: "22%" },
  { left: "54%", top: "22%" },
  { left: "68%", top: "22%" },
  { left: "26%", top: "38%" },
  { left: "40%", top: "38%" },
  { left: "54%", top: "38%" },
  { left: "68%", top: "38%" },
  { left: "26%", top: "54%" },
  { left: "40%", top: "54%" },
  { left: "54%", top: "54%" },
  { left: "68%", top: "54%" },
  { left: "26%", top: "70%" },
  { left: "40%", top: "70%" },
  { left: "54%", top: "70%" },
  { left: "68%", top: "70%" }
];

const gridEntryOffsets: Vector[] = [
  { x: -160, y: -110 },
  { x: -80, y: -80 },
  { x: -24, y: -92 },
  { x: 54, y: -120 },
  { x: -150, y: -42 },
  { x: -74, y: -18 },
  { x: -14, y: -28 },
  { x: 62, y: -34 },
  { x: -154, y: 34 },
  { x: -68, y: 22 },
  { x: 10, y: 18 },
  { x: 88, y: 16 },
  { x: -138, y: 102 },
  { x: -62, y: 88 },
  { x: 4, y: 98 },
  { x: 70, y: 116 }
];

const gridExitOffsets: Vector[] = [
  { x: 120, y: 78 },
  { x: 86, y: 50 },
  { x: 40, y: 30 },
  { x: 2, y: 10 },
  { x: 92, y: 52 },
  { x: 58, y: 26 },
  { x: 18, y: 8 },
  { x: -12, y: -6 },
  { x: 64, y: 22 },
  { x: 30, y: 8 },
  { x: -8, y: -2 },
  { x: -38, y: -18 },
  { x: 32, y: -2 },
  { x: -2, y: -10 },
  { x: -36, y: -26 },
  { x: -72, y: -42 }
];

const boundaryRawPositions: Point[] = [
  { left: "18%", top: "18%" },
  { left: "34%", top: "14%" },
  { left: "50%", top: "20%" },
  { left: "66%", top: "16%" },
  { left: "24%", top: "32%" },
  { left: "42%", top: "30%" },
  { left: "58%", top: "34%" },
  { left: "72%", top: "30%" }
];

const constellationPositions: Point[] = [
  { left: "22%", top: "22%" },
  { left: "42%", top: "18%" },
  { left: "62%", top: "24%" },
  { left: "76%", top: "38%" },
  { left: "64%", top: "56%" },
  { left: "40%", top: "62%" },
  { left: "22%", top: "54%" },
  { left: "50%", top: "40%" }
];

function splitHeadline(text: string, locale: Locale) {
  if (locale === "zh") {
    return Array.from(text).filter((character) => character.trim().length > 0);
  }

  return text.split(/\s+/).filter(Boolean);
}

function TokenHeadline({
  text,
  locale,
  className
}: {
  text: string;
  locale: Locale;
  className: string;
}) {
  const tokens = splitHeadline(text, locale);

  return (
    <h2 className={className}>
      {tokens.map((token, index) => (
        <span
          key={`${token}-${index}`}
          data-title-token
          className={locale === "zh" ? "inline-block" : "mr-[0.32em] inline-block"}
        >
          {token}
        </span>
      ))}
    </h2>
  );
}

function ChapterShell({
  id,
  eyebrow,
  title,
  body,
  locale,
  titleMode = "plain",
  titleClassName = "headline-lg mt-5 max-w-xl",
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  locale: Locale;
  titleMode?: "plain" | "tokens";
  titleClassName?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="flex min-h-screen items-center px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div data-copy className="metal-panel p-7 sm:p-9 will-change-transform">
          <p className="section-label">{eyebrow}</p>
          {titleMode === "tokens" ? (
            <TokenHeadline text={title} locale={locale} className={titleClassName} />
          ) : (
            <h2 className={titleClassName}>{title}</h2>
          )}
          <p className="body-md mt-5 reading-measure">{body}</p>
        </div>

        <StoryStageFrame className="h-[30rem] p-6 sm:h-[34rem] sm:p-8 lg:h-[44rem]">
          <div data-stage className="relative h-full">
            {children}
          </div>
        </StoryStageFrame>
      </div>
    </div>
  );
}

export default function ElementizationPinnedStory({
  id,
  locale,
  dataWorld,
  transformationGate,
  transposedLayer,
  trustBoundary,
  deployableAi,
  glyphs,
  trustBoundaryLabel,
  deployableBadges
}: ElementizationPinnedStoryProps) {
  const chapters = useMemo<StoryChapter[]>(() => {
    const chapterOneGlyphs = glyphs.slice(0, 12);
    const shapeCount = 16;

    return [
      {
        id: "elementization-data-world",
        content: (
          <ChapterShell
            id={id}
            locale={locale}
            eyebrow={dataWorld.eyebrow}
            title={dataWorld.title}
            body={dataWorld.body}
          >
            {chapterOneGlyphs.map((glyph, index) => (
              <span
                key={`${glyph}-${index}`}
                data-glyph
                className="absolute rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[var(--color-text-soft)] will-change-transform"
                style={cloudPositions[index]}
              >
                {glyph}
              </span>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const glyphNodes = el.querySelectorAll<HTMLElement>("[data-glyph]");

          tl.fromTo(
            glyphNodes,
            {
              x: (index) => dataScatterIn[index]?.x ?? -120,
              y: (index) => dataScatterIn[index]?.y ?? 80,
              rotation: (index) => dataScatterIn[index]?.rotation ?? 0,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 0.6,
              duration: 0.55,
              stagger: 0.04,
              ease: "power2.out"
            }
          );

          tl.fromTo(
            copy,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            },
            0.2
          );
        },
        exitAnimation: (el, tl) => {
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const glyphNodes = el.querySelectorAll<HTMLElement>("[data-glyph]");

          tl.to(
            glyphNodes,
            {
              x: (index) => dataScatterOut[index]?.x ?? 0,
              y: (index) => dataScatterOut[index]?.y ?? 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in"
            },
            0
          );

          tl.to(
            copy,
            {
              opacity: 0,
              duration: 0.25,
              ease: "power2.in"
            },
            0
          );
        }
      },
      {
        id: "elementization-gate",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={transformationGate.eyebrow}
            title={transformationGate.title}
            body={transformationGate.body}
            titleMode="tokens"
          >
            <div
              data-gate
              className="absolute left-1/2 top-[8%] h-[78%] w-px bg-[var(--color-accent)] will-change-transform"
            />

            {chapterOneGlyphs.map((glyph, index) => (
              <div key={`${glyph}-${index}`}>
                <span
                  data-gate-text
                  className="absolute rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[var(--color-text-soft)] will-change-transform"
                  style={gatePositions[index]}
                >
                  {glyph}
                </span>
                <span
                  data-gate-shape
                  className="absolute h-3 w-3 bg-[var(--color-accent)] will-change-transform"
                  style={{
                    left: `calc(${gatePositions[index].left} + 34%)`,
                    top: gatePositions[index].top,
                    borderRadius: index % 2 === 0 ? "999px" : "0.2rem"
                  }}
                />
              </div>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const gate = el.querySelector<HTMLElement>("[data-gate]");
          const texts = el.querySelectorAll<HTMLElement>("[data-gate-text]");
          const shapes = el.querySelectorAll<HTMLElement>("[data-gate-shape]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");

          tl.fromTo(
            gate,
            { scaleY: 0, opacity: 1, transformOrigin: "top center" },
            { scaleY: 1, duration: 0.4, ease: "power2.out" }
          );
          tl.fromTo(
            texts,
            {
              x: -180,
              opacity: 0
            },
            {
              x: 0,
              opacity: 0.8,
              duration: 0.45,
              stagger: 0.04,
              ease: "power2.out"
            },
            0.04
          );
          tl.to(
            texts,
            {
              x: 36,
              opacity: 0,
              duration: 0.24,
              stagger: 0.04,
              ease: "power2.in"
            },
            0.28
          );
          tl.fromTo(
            shapes,
            {
              x: -24,
              opacity: 0,
              scale: 0.5
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.28,
              stagger: 0.04,
              ease: "power2.out"
            },
            0.34
          );
          tl.fromTo(
            titleTokens,
            {
              y: 30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out"
            },
            0.16
          );
          tl.fromTo(
            copy?.querySelector("p.body-md") ?? [],
            {
              opacity: 0,
              y: 16
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out"
            },
            0.34
          );
        },
        exitAnimation: (el, tl) => {
          const gate = el.querySelector<HTMLElement>("[data-gate]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(
            gate,
            {
              opacity: 0,
              duration: 0.3
            },
            0
          );
          tl.to(
            copy,
            {
              opacity: 0,
              duration: 0.25
            },
            0
          );
        }
      },
      {
        id: "elementization-layer",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={transposedLayer.eyebrow}
            title={transposedLayer.title}
            body={transposedLayer.body}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 560" fill="none">
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((column) => (
                  <line
                    key={`h-${row}-${column}`}
                    data-grid-line
                    x1={220 + column * 112}
                    y1={160 + row * 86}
                    x2={332 + column * 112}
                    y2={160 + row * 86}
                    stroke="rgba(255,84,76,0.45)"
                    strokeWidth="1.5"
                  />
                ))
              )}
              {[0, 1, 2].map((column) =>
                [0, 1, 2].map((row) => (
                  <line
                    key={`v-${column}-${row}`}
                    data-grid-line
                    x1={220 + column * 112}
                    y1={160 + row * 86}
                    x2={220 + column * 112}
                    y2={246 + row * 86}
                    stroke="rgba(255,84,76,0.32)"
                    strokeWidth="1.5"
                  />
                ))
              )}
            </svg>

            {Array.from({ length: shapeCount }).map((_, index) => (
              <span
                key={`grid-${index}`}
                data-grid-shape
                className="absolute h-4 w-4 bg-[var(--color-accent)] will-change-transform"
                style={{
                  ...gridPositions[index],
                  borderRadius: index % 2 === 0 ? "999px" : "0.24rem"
                }}
              />
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const shapes = el.querySelectorAll<HTMLElement>("[data-grid-shape]");
          const lines = el.querySelectorAll<SVGLineElement>("[data-grid-line]");

          tl.fromTo(
            shapes,
            {
              x: (index) => gridEntryOffsets[index]?.x ?? 0,
              y: (index) => gridEntryOffsets[index]?.y ?? 0,
              opacity: 0,
              scale: 0.7
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: "power3.inOut"
            }
          );
          addSvgStrokeDraw(lines, tl, gsap, {
            duration: 0.35,
            stagger: 0.02,
            at: 0.16
          });
          tl.fromTo(
            copy,
            {
              opacity: 0,
              y: 18
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out"
            },
            0.14
          );
        },
        exitAnimation: (el, tl) => {
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const shapes = el.querySelectorAll<HTMLElement>("[data-grid-shape]");
          const lines = el.querySelectorAll<SVGLineElement>("[data-grid-line]");

          tl.to(
            lines,
            {
              opacity: 0,
              duration: 0.18
            },
            0
          );
          tl.to(
            shapes,
            {
              x: (index) => gridExitOffsets[index]?.x ?? 0,
              y: (index) => gridExitOffsets[index]?.y ?? 0,
              scale: 0.78,
              duration: 0.35,
              stagger: 0.02,
              ease: "power2.inOut"
            },
            0.04
          );
          tl.to(
            copy,
            {
              opacity: 0,
              duration: 0.25
            },
            0
          );
        }
      },
      {
        id: "elementization-boundary",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={trustBoundary.eyebrow}
            title={trustBoundary.title}
            body={trustBoundary.body}
            titleMode="tokens"
          >
            <div
              data-boundary-line
              className="absolute inset-x-[10%] top-1/2 h-px bg-[var(--color-accent)] will-change-transform"
            />
            <span
              data-boundary-label
              className="section-label absolute left-[10%] top-[calc(50%-2rem)] text-[var(--color-text-soft)]"
            >
              {trustBoundaryLabel}
            </span>

            {chapterOneGlyphs.slice(0, 8).map((glyph, index) => (
              <span
                key={`boundary-raw-${glyph}-${index}`}
                data-boundary-raw
                className="absolute rounded-full border border-white/8 bg-white/4 px-3 py-1 font-mono text-[11px] text-[var(--color-text-muted)] opacity-20 blur-[1px] will-change-transform"
                style={boundaryRawPositions[index]}
              >
                {glyph}
              </span>
            ))}

            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={`boundary-clean-${index}`}
                data-boundary-shape
                className="absolute h-4 w-4 bg-[var(--color-accent)] will-change-transform"
                style={{
                  left: `${18 + (index % 4) * 15}%`,
                  top: `${58 + Math.floor(index / 4) * 14}%`,
                  borderRadius: index % 2 === 0 ? "999px" : "0.22rem"
                }}
              />
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const line = el.querySelector<HTMLElement>("[data-boundary-line]");
          const label = el.querySelector<HTMLElement>("[data-boundary-label]");
          const raws = el.querySelectorAll<HTMLElement>("[data-boundary-raw]");
          const shapes = el.querySelectorAll<HTMLElement>("[data-boundary-shape]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(
            line,
            {
              scaleX: 0,
              transformOrigin: "left center"
            },
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out"
            }
          );
          tl.fromTo(
            raws,
            {
              opacity: 0,
              y: -14
            },
            {
              opacity: 0.2,
              y: 0,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.out"
            },
            0.12
          );
          tl.fromTo(
            shapes,
            {
              opacity: 0,
              y: 20,
              scale: 0.7
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.out"
            },
            0.16
          );
          tl.fromTo(
            label,
            {
              opacity: 0
            },
            {
              opacity: 1,
              duration: 0.3
            },
            0.54
          );
          tl.fromTo(
            titleTokens,
            {
              y: 30,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.38,
              stagger: 0.08,
              ease: "power2.out"
            },
            0.2
          );
          tl.fromTo(
            body ?? [],
            {
              opacity: 0,
              y: 16
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35
            },
            0.38
          );
        },
        exitAnimation: (el, tl) => {
          const line = el.querySelector<HTMLElement>("[data-boundary-line]");
          const label = el.querySelector<HTMLElement>("[data-boundary-label]");
          const raws = el.querySelectorAll<HTMLElement>("[data-boundary-raw]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(
            [line, label, ...raws, copy].filter(Boolean),
            {
              opacity: 0,
              duration: 0.26,
              ease: "power2.in"
            },
            0
          );
        }
      },
      {
        id: "elementization-deploy",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={deployableAi.eyebrow}
            title={deployableAi.title}
            body={deployableAi.body}
            titleMode="tokens"
            titleClassName="headline-xl mt-5 max-w-2xl"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 560" fill="none">
              <path
                d="M190 150 L340 150 L400 230 L520 210 L610 300"
                stroke="rgba(255,84,76,0.28)"
                strokeWidth="1.5"
              />
              <path
                d="M190 150 L260 310 L400 230 L540 390"
                stroke="rgba(255,84,76,0.22)"
                strokeWidth="1.5"
              />
              <path
                d="M260 310 L400 230 L630 180"
                stroke="rgba(255,84,76,0.18)"
                strokeWidth="1.5"
              />
            </svg>

            {constellationPositions.map((point, index) => (
              <span
                key={`constellation-${index}`}
                data-final-node
                className="absolute h-4 w-4 bg-[var(--color-accent)] will-change-transform"
                style={{
                  ...point,
                  borderRadius: index % 2 === 0 ? "999px" : "0.24rem"
                }}
              />
            ))}

            <div className="absolute bottom-[10%] right-[8%] flex flex-col gap-3">
              {deployableBadges.map((badge) => (
                <span
                  key={badge}
                  data-final-badge
                  className="glass-badge will-change-transform"
                >
                  {badge}
                </span>
              ))}
            </div>
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");
          const nodes = el.querySelectorAll<HTMLElement>("[data-final-node]");
          const badges = el.querySelectorAll<HTMLElement>("[data-final-badge]");

          tl.fromTo(
            nodes,
            {
              x: (index) => 400 - (Number.parseFloat(constellationPositions[index]?.left ?? "50") / 100) * 800,
              y: (index) => 230 - (Number.parseFloat(constellationPositions[index]?.top ?? "50") / 100) * 560,
              opacity: 0,
              scale: 0.5
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.48,
              stagger: 0.04,
              ease: "power3.out"
            }
          );
          tl.to(
            nodes,
            {
              scale: 1.15,
              duration: 0.15,
              stagger: 0.03,
              repeat: 1,
              yoyo: true,
              ease: "power2.out"
            },
            0.42
          );
          tl.fromTo(
            titleTokens,
            {
              y: 40,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out"
            },
            0.18
          );
          tl.fromTo(
            body ?? [],
            {
              opacity: 0,
              y: 16
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35
            },
            0.42
          );
          tl.fromTo(
            badges,
            {
              opacity: 0,
              x: 36
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              stagger: 0.15,
              ease: "power2.out"
            },
            0.74
          );
        },
        exitAnimation: () => {}
      }
    ];
  }, [
    dataWorld.body,
    dataWorld.eyebrow,
    dataWorld.title,
    deployableAi.body,
    deployableAi.eyebrow,
    deployableAi.title,
    deployableBadges,
    glyphs,
    id,
    locale,
    transformationGate.body,
    transformationGate.eyebrow,
    transformationGate.title,
    transposedLayer.body,
    transposedLayer.eyebrow,
    transposedLayer.title,
    trustBoundary.body,
    trustBoundary.eyebrow,
    trustBoundary.title,
    trustBoundaryLabel
  ]);

  return <StoryPin chapters={chapters} scrubDuration={680} />;
}
