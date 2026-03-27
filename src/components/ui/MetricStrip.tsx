import { cn } from "@/lib/utils/cn";

type MetricItem = {
  label: string;
  value: string;
  detail?: string;
};

type MetricStripProps = {
  items: MetricItem[];
  className?: string;
};

export default function MetricStrip({ items, className }: MetricStripProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="metal-card relative overflow-hidden p-5 sm:p-6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent)] opacity-60" />
          <p className="section-label">{item.label}</p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            {item.value}
          </p>
          {item.detail ? <p className="body-sm mt-3">{item.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}
