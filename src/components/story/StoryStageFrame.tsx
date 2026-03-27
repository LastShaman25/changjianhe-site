import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StoryStageFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function StoryStageFrame({ children, className }: StoryStageFrameProps) {
  return (
    <div
      className={cn(
        "story-stage-frame relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.09),rgba(255,255,255,0.015))] shadow-[0_24px_80px_rgba(0,0,0,0.32)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
