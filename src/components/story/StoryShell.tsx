import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StoryShellProps = {
  children: ReactNode;
  className?: string;
};

export default function StoryShell({ children, className }: StoryShellProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}