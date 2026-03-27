import "server-only";
import type { ComponentType } from "react";
import type { Locale, ProjectSlug } from "@/data/projects";

export type ContentSection = "site" | "projects" | "research" | "accomplishments";

type SectionSlugMap = {
  site: "about";
  projects: ProjectSlug;
  research: "overview";
  accomplishments: "overview";
};

export type LoadMdxInput<S extends ContentSection = ContentSection> = {
  locale: Locale;
  section: S;
  slug: SectionSlugMap[S];
};

export type LoadedMdx<S extends ContentSection = ContentSection> = LoadMdxInput<S> & {
  Component: ComponentType;
  sourcePath: string;
};

export async function loadMdx<S extends ContentSection>({
  locale,
  section,
  slug
}: LoadMdxInput<S>): Promise<LoadedMdx<S>> {
  const mdxModule = await import(`@/content/${locale}/${section}/${slug}.mdx`);

  return {
    locale,
    section,
    slug,
    Component: mdxModule.default,
    sourcePath: `src/content/${locale}/${section}/${slug}.mdx`
  };
}
