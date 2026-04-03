"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import StoryPin, { type StoryChapter } from "@/components/story/StoryPin";
import StoryStageFrame from "@/components/story/StoryStageFrame";
import { gsap } from "@/components/story/gsap";

type Locale = "en" | "zh";

type ChapterContent = {
  eyebrow: string;
  title: string;
  body: string;
};

type AloaPinnedStoryProps = {
  id?: string;
  locale: Locale;
  twoTower: ChapterContent;
  embeddingField: ChapterContent;
  perturbation: ChapterContent;
  inference: ChapterContent;
  charts: ChapterContent;
  metricsLabel: string;
  formulasLabel: string;
  paperCta: string;
  paperHref: string;
  formulaLeft: string;
  formulaRight: string;
};

type Point = {
  left: string;
  top: string;
};

const leftTowerPositions: Point[] = [
  { left: "18%", top: "20%" },
  { left: "18%", top: "32%" },
  { left: "18%", top: "44%" },
  { left: "18%", top: "56%" },
  { left: "18%", top: "68%" }
];

const rightTowerPositions: Point[] = [
  { left: "72%", top: "24%" },
  { left: "72%", top: "36%" },
  { left: "72%", top: "48%" },
  { left: "72%", top: "60%" },
  { left: "72%", top: "72%" }
];

