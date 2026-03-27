import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import StoryProgress from "@/components/story/StoryProgress";

type StoryPageShellProps = {
  children: ReactNode;
  className?: string;
  progressItems?: Array<{
    id: string;
    label: string;
  }>;
};

export default function StoryPageShell({
  children,
  className,
  progressItems
}: StoryPageShellProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-32 h-[32rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-40 bg-[linear-gradient(to_left,rgba(255,255,255,0.03),transparent)] xl:block" />
      {progressItems?.length ? <StoryProgress items={progressItems} /> : null}
      <div className="relative">{children}</div>
    </div>
  );
}
