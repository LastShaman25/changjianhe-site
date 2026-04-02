import { ReactNode } from "react";
import LocaleLink from "@/components/ui/LocaleLink";
import { cn } from "@/lib/utils/cn";

type LinkCardProps = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  meta?: ReactNode;
  className?: string;
  disableHoverLift?: boolean;
};

export default function LinkCard({
  title,
  description,
  href,
  external = false,
  meta,
  className,
  disableHoverLift = false
}: LinkCardProps) {
  const cardClassName = cn(
    "metal-card group block p-6 sm:p-7 transition",
    !disableHoverLift && "hover:-translate-y-[2px]",
    className
  );

  const cardContent = (
    <>
      {meta ? <div className="mb-3">{meta}</div> : null}
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
        {title}
      </h3>
      <p className="body-md mt-3">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-warning)] transition group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
        <span aria-hidden="true">Signal +</span>
      </div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cardClassName}>
      {cardContent}
    </a>
  ) : (
    <LocaleLink href={href} className={cardClassName}>
      {cardContent}
    </LocaleLink>
  );
}
