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

type AILearningAssistantPinnedStoryProps = {
  id?: string;
  locale: Locale;
  signal: ChapterContent;
  engine: ChapterContent;
  adaptation: ChapterContent;
  loop: ChapterContent;
  institutionalFit: ChapterContent;
  signalTokens: string[];
  engineDimensions: string[];
  adaptationOutputs: string[];
  adaptationSubLabels: string[];
  loopNodes: string[];
  institutionalBlocks: string[];
  oversightLabel: string;
};

type Point = {
  left: string;
  top: string;
};

const signalTokenPositions: Point[] = [
  { left: "20%", top: "24%" },
  { left: "56%", top: "18%" },
  { left: "68%", top: "34%" },
  { left: "28%", top: "42%" },
  { left: "50%", top: "58%" }
];

const signalScatterOffsets = [
  { x: -180, y: -120, rotation: -18 },
  { x: 160, y: -150, rotation: 16 },
  { x: 210, y: -30, rotation: 12 },
  { x: -140, y: 90, rotation: -14 },
  { x: 120, y: 130, rotation: 18 }
];

const engineLabelPositions: Point[] = [
  { left: "22%", top: "18%" },
  { left: "62%", top: "18%" },
  { left: "72%", top: "42%" },
  { left: "60%", top: "68%" },
  { left: "20%", top: "68%" }
];

const adaptationPositions: Point[] = [
  { left: "14%", top: "50%" },
  { left: "38%", top: "42%" },
  { left: "62%", top: "50%" }
];

const loopNodePositions: Point[] = [
  { left: "47%", top: "16%" },
  { left: "72%", top: "42%" },
  { left: "47%", top: "68%" },
  { left: "22%", top: "42%" }
];

const oversightBlockPositions: Point[] = [
  { left: "10%", top: "48%" },
  { left: "37%", top: "40%" },
  { left: "64%", top: "48%" }
];

