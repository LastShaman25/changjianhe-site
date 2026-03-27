"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";

type ChartsSceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  metricsLabel: string;
  formulasLabel: string;
  paperLabel: string;
};

export default function ChartsScene({
  id,
  eyebrow,
  title,
  body,
  metricsLabel,
  formulasLabel,
  paperLabel
}: ChartsSceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="grid h-full gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-white/14 bg-white/4 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                {metricsLabel}
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <div className="h-24 bg-[linear-gradient(to_top_right,transparent,rgba(255,255,255,0.1)),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,32px_100%]" />
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <div className="h-24 bg-[linear-gradient(to_top,rgba(255,255,255,0.16),transparent_70%),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,32px_100%]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[1.5rem] border border-white/14 bg-white/4 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {formulasLabel}
                </p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-[0.95rem] border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-[var(--color-silver-2)]">
                    score(x) → confidence
                  </div>
                  <div className="rounded-[0.95rem] border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-[var(--color-silver-2)]">
                    probe(x + δ) → shift
                  </div>
                </div>
              </div>

              <MotionButtonWrap className="inline-flex">
                <a
                  href="https://arxiv.org/search/?query=membership+inference+two+tower&searchtype=all"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  {paperLabel}
                </a>
              </MotionButtonWrap>
            </div>
          </div>
        </StoryStageFrame>
      }
    />
  );
}
