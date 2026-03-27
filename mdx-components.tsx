import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils/cn";

function createHeading(level: "h1" | "h2" | "h3" | "h4", baseClassName: string) {
  const Heading = ({
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof level>) => {
    const Tag = level;

    return <Tag className={cn(baseClassName, className)} {...props} />;
  };

  Heading.displayName = `Mdx${level.toUpperCase()}`;

  return Heading;
}

const components = {
  h1: createHeading("h1", "headline-xl mt-12 first:mt-0"),
  h2: createHeading(
    "h2",
    "headline-lg mt-14 border-t border-[var(--color-border)] pt-8 text-[2rem] sm:text-[2.4rem]"
  ),
  h3: createHeading("h3", "headline-lg mt-10 text-[1.5rem] sm:text-[1.8rem]"),
  h4: createHeading(
    "h4",
    "mt-8 font-mono text-sm uppercase tracking-[0.24em] text-[var(--color-text-muted)]"
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("body-md mt-6 max-w-3xl", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn(
        "body-md mt-6 ml-5 max-w-3xl list-disc space-y-3 marker:text-[var(--color-silver-3)]",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn(
        "body-md mt-6 ml-5 max-w-3xl list-decimal space-y-3 marker:text-[var(--color-silver-3)]",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("pl-1", className)} {...props} />
  ),
  a: ({ className, href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

    return (
      <a
        className={cn(
          "font-medium text-[var(--color-silver-2)] underline decoration-[color:var(--color-border-strong)] underline-offset-4 transition hover:text-white",
          className
        )}
        href={href}
        rel={isExternal ? "noreferrer" : props.rel}
        target={isExternal ? "_blank" : props.target}
        {...props}
      />
    );
  },
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "metal-panel mt-8 max-w-3xl border-l-2 border-l-[var(--color-silver-3)] px-6 py-5 text-[var(--color-text-soft)]",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("mt-12 border-[var(--color-border)]", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-semibold text-white", className)} {...props} />
  ),
  em: ({ className, ...props }: ComponentPropsWithoutRef<"em">) => (
    <em className={cn("text-[var(--color-silver-2)]", className)} {...props} />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded-md border border-[var(--color-border)] bg-white/6 px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--color-silver-2)]",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "metal-panel mt-8 max-w-4xl overflow-x-auto p-5 font-mono text-sm leading-7 text-[var(--color-silver-2)]",
        className
      )}
      {...props}
    />
  )
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
