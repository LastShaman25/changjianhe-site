import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

type ContentBodyProps = {
  children: ReactNode;
  className?: string;
};

export default function ContentBody({ children, className }: ContentBodyProps) {
  return (
    <Container>
      <div
        className={cn(
          "metal-panel story-notes-shell px-7 py-9 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
          className
        )}
      >
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </Container>
  );
}