function splitTokens(text: string, locale: Locale) {
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
  return (
    <h2 className={className}>
      {splitTokens(text, locale).map((token, index) => (
        <span
          key={`${token}-${index}`}
          data-title-token
          className={locale === "zh" ? "inline-block" : "mr-[0.28em] inline-block"}
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
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <div id={id} className="flex min-h-screen items-center px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div data-copy className="metal-panel p-7 sm:p-9 will-change-transform">
          <p className="section-label">{eyebrow}</p>
          <TokenHeadline text={title} locale={locale} className="headline-lg mt-5 max-w-xl" />
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

export default function AILearningAssistantPinnedStory({
  id,
  locale,
  signal,
  engine,
  adaptation,
  loop,
  institutionalFit,
  signalTokens,
  engineDimensions,
  adaptationOutputs,
  adaptationSubLabels,
  loopNodes,
  institutionalBlocks,
  oversightLabel
}: AILearningAssistantPinnedStoryProps) {
  const chapters = useMemo<StoryChapter[]>(() => {
    return [
      {
        id: "ai-learning-signal",
        content: (
          <ChapterShell
            id={id}
            locale={locale}
            eyebrow={signal.eyebrow}
            title={signal.title}
            body={signal.body}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 560" fill="none">
              {signalTokenPositions.map((point, index) => (
                <line
                  key={`signal-line-${index}`}
                  data-signal-line
                  x1={400}
                  y1={280}
                  x2={160 + index * 112}
                  y2={120 + index * 82}
                  stroke="rgba(255,84,76,0.38)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
            {signalTokens.map((token, index) => (
              <span
                key={token}
                data-signal-token
                className="absolute rounded-full border border-white/10 bg-white/6 px-3 py-1.5 font-mono text-xs text-[var(--color-text)] will-change-transform"
                style={signalTokenPositions[index]}
              >
                {token}
              </span>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const tokens = el.querySelectorAll<HTMLElement>("[data-signal-token]");
          const lines = el.querySelectorAll<SVGLineElement>("[data-signal-line]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          addSvgStrokeDraw(lines, tl, gsap, {
            duration: 0.34,
            stagger: 0.05,
            at: 0
          });
          tl.fromTo(
            tokens,
            {
              x: (index) => signalScatterOffsets[index]?.x ?? 0,
              y: (index) => signalScatterOffsets[index]?.y ?? 0,
              rotation: (index) => signalScatterOffsets[index]?.rotation ?? 0,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 0.82,
              duration: 0.46,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.04
          );
          tl.fromTo(
            titleTokens,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.18
          );
          tl.fromTo(
            body ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.32
          );
        },
        exitAnimation: (el, tl) => {
          const tokens = el.querySelectorAll<HTMLElement>("[data-signal-token]");
          const lines = el.querySelectorAll<SVGLineElement>("[data-signal-line]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(
            tokens,
            {
              x: (index) => 400 - (160 + index * 112),
              y: (index) => 280 - (120 + index * 82),
              opacity: 0,
              scale: 0.5,
              duration: 0.34,
              stagger: 0.04,
              ease: "power2.in"
            },
            0
          );
          tl.to(
            lines,
            {
              strokeDashoffset: (index, target) =>
                (target as SVGLineElement).getTotalLength?.() ?? 0,
              duration: 0.24,
              stagger: 0.03,
              ease: "power2.in"
            },
            0
          );
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "ai-learning-engine",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={engine.eyebrow}
            title={engine.title}
            body={engine.body}
          >
            <span
              data-engine-center
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_28px_rgba(255,84,76,0.35)] will-change-transform"
            />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 560" fill="none">
              {engineLabelPositions.map((point, index) => (
                <line
                  key={`engine-line-${index}`}
                  data-engine-line
                  x1={400}
                  y1={280}
                  x2={[210, 515, 595, 510, 200][index]}
                  y2={[130, 130, 260, 400, 400][index]}
                  stroke="rgba(255,84,76,0.42)"
                  strokeWidth="1.6"
                />
              ))}
            </svg>
            {engineDimensions.map((label, index) => (
              <span
                key={label}
                data-engine-label
                className="absolute rounded-full border border-white/10 bg-white/6 px-3 py-1.5 font-mono text-xs text-[var(--color-text)] will-change-transform"
                style={engineLabelPositions[index]}
              >
                {label}
              </span>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const center = el.querySelector<HTMLElement>("[data-engine-center]");
          const lines = el.querySelectorAll<SVGLineElement>("[data-engine-line]");
          const labels = el.querySelectorAll<HTMLElement>("[data-engine-label]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(center, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24 });
          addSvgStrokeDraw(lines, tl, gsap, {
            duration: 0.4,
            stagger: 0.08,
            at: 0.06
          });
          tl.fromTo(
            labels,
            {
              opacity: 0,
              scale: 0.84
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.28,
              stagger: 0.08,
              ease: "power2.out"
            },
            0.28
          );
          tl.fromTo(
            titleTokens,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.44
          );
          tl.fromTo(
            body ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.58
          );
        },
        exitAnimation: (el, tl) => {
          const lines = el.querySelectorAll<SVGLineElement>("[data-engine-line]");
          const labels = el.querySelectorAll<HTMLElement>("[data-engine-label]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(
            labels,
            {
              x: (index) => 400 - [176, 496, 576, 496, 176][index],
              y: (index) => 280 - [101, 101, 231, 371, 371][index],
              opacity: 0,
              scale: 0.72,
              duration: 0.3,
              stagger: 0.06,
              ease: "power2.in"
            },
            0
          );
          tl.to(
            lines,
            {
              strokeDashoffset: (index, target) =>
                (target as SVGLineElement).getTotalLength?.() ?? 0,
              duration: 0.24,
              stagger: 0.05,
              ease: "power2.in"
            },
            0
          );
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "ai-learning-adaptation",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={adaptation.eyebrow}
            title={adaptation.title}
            body={adaptation.body}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 560" fill="none">
              {adaptationPositions.map((point, index) => (
                <line
                  key={`adapt-line-${index}`}
                  data-adapt-line
                  x1={400}
                  y1={240}
                  x2={[180, 370, 560][index]}
                  y2={[300, 252, 300][index]}
                  stroke="rgba(255,84,76,0.62)"
                  strokeWidth="3"
                />
              ))}
            </svg>
            {adaptationOutputs.map((label, index) => (
              <div
                key={label}
                data-adapt-block
                className="absolute w-[24%] rounded-[1.4rem] border border-white/12 bg-white/6 px-4 py-4 will-change-transform"
                style={adaptationPositions[index]}
              >
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text)]">
                  {label}
                </p>
                <p
                  data-adapt-sub
                  className="mt-3 text-sm text-[var(--color-text-soft)] opacity-0"
                >
                  {adaptationSubLabels[index]}
                </p>
              </div>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const lines = el.querySelectorAll<SVGLineElement>("[data-adapt-line]");
          const blocks = el.querySelectorAll<HTMLElement>("[data-adapt-block]");
          const subs = el.querySelectorAll<HTMLElement>("[data-adapt-sub]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          addSvgStrokeDraw(lines, tl, gsap, {
            duration: 0.34,
            stagger: 0.08,
            at: 0.06
          });
          tl.fromTo(
            blocks,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.34,
              stagger: 0.12,
              ease: "power2.out"
            },
            0.14
          );
          tl.to(
            subs,
            {
              opacity: 1,
              duration: 0.24,
              stagger: 0.12,
              ease: "power2.out"
            },
            0.34
          );
          tl.fromTo(
            titleTokens,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.22
          );
          tl.fromTo(
            body ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.4
          );
        },
        exitAnimation: (el, tl) => {
          const lines = el.querySelectorAll<SVGLineElement>("[data-adapt-line]");
          const blocks = el.querySelectorAll<HTMLElement>("[data-adapt-block]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(
            blocks,
            {
              y: 40,
              opacity: 0,
              duration: 0.24,
              stagger: 0.08,
              ease: "power2.in"
            },
            0
          );
          tl.to(lines, { opacity: 0, duration: 0.18 }, 0);
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "ai-learning-loop",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={loop.eyebrow}
            title={loop.title}
            body={loop.body}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 560" fill="none">
              <path
                data-loop-arc
                d="M400 122 C500 122 585 185 585 280"
                stroke="rgba(255,84,76,0.42)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                data-loop-arc
                d="M585 280 C585 380 500 438 400 438"
                stroke="rgba(255,84,76,0.42)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                data-loop-arc
                d="M400 438 C300 438 215 380 215 280"
                stroke="rgba(255,84,76,0.42)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                data-loop-arc
                d="M215 280 C215 185 300 122 400 122"
                stroke="rgba(255,84,76,0.42)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {loopNodes.map((label, index) => (
              <span
                key={label}
                data-loop-node
                className="absolute rounded-full border border-white/12 bg-white/6 px-4 py-2 font-mono text-sm text-[var(--color-text)] will-change-transform"
                style={loopNodePositions[index]}
              >
                {label}
              </span>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const nodes = el.querySelectorAll<HTMLElement>("[data-loop-node]");
          const arcs = el.querySelectorAll<SVGPathElement>("[data-loop-arc]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(
            nodes,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              stagger: 0.2,
              ease: "back.out(1.7)"
            }
          );
          addSvgStrokeDraw(arcs, tl, gsap, {
            duration: 0.4,
            stagger: 0.1,
            at: 0.54
          });
          tl.to(
            nodes,
            {
              scale: 1.1,
              duration: 0.14,
              repeat: 1,
              yoyo: true,
              stagger: 0.04,
              ease: "power2.out"
            },
            1
          );
          tl.fromTo(
            titleTokens,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.18
          );
          tl.fromTo(
            body ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.38
          );
        },
        exitAnimation: (el, tl) => {
          const nodes = el.querySelectorAll<HTMLElement>("[data-loop-node]");
          const arcs = el.querySelectorAll<SVGPathElement>("[data-loop-arc]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(
            [...nodes, ...arcs],
            {
              scale: 0.6,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in"
            },
            0
          );
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "ai-learning-institution",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={institutionalFit.eyebrow}
            title={institutionalFit.title}
            body={institutionalFit.body}
          >
            <div className="absolute left-[24%] top-[16%] w-[52%]">
              <p
                data-oversight-label
                className="section-label text-center text-[var(--color-text-soft)] opacity-0"
              >
                {oversightLabel}
              </p>
              <div
                data-oversight-line
                className="mt-3 h-px w-full bg-[var(--color-accent)] will-change-transform"
              />
            </div>
            {institutionalBlocks.map((label, index) => (
              <div
                key={label}
                data-institution-block
                className="absolute w-[24%] rounded-[1.5rem] border border-white/12 bg-white/7 px-5 py-5 will-change-transform"
                style={oversightBlockPositions[index]}
              >
                <p className="font-mono text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text)]">
                  {label}
                </p>
              </div>
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const label = el.querySelector<HTMLElement>("[data-oversight-label]");
          const line = el.querySelector<HTMLElement>("[data-oversight-line]");
          const blocks = el.querySelectorAll<HTMLElement>("[data-institution-block]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(
            blocks,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.12,
              ease: "back.out(1.4)"
            }
          );
          tl.fromTo(
            label,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
            0.14
          );
          tl.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.32, ease: "power2.out" },
            0.18
          );
          tl.fromTo(
            titleTokens,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.32
          );
          tl.fromTo(
            body ?? [],
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.48
          );
        },
        exitAnimation: () => {}
      }
    ];
  }, [
    adaptation.body,
    adaptation.eyebrow,
    adaptation.title,
    adaptationOutputs,
    adaptationSubLabels,
    engine.body,
    engine.eyebrow,
    engine.title,
    engineDimensions,
    id,
    institutionalBlocks,
    institutionalFit.body,
    institutionalFit.eyebrow,
    institutionalFit.title,
    locale,
    loop.body,
    loop.eyebrow,
    loop.title,
    loopNodes,
    oversightLabel,
    signal.body,
    signal.eyebrow,
    signal.title,
    signalTokens
  ]);

  return <StoryPin chapters={chapters} scrubDuration={680} />;
}
