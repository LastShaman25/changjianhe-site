import { cn } from "@/lib/utils/cn";

type ContactMethodCardProps = {
  label: string;
  value: string;
  href?: string;
  description?: string;
  className?: string;
};

export default function ContactMethodCard({
  label,
  value,
  href,
  description,
  className
}: ContactMethodCardProps) {
  const content = (
    <div className={cn("metal-card relative overflow-hidden p-6 sm:p-7", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)] opacity-50" />
      <p className="section-label">{label}</p>
      <p className="mt-4 text-base font-medium tracking-[-0.01em] text-[var(--color-text)]">
        {value}
      </p>
      {description ? <p className="body-sm mt-3">{description}</p> : null}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
