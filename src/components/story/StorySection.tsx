import { ReactNode } from "react";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

type StorySectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function StorySection({
  children,
  className,
  id
}: StorySectionProps) {
  return (
    <section id={id} className={cn("relative min-h-screen py-20 sm:py-28", className)}>
      <Container wide>{children}</Container>
    </section>
  );
}