const fieldPositions: Array<Point & { tone: "warm" | "cool"; active: boolean }> = [
  { left: "18%", top: "26%", tone: "warm", active: false },
  { left: "30%", top: "18%", tone: "warm", active: true },
  { left: "42%", top: "28%", tone: "warm", active: false },
  { left: "50%", top: "18%", tone: "cool", active: true },
  { left: "62%", top: "24%", tone: "cool", active: false },
  { left: "74%", top: "18%", tone: "cool", active: true },
  { left: "22%", top: "44%", tone: "warm", active: false },
  { left: "34%", top: "38%", tone: "warm", active: true },
  { left: "46%", top: "48%", tone: "warm", active: false },
  { left: "58%", top: "40%", tone: "cool", active: true },
  { left: "68%", top: "50%", tone: "cool", active: false },
  { left: "78%", top: "42%", tone: "cool", active: true },
  { left: "18%", top: "66%", tone: "warm", active: false },
  { left: "32%", top: "62%", tone: "warm", active: true },
  { left: "46%", top: "70%", tone: "warm", active: false },
  { left: "58%", top: "62%", tone: "cool", active: true },
  { left: "70%", top: "70%", tone: "cool", active: false },
  { left: "82%", top: "60%", tone: "cool", active: true }
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

function formulaPieces(formula: string) {
  return formula.split(" ");
}

export default function AloaPinnedStory({
  id,
  locale,
  twoTower,
  embeddingField,
  perturbation,
  inference,
  charts,
  metricsLabel,
  formulasLabel,
  paperCta,
  paperHref,
  formulaLeft,
  formulaRight
}: AloaPinnedStoryProps) {
  const chapters = useMemo<StoryChapter[]>(() => {
    const activeFieldPoints = fieldPositions.filter((point) => point.active);
    const inactiveFieldPoints = fieldPositions.filter((point) => !point.active);
    const formulaLeftTokens = formulaPieces(formulaLeft);
    const formulaRightTokens = formulaPieces(formulaRight);

    return [
      {
        id: "aloa-two-tower",
        content: (
          <ChapterShell
            id={id}
            locale={locale}
            eyebrow={twoTower.eyebrow}
            title={twoTower.title}
            body={twoTower.body}
          >
            {leftTowerPositions.map((point, index) => (
              <span
                key={`left-${index}`}
                data-left-block
                className="absolute h-10 w-20 rounded-[1rem] border border-white/14 bg-white/8 will-change-transform"
                style={point}
              />
            ))}
            {rightTowerPositions.map((point, index) => (
              <span
                key={`right-${index}`}
                data-right-block
                className="absolute h-10 w-20 rounded-[1rem] border border-white/14 bg-white/8 will-change-transform"
                style={point}
              />
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const leftBlocks = el.querySelectorAll<HTMLElement>("[data-left-block]");
          const rightBlocks = el.querySelectorAll<HTMLElement>("[data-right-block]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(
            leftBlocks,
            { x: -120, opacity: 0 },
            {
              x: -60,
              opacity: 1,
              duration: 0.38,
              stagger: 0.06,
              ease: "power2.out"
            }
          );
          tl.fromTo(
            rightBlocks,
            { x: 120, opacity: 0 },
            {
              x: 60,
              opacity: 1,
              duration: 0.38,
              stagger: 0.06,
              ease: "power2.out"
            },
            0
          );
          tl.fromTo(
            titleTokens,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.34,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.14
          );
          tl.fromTo(
            body ?? [],
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.34, ease: "power2.out" },
            0.24
          );
          tl.fromTo(
            copy?.querySelector(".section-label") ?? [],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
            0.1
          );
        },
        exitAnimation: (el, tl) => {
          const leftBlocks = el.querySelectorAll<HTMLElement>("[data-left-block]");
          const rightBlocks = el.querySelectorAll<HTMLElement>("[data-right-block]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(leftBlocks, {
            x: -90,
            opacity: 0.4,
            duration: 0.28,
            stagger: 0.04,
            ease: "power2.inOut"
          });
          tl.to(
            rightBlocks,
            {
              x: 90,
              opacity: 0.4,
              duration: 0.28,
              stagger: 0.04,
              ease: "power2.inOut"
            },
            0
          );
          tl.to(
            copy,
            {
              opacity: 0,
              duration: 0.2
            },
            0
          );
        }
      },
      {
        id: "aloa-field",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={embeddingField.eyebrow}
            title={embeddingField.title}
            body={embeddingField.body}
          >
            {fieldPositions.map((point, index) => (
              <span
                key={`field-${index}`}
                data-field-point
                className="absolute h-4 w-4 will-change-transform"
                style={{
                  left: point.left,
                  top: point.top,
                  borderRadius: "999px",
                  background:
                    point.tone === "warm"
                      ? "rgba(255,132,122,0.82)"
                      : "rgba(255,244,243,0.72)"
                }}
              />
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const points = el.querySelectorAll<HTMLElement>("[data-field-point]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(
            points,
            {
              x: (index) => (index % 2 === 0 ? -180 : 180),
              y: (index) => (index < 9 ? -60 : 60),
              opacity: 0,
              scale: 0.9,
              borderRadius: "24%"
            },
            {
              x: 0,
              y: 0,
              opacity: 0.92,
              scale: 1,
              borderRadius: "999px",
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.out"
            }
          );
          tl.fromTo(
            titleTokens,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.34,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.12
          );
          tl.fromTo(
            body ?? [],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" },
            0.24
          );
          tl.fromTo(
            copy?.querySelector(".section-label") ?? [],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
            0.08
          );
        },
        exitAnimation: (el, tl) => {
          const points = el.querySelectorAll<HTMLElement>("[data-field-point]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(points, {
            opacity: 0.5,
            duration: 0.28,
            ease: "power2.inOut"
          });
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "aloa-perturbation",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={perturbation.eyebrow}
            title={perturbation.title}
            body={perturbation.body}
          >
            {fieldPositions.map((point, index) => (
              <span
                key={`probe-point-${index}`}
                data-probe-point
                data-probe-strength={point.active ? "high" : "low"}
                className="absolute h-4 w-4 rounded-full will-change-transform"
                style={{
                  left: point.left,
                  top: point.top,
                  background:
                    point.active
                      ? "rgba(255,180,172,0.86)"
                      : point.tone === "warm"
                        ? "rgba(255,132,122,0.4)"
                        : "rgba(255,244,243,0.3)"
                }}
              />
            ))}
            <span
              data-probe
              className="absolute left-[10%] top-1/2 h-5 w-5 rotate-45 bg-[var(--color-accent)] shadow-[0_0_28px_rgba(255,84,76,0.4)] will-change-transform"
            />
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const probe = el.querySelector<HTMLElement>("[data-probe]");
          const points = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-probe-point]"));
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(
            points,
            { opacity: 0.34, scale: 0.9 },
            {
              opacity: 0.58,
              scale: 1,
              duration: 0.24,
              stagger: 0.015,
              ease: "power2.out"
            }
          );
          tl.fromTo(
            probe,
            { x: -240, opacity: 0 },
            { x: 440, opacity: 1, duration: 0.86, ease: "none" },
            0.06
          );

          points
            .sort(
              (a, b) =>
                Number.parseFloat(a.style.left || "0") - Number.parseFloat(b.style.left || "0")
            )
            .forEach((point, index) => {
              const strong = point.dataset.probeStrength === "high";

              tl.to(
                point,
                {
                  scale: strong ? 1.8 : 1.35,
                  x: strong ? 4 : 2,
                  y: strong ? -4 : -2,
                  opacity: strong ? 1 : 0.72,
                  duration: 0.08,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.out"
                },
                0.14 + index * 0.035
              );
            });

          tl.fromTo(
            titleTokens,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.06,
              ease: "power2.out"
            },
            0.3
          );
          tl.fromTo(
            body ?? [],
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.42
          );
        },
        exitAnimation: (el, tl) => {
          const probe = el.querySelector<HTMLElement>("[data-probe]");
          const points = el.querySelectorAll<HTMLElement>("[data-probe-point]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(probe, { opacity: 0, duration: 0.2 }, 0);
          tl.to(
            points,
            {
              opacity: (index, target) =>
                (target as HTMLElement).dataset.probeStrength === "high" ? 0.92 : 0.18,
              duration: 0.24
            },
            0
          );
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "aloa-inference",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={inference.eyebrow}
            title={inference.title}
            body={inference.body}
          >
            <div
              data-inference-line
              className="absolute left-1/2 top-[14%] h-[72%] w-px bg-[var(--color-accent)] will-change-transform"
            />
            <div className="absolute right-[12%] top-[12%] rounded-[1.4rem] border border-white/12 bg-white/6 px-5 py-4">
              <p className="section-label text-[var(--color-text-soft)]">CONFIDENCE</p>
              <p
                data-confidence-value
                className="mt-3 font-mono text-3xl font-semibold text-[var(--color-text)]"
              >
                0.00
              </p>
            </div>
            {inactiveFieldPoints.map((point, index) => (
              <span
                key={`inactive-${index}`}
                data-inference-point="inactive"
                className="absolute h-4 w-4 rounded-full bg-white/40 will-change-transform"
                style={{ left: point.left, top: point.top }}
              />
            ))}
            {activeFieldPoints.map((point, index) => (
              <span
                key={`active-${index}`}
                data-inference-point="active"
                className="absolute h-4 w-4 rounded-full bg-[var(--color-accent)] will-change-transform"
                style={{ left: point.left, top: point.top }}
              />
            ))}
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const line = el.querySelector<HTMLElement>("[data-inference-line]");
          const inactive = el.querySelectorAll<HTMLElement>('[data-inference-point="inactive"]');
          const active = el.querySelectorAll<HTMLElement>('[data-inference-point="active"]');
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");
          const confidenceNode = el.querySelector<HTMLElement>("[data-confidence-value]");
          const confidence = { value: 0 };

          tl.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top center" },
            { scaleY: 1, duration: 0.4, ease: "power2.out" }
          );
          tl.to(
            inactive,
            {
              opacity: 0.1,
              duration: 0.32,
              stagger: 0.02,
              ease: "power2.inOut"
            },
            0.04
          );
          tl.to(
            active,
            {
              x: 0,
              y: (index) => -120 + index * 38,
              duration: 0.46,
              stagger: 0.03,
              ease: "power3.inOut"
            },
            0.08
          );
          tl.to(
            confidence,
            {
              value: 0.73,
              duration: 0.8,
              ease: "power2.out",
              onUpdate: () => {
                if (confidenceNode) {
                  confidenceNode.textContent = confidence.value.toFixed(2);
                }
              }
            },
            0.12
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
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.34
          );
        },
        exitAnimation: (el, tl) => {
          const inactive = el.querySelectorAll<HTMLElement>('[data-inference-point="inactive"]');
          const copy = el.querySelector<HTMLElement>("[data-copy]");

          tl.to(inactive, { opacity: 0, duration: 0.2 }, 0);
          tl.to(copy, { opacity: 0, duration: 0.2 }, 0);
        }
      },
      {
        id: "aloa-findings",
        content: (
          <ChapterShell
            locale={locale}
            eyebrow={charts.eyebrow}
            title={charts.title}
            body={charts.body}
          >
            <div
              data-findings-line
              className="absolute left-1/2 top-[12%] h-[72%] w-px bg-[var(--color-accent)] opacity-80 will-change-transform"
            />

            <div className="absolute left-[10%] top-[18%] w-[28%]">
              <p className="section-label text-[var(--color-text-soft)]">{formulasLabel}</p>
              <div className="relative mt-5 flex flex-wrap gap-3">
                {formulaLeftTokens.map((token, index) => (
                  <span
                    key={`left-token-${token}-${index}`}
                    data-formula-left
                    className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 font-mono text-sm text-[var(--color-text)] will-change-transform"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute right-[10%] top-[18%] w-[30%]">
              <p className="section-label text-[var(--color-text-soft)]">{formulasLabel}</p>
              <div className="relative mt-5 flex flex-wrap gap-3">
                {formulaRightTokens.map((token, index) => (
                  <span
                    key={`right-token-${token}-${index}`}
                    data-formula-right
                    className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 font-mono text-sm text-[var(--color-text)] will-change-transform"
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-[12%] left-[16%] right-[16%] grid gap-4 md:grid-cols-2">
              <div
                data-metric-panel
                className="hero-metric-panel min-h-[8rem] justify-start border border-white/10 bg-white/7 px-6 py-5"
              >
                <span className="hero-metric-label">{metricsLabel}</span>
                <span className="hero-metric-value mt-3">AUC / Lift / Recall</span>
              </div>
              <div
                data-metric-panel
                className="hero-metric-panel min-h-[8rem] justify-start border border-white/10 bg-white/7 px-6 py-5"
              >
                <span className="hero-metric-label">{metricsLabel}</span>
                <span className="hero-metric-value mt-3">Boundary / Probe / Shift</span>
              </div>
            </div>
          </ChapterShell>
        ),
        enterAnimation: (el, tl) => {
          const line = el.querySelector<HTMLElement>("[data-findings-line]");
          const leftTokens = el.querySelectorAll<HTMLElement>("[data-formula-left]");
          const rightTokens = el.querySelectorAll<HTMLElement>("[data-formula-right]");
          const panels = el.querySelectorAll<HTMLElement>("[data-metric-panel]");
          const titleTokens = el.querySelectorAll<HTMLElement>("[data-title-token]");
          const body = el.querySelector<HTMLElement>("[data-copy] p.body-md");

          tl.fromTo(line, { opacity: 0.4 }, { opacity: 0.8, duration: 0.2 });
          tl.fromTo(
            leftTokens,
            {
              x: (index) => -90 + index * 10,
              y: (index) => -30 + index * 8,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out"
            },
            0.04
          );
          tl.fromTo(
            rightTokens,
            {
              x: (index) => 90 - index * 10,
              y: (index) => -24 + index * 8,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out"
            },
            0.08
          );
          tl.fromTo(
            panels,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.34,
              stagger: 0.15,
              ease: "power2.out"
            },
            0.3
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
            0.46
          );
          tl.fromTo(
            body ?? [],
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
            0.56
          );
        },
        exitAnimation: () => {}
      }
    ];
  }, [
    charts.body,
    charts.eyebrow,
    charts.title,
    embeddingField.body,
    embeddingField.eyebrow,
    embeddingField.title,
    formulaLeft,
    formulaRight,
    formulasLabel,
    id,
    inference.body,
    inference.eyebrow,
    inference.title,
    locale,
    metricsLabel,
    perturbation.body,
    perturbation.eyebrow,
    perturbation.title,
    twoTower.body,
    twoTower.eyebrow,
    twoTower.title
  ]);

  return (
    <StoryPin
      chapters={chapters}
      scrubDuration={680}
      overlay={
        <div className="flex h-full items-end justify-end p-6 sm:p-8 lg:p-10">
          <a
            href={paperHref}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto btn-secondary"
          >
            {paperCta}
          </a>
        </div>
      }
    />
  );
}
